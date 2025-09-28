import type { Prisma } from '@nextstack/database';
import { GetUsersSchema } from '@nextstack/validators';

import { publicProcedure } from '../../procedures/public';
import { userWithCountsSelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const getUsers = publicProcedure
  .input(GetUsersSchema)
  .query(async ({ ctx, input }) => {
    try {
      // Build search where clause
      const searchWhere: Prisma.UserWhereInput | undefined = input.search
        ? {
            OR: [
              { name: { contains: input.search, mode: 'insensitive' } },
              { email: { contains: input.search, mode: 'insensitive' } },
            ],
          }
        : undefined;

      // Build query arguments
      const queryArgs: Prisma.UserFindManyArgs = {
        where: searchWhere,
        take: input.limit,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        select: userWithCountsSelect,
      };

      return await ctx.db.user.findMany(queryArgs);
    } catch (error) {
      throw handleServiceError(error);
    }
  });