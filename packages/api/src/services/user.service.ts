import type { User, PrismaClient } from '@nextstack/database';
import type {
  CreateUserInput,
  UpdateUserInput,
  GetUsersInput,
} from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../errors/business.error';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

interface UserServiceContext {
  userId?: string;
  sessionId?: string;
}

export const UserService = {
  /**
   * Get users with optional search functionality
   */
  async getUsers(db: PrismaClient, input: GetUsersInput): Promise<User[]> {
    if (input.search) {
      return await db.user.findMany({
        where: {
          OR: [
            { name: { contains: input.search, mode: 'insensitive' } },
            { email: { contains: input.search, mode: 'insensitive' } },
          ],
        },
        take: input.limit,
        cursor: input.cursor ? { id: input.cursor } : undefined,
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

    return await db.user.findMany({
      take: input.limit,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
  },

  /**
   * Get users with pagination
   */
  async getUsersPaginated(
    db: PrismaClient,
    input: GetUsersInput & { page?: number; pageSize?: number }
  ): Promise<PaginatedResult<User>> {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const where = input.search
      ? {
          OR: [
            { name: { contains: input.search, mode: 'insensitive' as const } },
            { email: { contains: input.search, mode: 'insensitive' as const } },
          ],
        }
      : undefined;

    const [data, total] = await Promise.all([
      db.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: pageSize,
        skip,
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      }),
      db.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  },

  /**
   * Get user by ID with posts
   */
  async getUserById(db: PrismaClient, id: string): Promise<User> {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    if (!user) {
      throw new BusinessError(ErrorCodes.USER_NOT_FOUND, 'User not found', 404);
    }

    return user;
  },

  /**
   * Get user by email with posts
   */
  async getUserByEmail(db: PrismaClient, email: string): Promise<User> {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    if (!user) {
      throw new BusinessError(ErrorCodes.USER_NOT_FOUND, 'User not found', 404);
    }

    return user;
  },

  /**
   * Create a new user with email uniqueness validation
   */
  async createUser(db: PrismaClient, input: CreateUserInput): Promise<User> {
    return await db.$transaction(async (tx) => {
      // Check if user with email already exists
      const existingUser = await tx.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new BusinessError(
          ErrorCodes.USER_ALREADY_EXISTS,
          'User with this email already exists',
          409
        );
      }

      // Create user
      const user = await tx.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });

      // Here you could add additional operations within the transaction
      // For example, creating a default profile, sending welcome email, etc.

      return user;
    });
  },

  /**
   * Update user with authorization checks
   */
  async updateUser(
    db: PrismaClient,
    id: string,
    input: UpdateUserInput,
    context?: UserServiceContext
  ): Promise<User> {
    return await db.$transaction(async (tx) => {
      // Check if user exists
      const user = await tx.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BusinessError(ErrorCodes.USER_NOT_FOUND, 'User not found', 404);
      }

      // Check authorization (user can only update their own profile)
      if (context?.userId && context.userId !== id) {
        throw new BusinessError(
          ErrorCodes.CANNOT_UPDATE_OTHER_USER,
          'You can only update your own profile',
          403
        );
      }

      // Sanitize input to only allow certain fields to be updated
      const sanitizedInput: { name?: string; email?: string } = {};

      if (input.name !== undefined && input.name !== null) {
        sanitizedInput.name = input.name;
      }

      if (input.email !== undefined && input.email !== null) {
        sanitizedInput.email = input.email;
      }

      // Check if email is being changed and if it's already taken
      if (sanitizedInput.email && sanitizedInput.email !== user.email) {
        const existingUser = await tx.user.findUnique({
          where: { email: sanitizedInput.email },
        });
        if (existingUser) {
          throw new BusinessError(
            ErrorCodes.EMAIL_ALREADY_TAKEN,
            'Email is already taken',
            409
          );
        }
      }

      return await tx.user.update({
        where: { id },
        data: sanitizedInput,
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });
    });
  },

  /**
   * Delete user with authorization checks and cascade operations
   */
  async deleteUser(
    db: PrismaClient,
    id: string,
    context?: UserServiceContext
  ): Promise<User> {
    return await db.$transaction(async (tx) => {
      // Check if user exists
      const user = await tx.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BusinessError(ErrorCodes.USER_NOT_FOUND, 'User not found', 404);
      }

      // Check authorization
      if (context?.userId && context.userId !== id) {
        throw new BusinessError(
          ErrorCodes.CANNOT_DELETE_OTHER_USER,
          'You can only delete your own account',
          403
        );
      }

      // Delete all user's posts first (if not using cascade delete)
      await tx.post.deleteMany({
        where: { authorId: id },
      });

      // Delete the user
      return await tx.user.delete({
        where: { id },
      });
    });
  },

  /**
   * Get user statistics including post count and join duration
   */
  async getUserStats(db: PrismaClient, id: string): Promise<{
    user: User;
    postCount: number;
    joinedDaysAgo: number;
  }> {
    const [user, postCount] = await Promise.all([
      db.user.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      }),
      db.post.count({
        where: { authorId: id },
      }),
    ]);

    if (!user) {
      throw new BusinessError(ErrorCodes.USER_NOT_FOUND, 'User not found', 404);
    }

    const joinedDaysAgo = Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      user,
      postCount,
      joinedDaysAgo,
    };
  },
};