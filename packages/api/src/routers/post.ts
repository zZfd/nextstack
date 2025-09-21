import {
  CreatePostSchema,
  GetPostByIdSchema,
  GetPostsSchema,
  UpdatePostSchema,
} from '@nextstack/validators';
import { z } from 'zod';

import { protectedProcedure } from '../procedures/protected';
import { publicProcedure } from '../procedures/public';
import { PostService } from '../services/post.service';
import { handleServiceError } from '../utils/error-handler';
import { router } from '../trpc';

export const postRouter = router({
  all: publicProcedure
    .input(GetPostsSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await PostService.getPosts(ctx.db, input);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  byId: publicProcedure
    .input(GetPostByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await PostService.getPostById(ctx.db, input.id);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await PostService.createPost(ctx.db, input, {
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  update: protectedProcedure
    .input(GetPostByIdSchema.merge(UpdatePostSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;
        return await PostService.updatePost(ctx.db, id, data, {
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  delete: protectedProcedure
    .input(GetPostByIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await PostService.deletePost(ctx.db, input.id, {
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
      } catch (error) {
        throw handleServiceError(error);
      }
    }),


  stats: publicProcedure
    .input(GetPostByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await PostService.getPostStats(ctx.db, input.id);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),
});