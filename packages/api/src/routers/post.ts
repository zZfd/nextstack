import { 
  CreatePostSchema,
  GetPostByIdSchema,
  GetPostsSchema,
  UpdatePostSchema,
} from '@nextstack/validators';

import { publicProcedure, router } from '../trpc';

export const postRouter = router({
  all: publicProcedure
    .input(GetPostsSchema)
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        take: input.limit,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: input.published !== undefined ? { published: input.published } : undefined,
        orderBy: { id: 'desc' },
      });
    }),
  
  byId: publicProcedure
    .input(GetPostByIdSchema)
    .query(({ ctx, input }) => {
      return ctx.db.post.findFirst({ 
        where: { id: input.id },
        include: { author: true }
      });
    }),
  
  create: publicProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({ data: input });
    }),
  
  update: publicProcedure
    .input(GetPostByIdSchema.merge(UpdatePostSchema))
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.post.update({ 
        where: { id }, 
        data,
        include: { author: true }
      });
    }),
  
  delete: publicProcedure
    .input(GetPostByIdSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({ where: { id: input.id } });
    }),
});
