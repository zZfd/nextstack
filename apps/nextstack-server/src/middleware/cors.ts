import cors from 'cors';

import { env } from './validation';

/**
 * CORS middleware configuration
 * Handles Cross-Origin Resource Sharing policies
 */
export const createCorsMiddleware = () => {
  // Parse CORS origins from environment
  const corsOrigins = env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000', // nextstack-web
    'http://localhost:5173', // Vite dev server
    'http://localhost:8081', // React Native Metro
  ];

  return cors({
    // Allow specific origins
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      // In development, be more permissive
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `⚠️ CORS warning: Origin ${origin} not in allowed list, but allowing in development`
        );
        return callback(null, true);
      }

      // In production, reject unknown origins
      return callback(
        new Error(`CORS policy violation: Origin ${origin} not allowed`)
      );
    },

    // Allow credentials (cookies, authorization headers)
    credentials: true,

    // Allowed HTTP methods
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],

    // Allowed headers
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-Request-Id',
      'Accept',
      'Origin',
    ],

    // Exposed headers (available to the client)
    exposedHeaders: [
      'X-Request-Id',
      'X-RateLimit-Remaining',
      'X-RateLimit-Reset',
    ],

    // Preflight cache duration (24 hours)
    maxAge: 86400,

    // Handle OPTIONS requests
    optionsSuccessStatus: 200,
  });
};
