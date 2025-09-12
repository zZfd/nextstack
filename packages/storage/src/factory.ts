import { S3StorageProvider } from './providers/s3';
import { LocalStorageProvider } from './providers/local';
import type { StorageConfig, StorageProvider } from './types';

export function createStorageProvider(config: StorageConfig): StorageProvider {
  switch (config.provider) {
    case 's3':
    case 'minio':
      return new S3StorageProvider(config);
    
    case 'local':
      return new LocalStorageProvider(config);
    
    default:
      throw new Error(`Unsupported storage provider: ${config.provider}`);
  }
}

export function createStorageProviderFromEnv(): StorageProvider {
  const config: StorageConfig = {
    provider: (process.env.STORAGE_PROVIDER as any) ?? 'local',
    bucket: process.env.STORAGE_BUCKET ?? 'nextstack-dev',
    region: process.env.STORAGE_REGION ?? 'us-east-1',
    endpoint: process.env.STORAGE_ENDPOINT,
    accessKeyId: process.env.STORAGE_ACCESS_KEY,
    secretAccessKey: process.env.STORAGE_SECRET_KEY,
    publicUrl: process.env.STORAGE_PUBLIC_URL,
  };

  return createStorageProvider(config);
}