import { publicProcedure } from './procedures/public';
import { postRouter } from './routers/post';
import { storageRouter } from './routers/storage';
import { userRouter } from './routers/user';
import { router } from './trpc';

export const appRouter = router({
  // Core business domains
  user: userRouter,
  post: postRouter,
  storage: storageRouter,

  // System information
  _meta: {
    health: publicProcedure.query(() => ({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    })),
    version: publicProcedure.query(() => ({
      version: process.env.npm_package_version || '0.0.0',
      environment: process.env.NODE_ENV || 'development',
    })),
  },
});

export type AppRouter = typeof appRouter;
