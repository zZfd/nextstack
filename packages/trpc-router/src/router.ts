import { publicProcedure } from './procedures/public';
import { getMe, getSession } from './routers/auth';
import {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} from './routers/user';
import { router } from './trpc';

export function createAppRouter(config: {
  version?: string;
  environment?: string;
}) {
  return router({
    // Core router for CRUD operations
    core: router({
      user: router({
        create: createUser,
        update: updateUser,
        delete: deleteUser,
        get: getUser,
        list: getUsers,
      }),
    }),

    // Main router for business operations
    main: router({
      auth: router({
        getMe,
        getSession,
      }),
      user: router({
        getByEmail: getUserByEmail,
        stats: getUserStats,
      }),
    }),

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
