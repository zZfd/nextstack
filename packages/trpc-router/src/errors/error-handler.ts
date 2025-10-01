import { Prisma } from '@nextstack/database';
import { TRPCError } from '@trpc/server';

import { BaseError, ErrorCode } from './base.error';

export function handleError(error: unknown): TRPCError {
  // If it's already a TRPCError, return it
  if (error instanceof TRPCError) {
    return error;
  }

  // Handle our custom errors
  if (error instanceof BaseError) {
    return new TRPCError({
      code: mapErrorCodeToTRPC(error.code),
      message: error.message,
      cause: error,
    });
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid data provided',
      cause: error,
    });
  }

  // Handle standard errors
  if (error instanceof Error) {
    // Check for specific error messages
    if (error.message.includes('not found')) {
      return new TRPCError({
        code: 'NOT_FOUND',
        message: error.message,
        cause: error,
      });
    }

    if (
      error.message.includes('unauthorized') ||
      error.message.includes('authenticated')
    ) {
      return new TRPCError({
        code: 'UNAUTHORIZED',
        message: error.message,
        cause: error,
      });
    }

    if (
      error.message.includes('forbidden') ||
      error.message.includes('authorized')
    ) {
      return new TRPCError({
        code: 'FORBIDDEN',
        message: error.message,
        cause: error,
      });
    }

    return new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        process.env.NODE_ENV === 'production'
          ? 'An unexpected error occurred'
          : error.message,
      cause: error,
    });
  }

  // Unknown error
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    cause: error,
  });
}

function mapErrorCodeToTRPC(code: ErrorCode): TRPCError['code'] {
  switch (code) {
    case ErrorCode.UNAUTHORIZED:
    case ErrorCode.INVALID_CREDENTIALS:
    case ErrorCode.TOKEN_EXPIRED:
      return 'UNAUTHORIZED';

    case ErrorCode.FORBIDDEN:
      return 'FORBIDDEN';

    case ErrorCode.VALIDATION_ERROR:
    case ErrorCode.INVALID_INPUT:
    case ErrorCode.MISSING_REQUIRED_FIELD:
      return 'BAD_REQUEST';

    case ErrorCode.NOT_FOUND:
      return 'NOT_FOUND';

    case ErrorCode.ALREADY_EXISTS:
    case ErrorCode.CONFLICT:
      return 'CONFLICT';

    case ErrorCode.BUSINESS_RULE_VIOLATION:
    case ErrorCode.OPERATION_NOT_ALLOWED:
      return 'UNPROCESSABLE_CONTENT';

    case ErrorCode.RATE_LIMIT_EXCEEDED:
      return 'TOO_MANY_REQUESTS';

    case ErrorCode.TIMEOUT:
      return 'TIMEOUT';

    case ErrorCode.DATABASE_ERROR:
    case ErrorCode.INTERNAL_ERROR:
    case ErrorCode.EXTERNAL_SERVICE_ERROR:
    default:
      return 'INTERNAL_SERVER_ERROR';
  }
}

function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError
): TRPCError {
  switch (error.code) {
    case 'P2002': {
      // Unique constraint violation
      const field = (error.meta?.target as string[])?.[0] ?? 'field';
      return new TRPCError({
        code: 'CONFLICT',
        message: `A record with this ${field} already exists`,
        cause: error,
      });
    }

    case 'P2003': // Foreign key constraint violation
      return new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Referenced record does not exist',
        cause: error,
      });

    case 'P2025': // Record not found
      return new TRPCError({
        code: 'NOT_FOUND',
        message: 'Record not found',
        cause: error,
      });

    case 'P2014': // Relation violation
      return new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid relation in the request',
        cause: error,
      });

    case 'P2015': // Related record not found
      return new TRPCError({
        code: 'NOT_FOUND',
        message: 'Related record not found',
        cause: error,
      });

    default:
      return new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          process.env.NODE_ENV === 'production'
            ? 'Database operation failed'
            : `Database error: ${error.message}`,
        cause: error,
      });
  }
}

export function createErrorHandler() {
  return {
    onError: ({
      error,
      type,
      path,
      input,
    }: {
      error: Error;
      type: string;
      path?: string;
      input?: unknown;
      ctx?: unknown;
      req?: unknown;
    }) => {
      const isDevelopment = process.env.NODE_ENV === 'development';

      if (isDevelopment) {
        console.error(`[${type}] Error in ${path}:`, {
          error: error.message,
          code: (error as BaseError).code,
          input,
          stack: error.stack,
        });
      } else if (!(error as BaseError).isOperational) {
        // Log non-operational errors in production
        console.error(`[${type}] System error in ${path}:`, {
          error: error.message,
          code: (error as BaseError).code,
        });
      }
    },
  };
}
