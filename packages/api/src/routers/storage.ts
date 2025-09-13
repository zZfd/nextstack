import { createStorageProviderFromEnv } from '@nextstack/storage';
import {
  RequestUploadSchema,
  ConfirmUploadSchema,
  GetDownloadUrlSchema,
  GetFileByIdSchema,
  DeleteFileSchema,
  GetFilesSchema,
  UpdateFileMetadataSchema,
  DeleteMultipleFilesSchema,
} from '@nextstack/validators';
import { TRPCError } from '@trpc/server';

import { publicProcedure } from '../procedures/public';
import { router } from '../trpc';

// Initialize storage provider
const storageProvider = createStorageProviderFromEnv();

export const storageRouter = router({
  // Request upload URL - creates file record and returns presigned URL
  requestUpload: publicProcedure
    .input(RequestUploadSchema)
    .mutation(async ({ ctx, input }) => {
      const { filename, mimeType, size } = input;

      // TODO: Add user authentication
      // For now, using a dummy user ID
      const userId = 'dummy-user-id';

      // Generate unique storage key
      const timestamp = Date.now();
      const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storageKey = `${userId}/${timestamp}-${sanitizedFilename}`;

      try {
        // Create file record in database
        const file = await ctx.db.file.create({
          data: {
            userId,
            filename: sanitizedFilename,
            originalName: filename,
            mimeType,
            size: BigInt(size),
            storageKey,
            status: 'PENDING',
          },
        });

        // Generate presigned upload URL
        const uploadResponse = await storageProvider.getPresignedUploadUrl({
          key: storageKey,
          filename: sanitizedFilename,
          mimeType,
          size,
        });

        return {
          fileId: file.id,
          uploadUrl: uploadResponse.uploadUrl,
          storageKey: uploadResponse.key,
          fields: uploadResponse.fields,
        };
      } catch (error) {
        console.error('Failed to request upload:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate upload URL',
        });
      }
    }),

  // Confirm upload - marks file as uploaded
  confirmUpload: publicProcedure
    .input(ConfirmUploadSchema)
    .mutation(async ({ ctx, input }) => {
      const { fileId } = input;

      try {
        const file = await ctx.db.file.findUnique({
          where: { id: fileId },
        });

        if (!file) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'File not found',
          });
        }

        // Check if file exists in storage
        const exists = await storageProvider.objectExists(file.storageKey);

        if (!exists) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'File not found in storage',
          });
        }

        // Update file status and generate public URL
        const publicUrl = storageProvider.getObjectUrl(file.storageKey);

        const updatedFile = await ctx.db.file.update({
          where: { id: fileId },
          data: {
            status: 'READY',
            url: publicUrl,
            updatedAt: new Date(),
          },
        });

        return updatedFile;
      } catch (error) {
        console.error('Failed to confirm upload:', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to confirm upload',
        });
      }
    }),

  // Get download URL - generates presigned download URL
  getDownloadUrl: publicProcedure
    .input(GetDownloadUrlSchema)
    .query(async ({ ctx, input }) => {
      const { fileId, expiresIn } = input;

      try {
        const file = await ctx.db.file.findUnique({
          where: { id: fileId },
        });

        if (!file) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'File not found',
          });
        }

        if (file.status === 'DELETED') {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'File has been deleted',
          });
        }

        // Generate presigned download URL
        const downloadUrl = await storageProvider.getPresignedDownloadUrl(
          file.storageKey,
          { expiresIn }
        );

        return {
          downloadUrl,
          filename: file.originalName,
          mimeType: file.mimeType,
          size: file.size.toString(),
        };
      } catch (error) {
        console.error('Failed to get download URL:', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate download URL',
        });
      }
    }),

  // Get file by ID
  getById: publicProcedure
    .input(GetFileByIdSchema)
    .query(async ({ ctx, input }) => {
      const { fileId } = input;

      const file = await ctx.db.file.findUnique({
        where: { id: fileId },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      if (!file) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'File not found',
        });
      }

      return {
        ...file,
        size: file.size.toString(), // Convert BigInt to string for JSON serialization
      };
    }),

  // List files with pagination
  list: publicProcedure.input(GetFilesSchema).query(async ({ ctx, input }) => {
    const { cursor, limit, status, mimeTypePrefix, search } = input;

    // TODO: Add user filtering based on authentication
    const whereClause: Record<string, unknown> = {
      deletedAt: null, // Only show non-deleted files
    };

    if (status) {
      whereClause.status = status;
    }

    if (mimeTypePrefix) {
      whereClause.mimeType = {
        startsWith: mimeTypePrefix,
      };
    }

    if (search) {
      whereClause.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const files = await ctx.db.file.findMany({
      where: whereClause,
      take: limit + 1, // Take one extra to check if there are more
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const hasMore = files.length > limit;
    const items = hasMore ? files.slice(0, -1) : files;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    return {
      items: items.map(file => ({
        ...file,
        size: file.size.toString(), // Convert BigInt to string
      })),
      nextCursor,
      hasMore,
    };
  }),

  // Delete file (soft delete)
  delete: publicProcedure
    .input(DeleteFileSchema)
    .mutation(async ({ ctx, input }) => {
      const { fileId } = input;

      try {
        const file = await ctx.db.file.findUnique({
          where: { id: fileId },
        });

        if (!file) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'File not found',
          });
        }

        // Soft delete in database
        await ctx.db.file.update({
          where: { id: fileId },
          data: {
            status: 'DELETED',
            deletedAt: new Date(),
          },
        });

        // Delete from storage (async, don't wait)
        storageProvider.deleteObject(file.storageKey).catch(error => {
          console.error('Failed to delete file from storage:', error);
        });

        return { success: true };
      } catch (error) {
        console.error('Failed to delete file:', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete file',
        });
      }
    }),

  // Update file metadata
  updateMetadata: publicProcedure
    .input(UpdateFileMetadataSchema)
    .mutation(async ({ ctx, input }) => {
      const { fileId, metadata } = input;

      try {
        const file = await ctx.db.file.findUnique({
          where: { id: fileId },
        });

        if (!file) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'File not found',
          });
        }

        const updatedFile = await ctx.db.file.update({
          where: { id: fileId },
          data: {
            metadata,
            updatedAt: new Date(),
          },
        });

        return {
          ...updatedFile,
          size: updatedFile.size.toString(),
        };
      } catch (error) {
        console.error('Failed to update file metadata:', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update file metadata',
        });
      }
    }),

  // Bulk delete files
  deleteMultiple: publicProcedure
    .input(DeleteMultipleFilesSchema)
    .mutation(async ({ ctx, input }) => {
      const { fileIds } = input;

      try {
        // Get all files to delete
        const files = await ctx.db.file.findMany({
          where: {
            id: { in: fileIds },
            deletedAt: null,
          },
        });

        if (files.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No files found to delete',
          });
        }

        // Soft delete in database
        await ctx.db.file.updateMany({
          where: { id: { in: files.map(f => f.id) } },
          data: {
            status: 'DELETED',
            deletedAt: new Date(),
          },
        });

        // Delete from storage (async, don't wait)
        const storageKeys = files.map(f => f.storageKey);
        storageProvider.deleteObjects(storageKeys).catch(error => {
          console.error('Failed to delete files from storage:', error);
        });

        return {
          success: true,
          deletedCount: files.length,
        };
      } catch (error) {
        console.error('Failed to delete multiple files:', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete files',
        });
      }
    }),
});
