import type { Post } from '@nextstack/database';
import type {
  CreatePostInput,
  UpdatePostInput,
  GetPostsInput,
} from '@nextstack/validators';

import type { PaginatedResult } from '../repositories/base.repository';
import { PostRepository } from '../repositories/post.repository';
import { UserRepository } from '../repositories/user.repository';

import { BaseService, type ServiceContext } from './base.service';

export class PostService extends BaseService {
  private readonly postRepository: PostRepository;
  private readonly userRepository: UserRepository;

  constructor(context: ServiceContext) {
    super(context);
    this.postRepository = new PostRepository(this.db);
    this.userRepository = new UserRepository(this.db);
  }

  async getPosts(input: GetPostsInput): Promise<Post[]> {
    const where: {
      authorId?: string;
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    } = {};

    if (input.authorId) {
      where.authorId = input.authorId;
    }

    if (input.status !== undefined) {
      where.status = input.status;
    }

    return await this.postRepository.findMany({
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
      },
    });
  }

  async getPostsPaginated(
    input: GetPostsInput & { page?: number; pageSize?: number }
  ): Promise<PaginatedResult<Post>> {
    const where: {
      authorId?: string;
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    } = {};

    if (input.authorId) {
      where.authorId = input.authorId;
    }

    if (input.status !== undefined) {
      where.status = input.status;
    }

    return await this.postRepository.findManyPaginated({
      where,
      orderBy: { createdAt: 'desc' },
      page: input.page,
      pageSize: input.pageSize,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getPublishedPosts(limit = 10, cursor?: string): Promise<Post[]> {
    return await this.postRepository.findPublishedPosts(limit, cursor);
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findWithAuthor(id);
    return await this.validateExists(post, 'Post');
  }

  async getUserPosts(userId: string, includeUnpublished = false): Promise<Post[]> {
    // Check if user exists
    const user = await this.userRepository.findById(userId);
    await this.validateExists(user, 'User');

    // If requesting unpublished posts, check authorization
    if (includeUnpublished && this.userId !== userId) {
      throw new Error('You can only view your own unpublished posts');
    }

    return await this.postRepository.findUserPosts(userId, includeUnpublished);
  }

  async createPost(input: CreatePostInput): Promise<Post> {
    // Must be authenticated
    this.checkAuthentication();

    // Verify the author exists (should be the authenticated user)
    const author = await this.userRepository.findById(input.authorId);
    await this.validateExists(author, 'Author');

    // Check that the authenticated user is creating a post for themselves
    if (this.userId !== input.authorId) {
      throw new Error('You can only create posts for yourself');
    }

    return await this.withTransaction(async (tx) => {
      const postRepo = new PostRepository(tx);

      const post = await postRepo.create(
        {
          title: input.title,
          content: input.content || '',
          status: input.status,
          author: {
            connect: { id: input.authorId },
          },
        },
        {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        }
      );

      // Here you could add additional operations
      // For example, sending notifications, updating user stats, etc.

      return post;
    });
  }

  async updatePost(id: string, input: UpdatePostInput): Promise<Post> {
    // Get the post
    const post = await this.postRepository.findById(id);
    const validatedPost = await this.validateExists(post, 'Post');

    // Check authorization (only author can update)
    this.checkAuthorization(validatedPost.authorId);

    // Sanitize input
    const allowedFields = ['title', 'content', 'status'];
    const sanitizedInput = this.sanitizeInput(input, allowedFields);

    // Handle null content by converting to empty string if needed
    const updateData = {
      ...sanitizedInput,
      ...(sanitizedInput.content !== undefined && {
        content: sanitizedInput.content || ''
      })
    };

    return await this.postRepository.update(id, updateData, {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async publishPost(id: string): Promise<Post> {
    // Get the post
    const post = await this.postRepository.findById(id);
    const validatedPost = await this.validateExists(post, 'Post');

    // Check authorization
    this.checkAuthorization(validatedPost.authorId);

    if (validatedPost.status === 'PUBLISHED') {
      throw new Error('Post is already published');
    }

    return await this.postRepository.publishPost(id);
  }

  async unpublishPost(id: string): Promise<Post> {
    // Get the post
    const post = await this.postRepository.findById(id);
    const validatedPost = await this.validateExists(post, 'Post');

    // Check authorization
    this.checkAuthorization(validatedPost.authorId);

    if (validatedPost.status !== 'PUBLISHED') {
      throw new Error('Post is not published');
    }

    return await this.postRepository.unpublishPost(id);
  }

  async deletePost(id: string): Promise<Post> {
    // Get the post
    const post = await this.postRepository.findById(id);
    const validatedPost = await this.validateExists(post, 'Post');

    // Check authorization
    this.checkAuthorization(validatedPost.authorId);

    return await this.postRepository.delete(id);
  }

  async searchPosts(query: string, limit = 10): Promise<Post[]> {
    if (!query || query.trim().length < 2) {
      throw new Error('Search query must be at least 2 characters');
    }

    return await this.postRepository.searchPosts(query, limit);
  }

  async getPostStats(id: string): Promise<{
    post: Post;
    wordCount: number;
    readingTimeMinutes: number;
  }> {
    const stats = await this.postRepository.getPostStats(id);
    const post = await this.validateExists(stats.post, 'Post');

    // Calculate word count and reading time
    const wordCount = post.content?.split(/\s+/).length ?? 0;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // Assuming 200 words per minute

    return {
      post,
      wordCount,
      readingTimeMinutes,
    };
  }
}