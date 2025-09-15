import type { Prisma, User } from '@nextstack/database';

import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserWhereInput,
  Prisma.UserWhereUniqueInput,
  Prisma.UserOrderByWithRelationInput
> {
  protected get model() {
    return this.db.user;
  }

  async findByEmail(
    email: string,
    include?: Prisma.UserInclude
  ): Promise<User | null> {
    return await this.findOne({ email }, include);
  }

  async findWithPosts(id: string): Promise<User | null> {
    return await this.findById(id, {
      posts: {
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: {
          posts: true,
        },
      },
    });
  }

  async searchUsers(
    query: string,
    limit = 10,
    cursor?: string
  ): Promise<User[]> {
    return await this.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
  }

  async updateLastLogin(userId: string): Promise<User> {
    return await this.update(userId, {
      updatedAt: new Date(),
    });
  }

  async getUserStats(userId: string): Promise<{
    user: User | null;
    postCount: number;
  }> {
    const user = await this.findById(userId);
    const postCount = await this.db.post.count({
      where: { authorId: userId },
    });

    return {
      user,
      postCount,
    };
  }

  async bulkCreateUsers(
    users: Prisma.UserCreateInput[]
  ): Promise<Prisma.BatchPayload> {
    return await this.createMany(users);
  }

  async softDelete(id: string): Promise<User> {
    return await this.update(id, {
      // deletedAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
