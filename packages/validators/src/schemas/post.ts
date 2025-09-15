import { z } from 'zod';

// Basic post validation schemas
export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  content: z.string().optional().nullable(),
  authorId: z.string().cuid('Invalid author ID'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
});

export const UpdatePostSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
    content: z.string().nullable(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  })
  .partial();

// Query schemas
export const GetPostByIdSchema = z.object({
  id: z.string().cuid('Invalid post ID'),
});

export const GetPostsSchema = z.object({
  cursor: z.string().cuid().optional(),
  limit: z.number().min(1).max(100).default(10),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  authorId: z.string().cuid().optional(),
});

// Type exports
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;
export type GetPostByIdInput = z.infer<typeof GetPostByIdSchema>;
export type GetPostsInput = z.infer<typeof GetPostsSchema>;
