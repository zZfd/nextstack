import type { Prisma } from '@nextstack/database';

/**
 * Common search query builders for users
 */
export const UserQueryUtils = {
  /**
   * Build search where clause for user queries
   */
  buildSearchWhere(search?: string): Prisma.UserWhereInput | undefined {
    if (!search) return undefined;

    return {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    };
  },

  /**
   * Build user list query with search and ordering
   */
  buildUserListQuery(params: {
    search?: string;
    limit?: number;
    cursor?: string;
    select?: Prisma.UserSelect;
  }): Prisma.UserFindManyArgs {
    return {
      where: this.buildSearchWhere(params.search),
      take: params.limit,
      cursor: params.cursor ? { id: params.cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      select: params.select,
    };
  },

  /**
   * Build user find unique query with select
   */
  buildUserFindUniqueQuery(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Prisma.UserFindUniqueArgs {
    return {
      where: params.where,
      select: params.select,
    };
  },
};