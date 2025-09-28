import type { Request } from 'express';
import rateLimit from 'express-rate-limit';

import { env } from './validation';

/**
 * Rate limiting middleware configuration
 * Prevents abuse by limiting requests per IP address
 */
export const createRateLimitMiddleware = () => {
  return rateLimit({
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(env.RATE_LIMIT_MAX_REQUESTS || '100'), // Limit each IP to 100 requests per windowMs

    // Enhanced message with request context
    message: (req: Request) => ({
      error: 'Too many requests from this IP, please try again later.',
      requestId: req.requestId,
      retryAfter: Math.ceil(
        parseInt(env.RATE_LIMIT_WINDOW_MS || '900000') / 1000
      ),
      timestamp: new Date().toISOString(),
    }),

    // Use standard rate limit headers
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // Skip successful requests for some endpoints
    skipSuccessfulRequests: false,
    skipFailedRequests: false,

    // Custom key generator (default is IP-based)
    keyGenerator: (req: Request) => {
      // Could be enhanced to use user ID for authenticated requests
      return req.ip || 'unknown';
    },

    // Custom handler for when limit is exceeded
    handler: (req, res) => {
      console.warn(`Rate limit exceeded for ${req.ip} [${req.requestId}]`);

      res.status(429).json({
        error: 'Too many requests from this IP, please try again later.',
        requestId: req.requestId,
        retryAfter: Math.ceil(
          parseInt(env.RATE_LIMIT_WINDOW_MS || '900000') / 1000
        ),
        timestamp: new Date().toISOString(),
      });
    },
  });
};
