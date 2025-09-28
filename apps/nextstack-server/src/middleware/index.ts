/**
 * Middleware exports for nextstack-api
 * Provides a central place to manage all middleware imports
 */

// Environment validation (must be imported first)
export { env } from './validation';

// Core middleware (order matters)
export { requestIdMiddleware } from './requestId';
export { timeoutMiddleware } from './timeout';
export { requestLogger } from './logger';

// Third-party middleware configurations
export { createSecurityMiddleware } from './security';
export { createCorsMiddleware } from './cors';
export { createRateLimitMiddleware } from './rateLimit';
export * from './errorHandlers';

// Utility functions
export { shouldSkipLogging } from './logger';
