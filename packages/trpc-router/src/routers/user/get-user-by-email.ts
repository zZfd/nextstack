import { GetUserByEmailSchema } from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../../errors/business.error';
import { publicProcedure } from '../../procedures/public';
import { userWithPostsSummarySelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const getUserByEmail = publicProcedure
  .input(GetUserByEmailSchema)
  .query(async ({ ctx, input }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
        select: userWithPostsSummarySelect,
      });

      if (!user) {
        throw new BusinessError(
          ErrorCodes.USER_NOT_FOUND,
          'User not found',
          404
        );
      }

      return user;
    } catch (error) {
      throw handleServiceError(error);
    }
  });
