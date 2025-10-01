import { GetUserByIdSchema, UpdateUserSchema } from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../../errors/business.error';
import { protectedProcedure } from '../../procedures/protected';
import { userWithCountsSelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const updateUser = protectedProcedure
  .input(GetUserByIdSchema.merge(UpdateUserSchema))
  .mutation(async ({ ctx, input }) => {
    try {
      const { id, ...data } = input;

      return await ctx.db.$transaction(async tx => {
        // Check if user exists
        const user = await tx.user.findUnique({
          where: { id },
          select: { id: true, email: true },
        });

        if (!user) {
          throw new BusinessError(
            ErrorCodes.USER_NOT_FOUND,
            'User not found',
            404
          );
        }

        // Check authorization (user can only update their own profile)
        if (ctx.user?.id !== id) {
          throw new BusinessError(
            ErrorCodes.CANNOT_UPDATE_OTHER_USER,
            'You can only update your own profile',
            403
          );
        }

        // Sanitize input to only allow certain fields to be updated
        const sanitizedInput: { name?: string; email?: string } = {};

        if (data.name !== undefined && data.name !== null) {
          sanitizedInput.name = data.name;
        }

        if (data.email !== undefined && data.email !== null) {
          sanitizedInput.email = data.email;
        }

        // Check if email is being changed and if it's already taken
        if (sanitizedInput.email && sanitizedInput.email !== user.email) {
          const existingUser = await tx.user.findUnique({
            where: { email: sanitizedInput.email },
            select: { id: true },
          });
          if (existingUser) {
            throw new BusinessError(
              ErrorCodes.EMAIL_ALREADY_TAKEN,
              'Email is already taken',
              409
            );
          }
        }

        return await tx.user.update({
          where: { id },
          data: sanitizedInput,
          select: userWithCountsSelect,
        });
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  });
