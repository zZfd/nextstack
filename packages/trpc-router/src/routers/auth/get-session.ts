import { publicProcedure } from '../../procedures/public';

export const getSession = publicProcedure.query(({ ctx }) => {
  return {
    user: ctx.user,
    session: ctx.session,
    isAuthenticated: !!ctx.user,
  };
});
