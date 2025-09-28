import { GetUsersSchema } from '@nextstack/validators';

import { publicProcedure } from '../../procedures/public';
import { UserQueryUtils, userWithCountsSelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const getUsers = publicProcedure
  .input(GetUsersSchema)
  .query(async ({ ctx, input }) => {
    try {
      const queryArgs = UserQueryUtils.buildUserListQuery({
        search: input.search,
        limit: input.limit,
        cursor: input.cursor,
        select: userWithCountsSelect,
      });

      return await ctx.db.user.findMany(queryArgs);
    } catch (error) {
      throw handleServiceError(error);
    }
  });