import {
  CreateUserSchema,
  GetUserByIdSchema,
  GetUserByEmailSchema,
  GetUsersSchema,
  UpdateUserSchema,
} from '@nextstack/validators';

import { handleError } from '../errors';
import { protectedProcedure } from '../procedures/protected';
import { publicProcedure } from '../procedures/public';
import { UserService } from '../services/user.service';
import { router } from '../trpc';

export const userRouter = router({
  all: publicProcedure
    .input(GetUsersSchema)
    .query(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await userService.getUsers(input);
      } catch (error) {
        throw handleError(error);
      }
    }),

  byId: publicProcedure
    .input(GetUserByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await userService.getUserById(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),

  byEmail: publicProcedure
    .input(GetUserByEmailSchema)
    .query(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await userService.getUserByEmail(input.email);
      } catch (error) {
        throw handleError(error);
      }
    }),

  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await userService.createUser(input);
      } catch (error) {
        throw handleError(error);
      }
    }),

  update: protectedProcedure
    .input(GetUserByIdSchema.merge(UpdateUserSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        const { id, ...data } = input;
        return await userService.updateUser(id, data);
      } catch (error) {
        throw handleError(error);
      }
    }),

  delete: protectedProcedure
    .input(GetUserByIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await userService.deleteUser(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),

  // New endpoint for user stats
  stats: publicProcedure
    .input(GetUserByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const userService = new UserService({
          db: ctx.db,
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
        return await userService.getUserStats(input.id);
      } catch (error) {
        throw handleError(error);
      }
    }),
});