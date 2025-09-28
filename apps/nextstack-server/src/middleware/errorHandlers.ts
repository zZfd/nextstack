import type { Request, Response, NextFunction } from 'express';

import { env } from './validation';

/**
 * Global error handler middleware
 * Must be placed after all routes to catch unhandled errors
 */
export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log error with request context
  console.error(`🚨 Global Error [${req.requestId}]:`, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    error: err instanceof Error ? err.message : String(err),
    stack:
      process.env.NODE_ENV === 'development' && err instanceof Error
        ? err.stack
        : undefined,
  });

  // Handle specific error types
  if (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    err.code === 'LIMIT_FILE_SIZE'
  ) {
    return res.status(413).json({
      error: 'Payload too large',
      message: 'The request payload exceeds the maximum allowed size',
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  }

  // Generic error response
  const statusCode =
    typeof err === 'object' &&
    err !== null &&
    'statusCode' in err &&
    typeof err.statusCode === 'number'
      ? err.statusCode
      : 500;

  res.status(statusCode).json({
    error:
      env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err instanceof Error
          ? err.message
          : 'Unknown error',
    requestId: req.requestId,
    timestamp: new Date().toISOString(),
  });
};

/**
 * 404 handler for unmatched routes
 * Must be placed after all routes but before global error handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  console.warn(
    `🔍 Route not found [${req.requestId}]: ${req.method} ${req.originalUrl}`
  );

  res.status(404).json({
    error: 'Route not found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
    requestId: req.requestId,
    timestamp: new Date().toISOString(),
    availableEndpoints: ['/health', '/trpc'],
  });
};
