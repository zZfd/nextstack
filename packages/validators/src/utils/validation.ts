import { z } from 'zod';

/**
 * Utility function to validate data against a schema
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Utility function to safely validate data with error handling
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  return result;
}

/**
 * Common validation patterns
 */
export const commonSchemas = {
  id: z.string().cuid('Invalid ID format'),
  email: z.string().email('Invalid email address'),
  positiveNumber: z.number().positive('Must be a positive number'),
  nonEmptyString: z.string().min(1, 'Cannot be empty'),
  optionalString: z.string().optional().nullable(),
  pagination: z.object({
    cursor: z.string().cuid().optional(),
    limit: z.number().min(1).max(100).default(10),
  }),
};

/**
 * Create a paginated query schema
 */
export function createPaginationSchema<T extends z.ZodRawShape>(
  additionalFields?: T
) {
  const baseSchema = z.object({
    cursor: z.string().cuid().optional(),
    limit: z.number().min(1).max(100).default(10),
  });

  if (additionalFields) {
    return baseSchema.extend(additionalFields);
  }

  return baseSchema;
}

/**
 * Refinement for checking if a string is a valid CUID
 */
export const cuidRefinement = (value: string) => {
  const cuidRegex = /^c[a-z0-9]{24}$/;
  return cuidRegex.test(value);
};