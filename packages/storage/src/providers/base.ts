import type {
  StorageProvider,
  StorageConfig,
  UploadRequest,
  UploadResponse,
  PresignedUrlOptions,
  ListObjectsOptions,
  ListObjectsResponse,
} from '../types';

export abstract class BaseStorageProvider implements StorageProvider {
  protected config: StorageConfig;

  constructor(config: StorageConfig) {
    this.config = config;
  }

  // Upload operations
  abstract getPresignedUploadUrl(
    request: UploadRequest,
    options?: PresignedUrlOptions
  ): Promise<UploadResponse>;

  abstract uploadBuffer(
    key: string,
    buffer: Buffer,
    mimeType?: string
  ): Promise<void>;

  abstract uploadFile(
    key: string,
    filePath: string,
    mimeType?: string
  ): Promise<void>;

  // Download operations
  abstract getPresignedDownloadUrl(
    key: string,
    options?: PresignedUrlOptions
  ): Promise<string>;

  abstract downloadBuffer(key: string): Promise<Buffer>;

  abstract downloadFile(key: string, destination: string): Promise<void>;

  // Management operations
  abstract deleteObject(key: string): Promise<void>;

  abstract deleteObjects(keys: string[]): Promise<void>;

  abstract objectExists(key: string): Promise<boolean>;

  abstract listObjects(
    options?: ListObjectsOptions
  ): Promise<ListObjectsResponse>;

  // Utility operations
  abstract getObjectUrl(key: string): string;

  abstract copyObject(sourceKey: string, destinationKey: string): Promise<void>;

  // Helper methods
  protected validateKey(key: string): void {
    if (!key || key.trim() === '') {
      throw new Error('Storage key cannot be empty');
    }

    if (key.startsWith('/') || key.includes('..')) {
      throw new Error('Invalid storage key format');
    }
  }

  protected sanitizeKey(key: string): string {
    return key.replace(/[^a-zA-Z0-9._\-/]/g, '_').replace(/\/+/g, '/');
  }

  protected getDefaultExpiresIn(): number {
    return 3600; // 1 hour
  }
}
