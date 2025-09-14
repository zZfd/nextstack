import { z } from 'zod';

// File upload request validation
export const RequestUploadSchema = z.object({
  filename: z
    .string()
    .min(1, 'Filename is required')
    .max(255, 'Filename too long')
    .refine(
      filename => !filename.includes('..') && !filename.startsWith('/'),
      'Invalid filename format'
    ),
  mimeType: z
    .string()
    .min(1, 'MIME type is required')
    .refine(
      mimeType => /^[a-z]+\/[a-z0-9\-+.]+$/i.test(mimeType),
      'Invalid MIME type format'
    ),
  size: z
    .number()
    .positive('File size must be positive')
    .max(10 * 1024 * 1024, 'File size cannot exceed 10MB'), // 10MB limit
});

// File confirmation after upload
export const ConfirmUploadSchema = z.object({
  fileId: z.string().cuid('Invalid file ID'),
});

// File download request
export const GetDownloadUrlSchema = z.object({
  fileId: z.string().cuid('Invalid file ID'),
  expiresIn: z
    .number()
    .positive()
    .max(24 * 60 * 60) // Max 24 hours
    .default(3600) // Default 1 hour
    .optional(),
});

// File operation schemas
export const GetFileByIdSchema = z.object({
  fileId: z.string().cuid('Invalid file ID'),
});

export const DeleteFileSchema = z.object({
  fileId: z.string().cuid('Invalid file ID'),
});

// File listing with pagination
export const GetFilesSchema = z.object({
  cursor: z.string().cuid().optional(),
  limit: z.number().min(1).max(50).default(20),
  status: z
    .enum(['PENDING', 'UPLOADED', 'PROCESSING', 'READY', 'FAILED'])
    .optional(),
  mimeTypePrefix: z.string().optional(), // e.g., 'image/' for all images
  search: z.string().optional(), // Search in filename
});

// File metadata update
export const UpdateFileMetadataSchema = z.object({
  fileId: z.string().cuid('Invalid file ID'),
  metadata: z.record(z.any()).optional(),
});

// Bulk operations
export const DeleteMultipleFilesSchema = z.object({
  fileIds: z.array(z.string().cuid('Invalid file ID')).min(1).max(100),
});

// File status update (internal use)
export const UpdateFileStatusSchema = z.object({
  fileId: z.string().cuid('Invalid file ID'),
  status: z.enum([
    'PENDING',
    'UPLOADED',
    'PROCESSING',
    'READY',
    'FAILED',
    'DELETED',
  ]),
  url: z.string().url().optional(),
  metadata: z.record(z.any()).optional(),
});

// MIME type validation helpers
export const ImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
] as const;

export const DocumentMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
] as const;

export const VideoMimeTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
] as const;

export const AudioMimeTypes = [
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/webm',
] as const;

// Specialized validation schemas
export const UploadImageSchema = RequestUploadSchema.extend({
  mimeType: z.enum(ImageMimeTypes, {
    errorMap: () => ({ message: 'Only image files are allowed' }),
  }),
});

export const UploadDocumentSchema = RequestUploadSchema.extend({
  mimeType: z.enum(DocumentMimeTypes, {
    errorMap: () => ({ message: 'Only document files are allowed' }),
  }),
});

// Type exports
export type RequestUploadInput = z.infer<typeof RequestUploadSchema>;
export type ConfirmUploadInput = z.infer<typeof ConfirmUploadSchema>;
export type GetDownloadUrlInput = z.infer<typeof GetDownloadUrlSchema>;
export type GetFileByIdInput = z.infer<typeof GetFileByIdSchema>;
export type DeleteFileInput = z.infer<typeof DeleteFileSchema>;
export type GetFilesInput = z.infer<typeof GetFilesSchema>;
export type UpdateFileMetadataInput = z.infer<typeof UpdateFileMetadataSchema>;
export type DeleteMultipleFilesInput = z.infer<
  typeof DeleteMultipleFilesSchema
>;
export type UpdateFileStatusInput = z.infer<typeof UpdateFileStatusSchema>;
export type UploadImageInput = z.infer<typeof UploadImageSchema>;
export type UploadDocumentInput = z.infer<typeof UploadDocumentSchema>;
// Note: File type is exported from generated/index.ts to avoid conflicts
