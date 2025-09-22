import { publicProcedure } from './procedures/public';
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { router } from './trpc';

// Factory function to create app router with environment config
export function createAppRouter(config: {
  version?: string;
  environment?: string;
}) {
  return router({
    // Authentication
    auth: authRouter,

    // Core business domains
    user: userRouter,

    // System information
    _meta: {
      health: publicProcedure.query(() => ({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      })),
      version: publicProcedure.query(() => ({
        version: config.version || '0.0.0',
        environment: config.environment || 'development',
      })),
    },
  });
}

export type AppRouter = ReturnType<typeof createAppRouter>;
