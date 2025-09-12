export interface StorageConfig {
  provider: 'minio' | 's3' | 'local';
  bucket: string;
  region: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicUrl?: string;
}

export interface UploadRequest {
  key: string;
  filename: string;
  mimeType: string;
  size: number;
}

export interface UploadResponse {
  uploadUrl: string;
  key: string;
  fields?: Record<string, string>;
}

export interface PresignedUrlOptions {
  expiresIn?: number; // seconds, default 3600 (1 hour)
}

export interface StorageObject {
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
  mimeType?: string;
}

export interface ListObjectsOptions {
  prefix?: string;
  maxKeys?: number;
  continuationToken?: string;
}

export interface ListObjectsResponse {
  objects: StorageObject[];
  isTruncated: boolean;
  nextContinuationToken?: string;
}

export interface StorageProvider {
  // Upload operations
  getPresignedUploadUrl(request: UploadRequest, options?: PresignedUrlOptions): Promise<UploadResponse>;
  uploadBuffer(key: string, buffer: Buffer, mimeType?: string): Promise<void>;
  uploadFile(key: string, filePath: string, mimeType?: string): Promise<void>;

  // Download operations
  getPresignedDownloadUrl(key: string, options?: PresignedUrlOptions): Promise<string>;
  downloadBuffer(key: string): Promise<Buffer>;
  downloadFile(key: string, destination: string): Promise<void>;

  // Management operations
  deleteObject(key: string): Promise<void>;
  deleteObjects(keys: string[]): Promise<void>;
  objectExists(key: string): Promise<boolean>;
  listObjects(options?: ListObjectsOptions): Promise<ListObjectsResponse>;
  
  // Utility operations
  getObjectUrl(key: string): string;
  copyObject(sourceKey: string, destinationKey: string): Promise<void>;
}