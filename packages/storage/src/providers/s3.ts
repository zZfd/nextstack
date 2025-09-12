import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createReadStream, createWriteStream } from 'fs';
import { BaseStorageProvider } from './base';
import type {
  StorageConfig,
  UploadRequest,
  UploadResponse,
  PresignedUrlOptions,
  ListObjectsOptions,
  ListObjectsResponse,
  StorageObject,
} from '../types';

export class S3StorageProvider extends BaseStorageProvider {
  private client: S3Client;

  constructor(config: StorageConfig) {
    super(config);
    
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: config.accessKeyId && config.secretAccessKey ? {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      } : undefined,
      forcePathStyle: config.provider === 'minio', // MinIO compatibility
    });
  }

  async getPresignedUploadUrl(
    request: UploadRequest,
    options?: PresignedUrlOptions
  ): Promise<UploadResponse> {
    this.validateKey(request.key);

    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: request.key,
      ContentType: request.mimeType,
      ContentLength: request.size,
    });

    const uploadUrl = await getSignedUrl(this.client, command, {
      expiresIn: options?.expiresIn ?? this.getDefaultExpiresIn(),
    });

    return {
      uploadUrl,
      key: request.key,
    };
  }

  async uploadBuffer(key: string, buffer: Buffer, mimeType?: string): Promise<void> {
    this.validateKey(key);

    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    });

    await this.client.send(command);
  }

  async uploadFile(key: string, filePath: string, mimeType?: string): Promise<void> {
    this.validateKey(key);

    const fileStream = createReadStream(filePath);
    
    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
      Body: fileStream,
      ContentType: mimeType,
    });

    await this.client.send(command);
  }

  async getPresignedDownloadUrl(key: string, options?: PresignedUrlOptions): Promise<string> {
    this.validateKey(key);

    const command = new GetObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
    });

    return getSignedUrl(this.client, command, {
      expiresIn: options?.expiresIn ?? this.getDefaultExpiresIn(),
    });
  }

  async downloadBuffer(key: string): Promise<Buffer> {
    this.validateKey(key);

    const command = new GetObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
    });

    const response = await this.client.send(command);
    
    if (!response.Body) {
      throw new Error(`Object not found: ${key}`);
    }

    const chunks: Uint8Array[] = [];
    const stream = response.Body as any;
    
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    return Buffer.concat(chunks);
  }

  async downloadFile(key: string, destination: string): Promise<void> {
    const buffer = await this.downloadBuffer(key);
    const writeStream = createWriteStream(destination);
    
    return new Promise((resolve, reject) => {
      writeStream.write(buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          writeStream.close();
          resolve();
        }
      });
    });
  }

  async deleteObject(key: string): Promise<void> {
    this.validateKey(key);

    const command = new DeleteObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
    });

    await this.client.send(command);
  }

  async deleteObjects(keys: string[]): Promise<void> {
    if (keys.length === 0) return;

    keys.forEach(key => this.validateKey(key));

    const command = new DeleteObjectsCommand({
      Bucket: this.config.bucket,
      Delete: {
        Objects: keys.map(key => ({ Key: key })),
      },
    });

    await this.client.send(command);
  }

  async objectExists(key: string): Promise<boolean> {
    this.validateKey(key);

    try {
      const command = new HeadObjectCommand({
        Bucket: this.config.bucket,
        Key: key,
      });

      await this.client.send(command);
      return true;
    } catch (error: any) {
      if (error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  async listObjects(options?: ListObjectsOptions): Promise<ListObjectsResponse> {
    const command = new ListObjectsV2Command({
      Bucket: this.config.bucket,
      Prefix: options?.prefix,
      MaxKeys: options?.maxKeys ?? 1000,
      ContinuationToken: options?.continuationToken,
    });

    const response = await this.client.send(command);

    const objects: StorageObject[] = (response.Contents ?? []).map(obj => ({
      key: obj.Key!,
      size: obj.Size!,
      lastModified: obj.LastModified!,
      etag: obj.ETag!,
    }));

    return {
      objects,
      isTruncated: response.IsTruncated ?? false,
      nextContinuationToken: response.NextContinuationToken,
    };
  }

  getObjectUrl(key: string): string {
    this.validateKey(key);

    if (this.config.publicUrl) {
      return `${this.config.publicUrl}/${this.config.bucket}/${key}`;
    }

    const endpoint = this.config.endpoint || `https://s3.${this.config.region}.amazonaws.com`;
    return `${endpoint}/${this.config.bucket}/${key}`;
  }

  async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
    this.validateKey(sourceKey);
    this.validateKey(destinationKey);

    const command = new CopyObjectCommand({
      Bucket: this.config.bucket,
      Key: destinationKey,
      CopySource: `${this.config.bucket}/${sourceKey}`,
    });

    await this.client.send(command);
  }
}