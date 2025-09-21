export class BusinessError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(
    code: string,
    message: string,
    statusCode: number = 400,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'BusinessError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Common error codes for the application
export const ErrorCodes = {
  // User errors
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  CANNOT_UPDATE_OTHER_USER: 'CANNOT_UPDATE_OTHER_USER',
  CANNOT_DELETE_OTHER_USER: 'CANNOT_DELETE_OTHER_USER',
  EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',

  // Post errors
  POST_NOT_FOUND: 'POST_NOT_FOUND',
  CANNOT_UPDATE_OTHER_POST: 'CANNOT_UPDATE_OTHER_POST',
  CANNOT_DELETE_OTHER_POST: 'CANNOT_DELETE_OTHER_POST',

  // Generic errors
  INVALID_INPUT: 'INVALID_INPUT',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
} as const;