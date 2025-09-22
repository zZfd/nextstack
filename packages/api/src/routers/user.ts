import {
  CreateUserSchema,
  GetUserByIdSchema,
  GetUserByEmailSchema,
  GetUsersSchema,
  UpdateUserSchema,
} from '@nextstack/validators';

import { protectedProcedure } from '../procedures/protected';
import { publicProcedure } from '../procedures/public';
import { UserService } from '../services/user.service';
import { router } from '../trpc';
import { handleServiceError } from '../utils/error-handler';

export const userRouter = router({
  all: publicProcedure
    .input(GetUsersSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await UserService.getUsers(ctx.db, input);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  byId: publicProcedure
    .input(GetUserByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await UserService.getUserById(ctx.db, input.id);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  byEmail: publicProcedure
    .input(GetUserByEmailSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await UserService.getUserByEmail(ctx.db, input.email);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await UserService.createUser(ctx.db, input);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  update: protectedProcedure
    .input(GetUserByIdSchema.merge(UpdateUserSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;
        return await UserService.updateUser(ctx.db, id, data, {
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  delete: protectedProcedure
    .input(GetUserByIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await UserService.deleteUser(ctx.db, input.id, {
          userId: ctx.user?.id,
          sessionId: ctx.session?.id,
        });
      } catch (error) {
        throw handleServiceError(error);
      }
    }),

  stats: publicProcedure
    .input(GetUserByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await UserService.getUserStats(ctx.db, input.id);
      } catch (error) {
        throw handleServiceError(error);
      }
    }),
});