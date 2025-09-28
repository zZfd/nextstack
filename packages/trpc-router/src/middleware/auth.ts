import { TRPCError } from '@trpc/server';

import { middleware } from '../trpc';

export const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      // Ensure user and session are not null in protected routes
      user: ctx.user,
      session: ctx.session,
    },
  });
});

export const isOptionalAuth = middleware(async ({ ctx, next }) => {
  // This middleware doesn't throw but provides auth context
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      session: ctx.session,
    },
  });
});
