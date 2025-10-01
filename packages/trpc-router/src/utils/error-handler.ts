import { TRPCError } from '@trpc/server';

import { BusinessError } from '../errors/business.error';

/**
 * Converts service layer errors to appropriate TRPC errors
 * @param error - The error thrown by the service layer
 * @throws TRPCError - Standardized TRPC error for the client
 */
export function handleServiceError(error: unknown): never {
  if (error instanceof BusinessError) {
    // Map business errors to appropriate HTTP status codes
    const codeMap: Record<
      number,
      'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT'
    > = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
    };

    const trpcCode = codeMap[error.statusCode] || 'BAD_REQUEST';

    throw new TRPCError({
      code: trpcCode,
      message: error.message,
      cause: {
        code: error.code,
        details: error.details,
      },
    });
  }

  // Handle unexpected errors
  console.error('Unexpected service error:', error);

  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred. Please try again later.',
  });
}
