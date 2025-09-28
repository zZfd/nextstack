// Load environment variables first
import './env';

import { createAppRouter, createExpressContext, createAuthFromConfig, createAuthHandler } from '@nextstack/trpc-router';
import * as trpcExpress from '@trpc/server/adapters/express';
import compression from 'compression';
import express from 'express';

// Import custom middleware and configurations
import {
  env,
  requestIdMiddleware,
  timeoutMiddleware,
  requestLogger,
  createSecurityMiddleware,
  createCorsMiddleware,
  createRateLimitMiddleware,
  globalErrorHandler,
  notFoundHandler,
} from './middleware';
import { setupGracefulShutdown } from './utils/shutdown';

const app = express();
const port = env.PORT || 3001;

// Create auth instance with environment config
const auth = createAuthFromConfig({
  secret: env.BETTER_AUTH_SECRET!,
  baseURL: env.BETTER_AUTH_URL || 'http://localhost:3000',
  corsOrigins: env.CORS_ORIGINS?.split(','),
  isDevelopment: env.NODE_ENV === 'development',
});

// Create Better Auth HTTP handler
const authHandler = createAuthHandler(auth);

// Create app router with environment config
const appRouter = createAppRouter({
  version: process.env.npm_package_version || '0.0.0',
  environment: env.NODE_ENV,
});

// ===== MIDDLEWARE SETUP =====
// Order is critical - each middleware builds on the previous ones

// 1. Request ID (must be first - other middleware depend on it)
app.use(requestIdMiddleware);

// 2. Request timeout (early protection against long-running requests)
app.use(timeoutMiddleware);

// 3. Security headers (protect against common attacks)
app.use(createSecurityMiddleware());

// 4. CORS handling (apply to all routes including auth)
app.use(createCorsMiddleware());

// 5. Request logging (after security and CORS, before business logic)
app.use(requestLogger);

// 6. Body parsing and compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 7. Rate limiting (protect API endpoints)
const rateLimiter = createRateLimitMiddleware();
app.use('/trpc', rateLimiter);

// ===== ROUTES =====

// Health check endpoint (before tRPC to avoid interference)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'nextstack-api',
    version: process.env.npm_package_version || '0.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: env.NODE_ENV,
    requestId: req.requestId,
  });
});

// Better Auth API routes (handle all /api/auth/* endpoints)
app.use('/api/auth', authHandler);

// tRPC API routes
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContext(auth, env.NODE_ENV === 'development'),
    onError: ({ error, type, path, input, req }) => {
      console.error(`❌ tRPC Error [${req?.requestId}]:`, {
        type,
        path,
        error: error.message,
        code: error.code,
        input: env.NODE_ENV === 'development' ? input : '[REDACTED]',
      });
    },
  })
);

// ===== ERROR HANDLING =====

// 404 handler (must be after all routes but before global error handler)
app.use('*', notFoundHandler);

// Global error handler (must be last)
app.use(globalErrorHandler);

// ===== SERVER STARTUP =====

const server = app.listen(port, () => {
  console.log('🎯 NextStack API Server Started');
  console.log(`├─ 🚀 Server: http://localhost:${port}`);
  console.log(`├─ 📊 Health: http://localhost:${port}/health`);
  console.log(`├─ 🔌 tRPC: http://localhost:${port}/trpc`);
  console.log(`├─ 🔒 Environment: ${env.NODE_ENV}`);
  console.log(`└─ 🆔 Process: ${process.pid}`);
});

// Setup graceful shutdown handling
setupGracefulShutdown(server);
