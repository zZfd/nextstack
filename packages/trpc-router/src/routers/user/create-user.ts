import { CreateUserSchema } from '@nextstack/validators';

import { BusinessError, ErrorCodes } from '../../errors/business.error';
import { publicProcedure } from '../../procedures/public';
import { userWithCountsSelect } from '../../services';
import { handleServiceError } from '../../utils/error-handler';

export const createUser = publicProcedure
  .input(CreateUserSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.$transaction(async (tx) => {
        // Check if user with email already exists
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
          select: { id: true },
        });

        if (existingUser) {
          throw new BusinessError(
            ErrorCodes.USER_ALREADY_EXISTS,
            'User with this email already exists',
            409
          );
        }

        // Create user
        return await tx.user.create({
          data: {
            email: input.email,
            name: input.name,
          },
          select: userWithCountsSelect,
        });
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  });