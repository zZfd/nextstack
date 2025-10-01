import { GetUserByIdSchema } from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../../errors/business.error';
import { publicProcedure } from '../../procedures/public';
import { userStatsSelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const getUserStats = publicProcedure
  .input(GetUserByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const [user, postCount] = await Promise.all([
        ctx.db.user.findUnique({
          where: { id: input.id },
          select: userStatsSelect,
        }),
        ctx.db.post.count({
          where: { authorId: input.id },
        }),
      ]);

      if (!user) {
        throw new BusinessError(
          ErrorCodes.USER_NOT_FOUND,
          'User not found',
          404
        );
      }

      const joinedDaysAgo = Math.floor(
        (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        user,
        postCount,
        joinedDaysAgo,
      };
    } catch (error) {
      throw handleServiceError(error);
    }
  });
