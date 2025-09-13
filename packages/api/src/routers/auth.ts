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

  // Update user profile - requires authentication
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedUser = await ctx.db.user.update({
        where: { id: ctx.user.id },
        data: {
          ...(input.name !== undefined && { name: input.name }),
          ...(input.image !== undefined && { image: input.image }),
        },
      });

      return updatedUser;
    }),
});
