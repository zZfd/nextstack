import {
  CreatePostSchema,
  GetPostByIdSchema,
  GetPostsSchema,
  UpdatePostSchema,
} from '@nextstack/validators';
import { z } from 'zod';

import { handleError } from '../errors';
import { protectedProcedure } from '../procedures/protected';
import { publicProcedure } from '../procedures/public';
import { PostService } from '../services/post.service';
import { router } from '../trpc';

export const postRouter = router({
  all: publicProcedure
    .input(GetPostsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await postService.getPosts(input);
      } catch (error) {
        throw handleError(error);
      }
    }),

  published: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await postService.getPublishedPosts(input.limit, input.cursor);
      } catch (error) {
        throw handleError(error);
      }
    }),

  byId: publicProcedure
    .input(GetPostByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await postService.getPostById(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user.id,
          sessionId: ctx.session.id,
        });
        return await postService.createPost(input);
      } catch (error) {
        throw handleError(error);
      }
    }),

  update: protectedProcedure
    .input(GetPostByIdSchema.merge(UpdatePostSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user.id,
          sessionId: ctx.session.id,
        });
        const { id, ...data } = input;
        return await postService.updatePost(id, data);
      } catch (error) {
        throw handleError(error);
      }
    }),

  publish: protectedProcedure
    .input(GetPostByIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user.id,
          sessionId: ctx.session.id,
        });
        return await postService.publishPost(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),

  unpublish: protectedProcedure
    .input(GetPostByIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user.id,
          sessionId: ctx.session.id,
        });
        return await postService.unpublishPost(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),

  delete: protectedProcedure
    .input(GetPostByIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user.id,
          sessionId: ctx.session.id,
        });
        return await postService.deletePost(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),

  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(2),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await postService.searchPosts(input.query, input.limit);
      } catch (error) {
        throw handleError(error);
      }
    }),

  stats: publicProcedure
    .input(GetPostByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const postService = new PostService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await postService.getPostStats(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),
});
