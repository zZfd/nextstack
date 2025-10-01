import { GetUserByIdSchema } from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../../errors/business.error';
import { protectedProcedure } from '../../procedures/protected';
import { userMinimalSelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const deleteUser = protectedProcedure
  .input(GetUserByIdSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.$transaction(async tx => {
        // Check if user exists
        const user = await tx.user.findUnique({
          where: { id: input.id },
          select: { id: true },
        });

        if (!user) {
          throw new BusinessError(
            ErrorCodes.USER_NOT_FOUND,
            'User not found',
            404
          );
        }

        // Check authorization (user can only delete their own account)
        if (ctx.user?.id !== input.id) {
          throw new BusinessError(
            ErrorCodes.CANNOT_DELETE_OTHER_USER,
            'You can only delete your own account',
            403
          );
        }

        // Delete all user's posts first (if not using cascade delete)
        await tx.post.deleteMany({
          where: { authorId: input.id },
        });

        // Delete the user and return minimal info
        return await tx.user.delete({
          where: { id: input.id },
          select: userMinimalSelect,
        });
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  });
