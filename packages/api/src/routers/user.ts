import { 
  CreateUserSchema,
  GetUserByIdSchema,
  GetUserByEmailSchema,
  GetUsersSchema,
  UpdateUserSchema,
} from '@nextstack/validators';

import { publicProcedure } from '../procedures/public';
import { router } from '../trpc';

export const userRouter = router({
  all: publicProcedure
    .input(GetUsersSchema)
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        take: input.limit,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: input.search ? {
          OR: [
            { name: { contains: input.search, mode: 'insensitive' } },
            { email: { contains: input.search, mode: 'insensitive' } },
          ]
        } : undefined,
        orderBy: { id: 'desc' },
        include: { _count: { select: { posts: true } } },
      });
    }),
  
  byId: publicProcedure
    .input(GetUserByIdSchema)
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({ 
        where: { id: input.id },
        include: { 
          posts: { orderBy: { id: 'desc' } },
          _count: { select: { posts: true } }
        }
      });
    }),
  
  byEmail: publicProcedure
    .input(GetUserByEmailSchema)
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({ 
        where: { email: input.email },
        include: { 
          posts: { orderBy: { id: 'desc' } },
          _count: { select: { posts: true } }
        }
      });
    }),
  
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({ 
        data: input,
        include: { _count: { select: { posts: true } } }
      });
    }),
  
  update: publicProcedure
    .input(GetUserByIdSchema.merge(UpdateUserSchema))
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.user.update({ 
        where: { id }, 
        data,
        include: { _count: { select: { posts: true } } }
      });
    }),
  
  delete: publicProcedure
    .input(GetUserByIdSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.user.delete({ where: { id: input.id } });
    }),
});