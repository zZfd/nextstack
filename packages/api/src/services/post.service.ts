import type { Post, PrismaClient } from '@nextstack/database';
import type {
  CreatePostInput,
  UpdatePostInput,
  GetPostsInput,
} from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../errors/business.error';
import type { PaginatedResult } from './user.service';

interface PostServiceContext {
  userId?: string;
  sessionId?: string;
}

export const PostService = {
  /**
   * Get posts with optional filtering
   */
  async getPosts(db: PrismaClient, input: GetPostsInput): Promise<Post[]> {
    const where: {
      authorId?: string;
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    } = {};

    if (input.authorId) {
      where.authorId = input.authorId;
    }

    if (input.status) {
      where.status = input.status;
    }

    return await db.post.findMany({
      where,
      take: input.limit,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        media: {
          include: {
            file: true,
          },
        },
      },
    });
  },

  /**
   * Get posts with pagination
   */
  async getPostsPaginated(
    db: PrismaClient,
    input: GetPostsInput & { page?: number; pageSize?: number }
  ): Promise<PaginatedResult<Post>> {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const where: {
      authorId?: string;
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    } = {};

    if (input.authorId) {
      where.authorId = input.authorId;
    }

    if (input.status) {
      where.status = input.status;
    }

    const [data, total] = await Promise.all([
      db.post.findMany({
        where,
        take: pageSize,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          media: {
            include: {
              file: true,
            },
          },
        },
      }),
      db.post.count({ where }),
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
   * Get post by ID with author details
   */
  async getPostById(db: PrismaClient, id: string): Promise<Post> {
    const post = await db.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        media: {
          include: {
            file: true,
          },
        },
      },
    });

    if (!post) {
      throw new BusinessError(ErrorCodes.POST_NOT_FOUND, 'Post not found', 404);
    }

    return post;
  },

  /**
   * Create a new post
   */
  async createPost(
    db: PrismaClient,
    input: CreatePostInput,
    context: PostServiceContext
  ): Promise<Post> {
    if (!context.userId) {
      throw new BusinessError(
        ErrorCodes.UNAUTHORIZED_ACCESS,
        'User must be authenticated to create posts',
        401
      );
    }

    const createData: {
      title?: string;
      content: string;
      status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
      authorId: string;
    } = {
      content: input.content || '',
      status: input.status || 'DRAFT',
      authorId: context.userId!,
    };

    if (input.title) {
      createData.title = input.title;
    }

    return await db.post.create({
      data: createData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        media: {
          include: {
            file: true,
          },
        },
      },
    });
  },

  /**
   * Update post with authorization checks
   */
  async updatePost(
    db: PrismaClient,
    id: string,
    input: UpdatePostInput,
    context: PostServiceContext
  ): Promise<Post> {
    return await db.$transaction(async (tx) => {
      // Check if post exists
      const post = await tx.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new BusinessError(ErrorCodes.POST_NOT_FOUND, 'Post not found', 404);
      }

      // Check authorization (user can only update their own posts)
      if (context.userId && context.userId !== post.authorId) {
        throw new BusinessError(
          ErrorCodes.CANNOT_UPDATE_OTHER_POST,
          'You can only update your own posts',
          403
        );
      }

      const updateData: {
        title?: string;
        content?: string;
        status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
      } = {};

      if (input.title !== undefined) {
        updateData.title = input.title;
      }

      if (input.content !== undefined) {
        updateData.content = input.content || '';
      }

      if (input.status !== undefined) {
        updateData.status = input.status;
      }

      return await tx.post.update({
        where: { id },
        data: updateData,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          media: {
            include: {
              file: true,
            },
          },
        },
      });
    });
  },

  /**
   * Delete post with authorization checks
   */
  async deletePost(
    db: PrismaClient,
    id: string,
    context: PostServiceContext
  ): Promise<Post> {
    return await db.$transaction(async (tx) => {
      // Check if post exists
      const post = await tx.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new BusinessError(ErrorCodes.POST_NOT_FOUND, 'Post not found', 404);
      }

      // Check authorization
      if (context.userId && context.userId !== post.authorId) {
        throw new BusinessError(
          ErrorCodes.CANNOT_DELETE_OTHER_POST,
          'You can only delete your own posts',
          403
        );
      }

      // Delete the post (media will be cascade deleted by database)
      return await tx.post.delete({
        where: { id },
      });
    });
  },

  /**
   * Get post statistics
   */
  async getPostStats(db: PrismaClient, id: string): Promise<{
    post: Post;
    mediaCount: number;
  }> {
    const [post, mediaCount] = await Promise.all([
      db.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          media: {
            include: {
              file: true,
            },
          },
        },
      }),
      db.postMedia.count({
        where: { postId: id },
      }),
    ]);

    if (!post) {
      throw new BusinessError(ErrorCodes.POST_NOT_FOUND, 'Post not found', 404);
    }

    return {
      post,
      mediaCount,
    };
  },
};