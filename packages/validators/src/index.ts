// Main exports - explicit to avoid conflicts
export * from './schemas/post';
export * from './schemas/user';
export * from './types';
export * from './utils';

// File schemas - only custom ones, not the File type to avoid conflict
export {
  RequestUploadSchema,
  ConfirmUploadSchema,
  GetDownloadUrlSchema,
  GetFileByIdSchema,
  DeleteFileSchema,
  GetFilesSchema,
  UpdateFileMetadataSchema,
  DeleteMultipleFilesSchema,
  UpdateFileStatusSchema,
  ImageMimeTypes,
  DocumentMimeTypes,
  VideoMimeTypes,
  AudioMimeTypes,
  UploadImageSchema,
  UploadDocumentSchema,
} from './schemas/file';

// Type exports (all except File to avoid conflict with generated)
export type {
  RequestUploadInput,
  ConfirmUploadInput,
  GetDownloadUrlInput,
  GetFileByIdInput,
  DeleteFileInput,
  GetFilesInput,
  UpdateFileMetadataInput,
  DeleteMultipleFilesInput,
  UpdateFileStatusInput,
  UploadImageInput,
  UploadDocumentInput,
} from './schemas/file';

// Generated schemas (for advanced use cases) - explicit exports to avoid conflicts
export {
  // User schemas
  UserSchema,
  UserScalarFieldEnumSchema,
  UserIncludeSchema,
  UserArgsSchema,
  UserSelectSchema,
  UserWhereInputSchema,
  UserOrderByWithRelationInputSchema,
  UserWhereUniqueInputSchema,
  UserOrderByWithAggregationInputSchema,
  UserScalarWhereWithAggregatesInputSchema,
  UserCreateInputSchema,
  UserUncheckedCreateInputSchema,
  UserUpdateInputSchema,
  UserUncheckedUpdateInputSchema,
  UserCreateManyInputSchema,
  UserUpdateManyMutationInputSchema,
  UserUncheckedUpdateManyInputSchema,
  // Post schemas
  PostSchema,
  PostScalarFieldEnumSchema,
  PostIncludeSchema,
  PostArgsSchema,
  PostSelectSchema,
  PostWhereInputSchema,
  PostOrderByWithRelationInputSchema,
  PostWhereUniqueInputSchema,
  PostOrderByWithAggregationInputSchema,
  PostScalarWhereWithAggregatesInputSchema,
  PostCreateInputSchema,
  PostUncheckedCreateInputSchema,
  PostUpdateInputSchema,
  PostUncheckedUpdateInputSchema,
  PostCreateManyInputSchema,
  PostUpdateManyMutationInputSchema,
  PostUncheckedUpdateManyInputSchema,
  // Generated File schemas (with different name to avoid conflict)
  FileSchema as GeneratedFileSchema,
  FileScalarFieldEnumSchema,
  FileStatusSchema,
  FileIncludeSchema,
  FileArgsSchema,
  FileSelectSchema,
  FileWhereInputSchema,
  FileOrderByWithRelationInputSchema,
  FileWhereUniqueInputSchema,
  FileOrderByWithAggregationInputSchema,
  FileScalarWhereWithAggregatesInputSchema,
  FileCreateInputSchema,
  FileUncheckedCreateInputSchema,
  FileUpdateInputSchema,
  FileUncheckedUpdateInputSchema,
  FileCreateManyInputSchema,
  FileUpdateManyMutationInputSchema,
  FileUncheckedUpdateManyInputSchema,
} from './generated';