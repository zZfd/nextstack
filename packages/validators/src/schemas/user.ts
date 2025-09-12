import { z } from 'zod';

import { UserSchema } from '../generated';

// Basic user validation schemas
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional().nullable(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').nullable(),
}).partial();

// Query schemas
export const GetUserByIdSchema = z.object({
  id: z.string().cuid('Invalid user ID'),
});

export const GetUserByEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const GetUsersSchema = z.object({
  cursor: z.string().cuid().optional(),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

// Type exports
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type GetUserByIdInput = z.infer<typeof GetUserByIdSchema>;
export type GetUserByEmailInput = z.infer<typeof GetUserByEmailSchema>;
export type GetUsersInput = z.infer<typeof GetUsersSchema>;
export type User = z.infer<typeof UserSchema>;