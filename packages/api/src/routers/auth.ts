import { z } from 'zod';

import { protectedProcedure } from '../procedures/protected';
import { publicProcedure } from '../procedures/public';
import { router } from '../trpc';

export const authRouter = router({
  // Get current user session - requires authentication
  getMe: protectedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
      session: ctx.session,
    };
  }),

  // Public endpoint to check auth status
  getSession: publicProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
      session: ctx.session,
      isAuthenticated: !!ctx.user,
    };
  }),
});
