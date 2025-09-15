import { BaseError, ErrorCode, type ErrorDetails } from './base.error';

export class ValidationError extends BaseError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details);
  }
}

export class NotFoundError extends BaseError {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, ErrorCode.NOT_FOUND, 404, { resource, identifier });
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Authentication required') {
    super(message, ErrorCode.UNAUTHORIZED, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Access denied') {
    super(message, ErrorCode.FORBIDDEN, 403);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, ErrorCode.CONFLICT, 409, details);
  }
}

export class AlreadyExistsError extends BaseError {
  constructor(resource: string, field?: string, value?: unknown) {
    const message = field
      ? `${resource} with ${field} '${value}' already exists`
      : `${resource} already exists`;
    super(message, ErrorCode.ALREADY_EXISTS, 409, { resource, field, value });
  }
}

export class BusinessRuleError extends BaseError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, ErrorCode.BUSINESS_RULE_VIOLATION, 422, details);
  }
}

export class RateLimitError extends BaseError {
  constructor(message = 'Too many requests', retryAfter?: number) {
    super(message, ErrorCode.RATE_LIMIT_EXCEEDED, 429, { retryAfter });
  }
}

export class DatabaseError extends BaseError {
  constructor(message = 'Database operation failed', originalError?: Error) {
    super(
      message,
      ErrorCode.DATABASE_ERROR,
      500,
      process.env.NODE_ENV === 'development'
        ? { originalError: originalError?.message }
        : undefined,
      false // Not operational - indicates system issue
    );
  }
}

export class ExternalServiceError extends BaseError {
  constructor(service: string, originalError?: Error) {
    super(
      `External service '${service}' failed`,
      ErrorCode.EXTERNAL_SERVICE_ERROR,
      502,
      process.env.NODE_ENV === 'development'
        ? { service, originalError: originalError?.message }
        : { service },
      false // Not operational
    );
  }
}