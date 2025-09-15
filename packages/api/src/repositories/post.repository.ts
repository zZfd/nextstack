import type { Post, Prisma } from '@nextstack/database';

import { BaseRepository } from './base.repository';

export class PostRepository extends BaseRepository<
  Post,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput,
  Prisma.PostWhereInput,
  Prisma.PostWhereUniqueInput,
  Prisma.PostOrderByWithRelationInput
> {
  protected get model() {
    return this.db.post;
  }

  async findPublishedPosts(limit = 10, cursor?: string): Promise<Post[]> {
    return await this.findMany({
      where: {
        status: 'PUBLISHED',
      },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
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

  async findUserPosts(authorId: string, includeUnpublished = false): Promise<Post[]> {
    return await this.findMany({
      where: {
        authorId,
        ...(!includeUnpublished && { status: 'PUBLISHED' }),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
      },
    });
  }

  async findWithAuthor(id: string): Promise<Post | null> {
    return await this.findById(id, {
      author: true,
    });
  }

  async publishPost(id: string): Promise<Post> {
    return await this.update(id, {
      status: 'PUBLISHED',
    });
  }

  async unpublishPost(id: string): Promise<Post> {
    return await this.update(id, {
      status: 'DRAFT',
    });
  }

  async searchPosts(query: string, limit = 10): Promise<Post[]> {
    return await this.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
        status: 'PUBLISHED',
      },
      take: limit,
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

  async getPostStats(postId: string): Promise<{
    post: Post | null;
    viewCount?: number;
    likeCount?: number;
  }> {
    const post = await this.findById(postId);

    // 这里可以添加更多统计信息，如浏览量、点赞数等
    // 如果数据库有相应字段的话

    return {
      post,
      viewCount: 0, // placeholder
      likeCount: 0, // placeholder
    };
  }

  async incrementViewCount(id: string): Promise<Post> {
    // 如果有 viewCount 字段，可以实现浏览量增加
    return await this.update(id, {
      updatedAt: new Date(),
      // viewCount: { increment: 1 },
    });
  }
}