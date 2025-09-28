import { protectedProcedure } from '../../procedures/protected';

export const getMe = protectedProcedure.query(({ ctx }) => {
  return {
    user: ctx.user,
    session: ctx.session,
  };
});