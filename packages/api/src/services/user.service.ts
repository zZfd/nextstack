import type { User } from '@nextstack/database';
import type {
  CreateUserInput,
  UpdateUserInput,
  GetUsersInput,
} from '@nextstack/validators';

import type { PaginatedResult } from '../repositories/base.repository';
import { UserRepository } from '../repositories/user.repository';

import { BaseService, type ServiceContext } from './base.service';

export class UserService extends BaseService {
  private readonly userRepository: UserRepository;

  constructor(context: ServiceContext) {
    super(context);
    this.userRepository = new UserRepository(this.db);
  }

  async getUsers(input: GetUsersInput): Promise<User[]> {
    if (input.search) {
      return await this.userRepository.searchUsers(
        input.search,
        input.limit,
        input.cursor
      );
    }

    return await this.userRepository.findMany({
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

  async getUsersPaginated(
    input: GetUsersInput & { page?: number; pageSize?: number }
  ): Promise<PaginatedResult<User>> {
    const where = input.search
      ? {
          OR: [
            { name: { contains: input.search, mode: 'insensitive' as const } },
            { email: { contains: input.search, mode: 'insensitive' as const } },
          ],
        }
      : undefined;

    return await this.userRepository.findManyPaginated({
      where,
      orderBy: { createdAt: 'desc' },
      page: input.page,
      pageSize: input.pageSize,
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findWithPosts(id);
    return await this.validateExists(user, 'User');
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email, {
      posts: {
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: {
          posts: true,
        },
      },
    });
    return await this.validateExists(user, 'User');
  }

  async createUser(input: CreateUserInput): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user with transaction
    return await this.withTransaction(async (tx) => {
      const userRepo = new UserRepository(tx);

      const user = await userRepo.create(
        {
          email: input.email,
          name: input.name,
        },
        {
          _count: {
            select: {
              posts: true,
            },
          },
        }
      );

      // Here you could add additional operations within the transaction
      // For example, creating a default profile, sending welcome email, etc.

      return user;
    });
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    // Check if user exists
    const user = await this.userRepository.findById(id);
    await this.validateExists(user, 'User');

    // Check authorization if userId is set (user can only update their own profile)
    if (this.userId && this.userId !== id) {
      throw new Error('You can only update your own profile');
    }

    // Sanitize input to only allow certain fields to be updated
    const allowedFields = ['name', 'email'];
    const sanitizedInput = this.sanitizeInput(input, allowedFields);

    // Check if email is being changed and if it's already taken
    if (sanitizedInput.email && sanitizedInput.email !== user!.email) {
      const existingUser = await this.userRepository.findByEmail(
        sanitizedInput.email as string
      );
      if (existingUser) {
        throw new Error('Email is already taken');
      }
    }

    return await this.userRepository.update(id, sanitizedInput, {
      _count: {
        select: {
          posts: true,
        },
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    // Check if user exists
    const user = await this.userRepository.findById(id);
    await this.validateExists(user, 'User');

    // Check authorization
    if (this.userId && this.userId !== id) {
      throw new Error('You can only delete your own account');
    }

    // Use transaction to delete user and all related data
    return await this.withTransaction(async (tx) => {
      const userRepo = new UserRepository(tx);

      // Delete all user's posts first (if not using cascade delete)
      await tx.post.deleteMany({
        where: { authorId: id },
      });

      // Delete the user
      return await userRepo.delete(id);
    });
  }

  async getUserStats(id: string): Promise<{
    user: User;
    postCount: number;
    joinedDaysAgo: number;
  }> {
    const stats = await this.userRepository.getUserStats(id);
    const user = await this.validateExists(stats.user, 'User');

    const joinedDaysAgo = Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      user,
      postCount: stats.postCount,
      joinedDaysAgo,
    };
  }
}