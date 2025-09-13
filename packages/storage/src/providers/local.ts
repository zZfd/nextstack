import { promises as fs } from 'fs';
import { createReadStream, createWriteStream, existsSync } from 'fs';
import { join, dirname } from 'path';

import type {
  StorageConfig,
  UploadRequest,
  UploadResponse,
  PresignedUrlOptions,
  ListObjectsOptions,
  ListObjectsResponse,
  StorageObject,
} from '../types';

import { BaseStorageProvider } from './base';


export class LocalStorageProvider extends BaseStorageProvider {
  private basePath: string;

  constructor(config: StorageConfig) {
    super(config);
    
    // Use bucket name as the local directory
    this.basePath = join(process.cwd(), 'storage', config.bucket);
    this.ensureDirectory(this.basePath);
  }

  private async ensureDirectory(path: string): Promise<void> {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  private getFilePath(key: string): string {
    this.validateKey(key);
    const filePath = join(this.basePath, key);
    
    // Ensure the file is within our base path (security check)
    const resolvedPath = require('path').resolve(filePath);
    const resolvedBase = require('path').resolve(this.basePath);
    
    if (!resolvedPath.startsWith(resolvedBase)) {
      throw new Error('Invalid file path - outside storage directory');
    }
    
    return filePath;
  }

  async getPresignedUploadUrl(
    request: UploadRequest,
    _options?: PresignedUrlOptions
  ): Promise<UploadResponse> {
    this.validateKey(request.key);

    // For local storage, we return a fake presigned URL
    // In a real implementation, you might want to create a temporary token
    const uploadUrl = `file://localhost${this.getFilePath(request.key)}`;

    return {
      uploadUrl,
      key: request.key,
    };
  }

  async uploadBuffer(key: string, buffer: Buffer, _mimeType?: string): Promise<void> {
    const filePath = this.getFilePath(key);
    
    // Ensure directory exists
    await this.ensureDirectory(dirname(filePath));
    
    await fs.writeFile(filePath, buffer);
  }

  async uploadFile(key: string, sourceFilePath: string, _mimeType?: string): Promise<void> {
    const destPath = this.getFilePath(key);
    
    // Ensure directory exists
    await this.ensureDirectory(dirname(destPath));
    
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(sourceFilePath);
      const writeStream = createWriteStream(destPath);
      
      readStream.pipe(writeStream);
      
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      readStream.on('error', reject);
    });
  }

  async getPresignedDownloadUrl(key: string, _options?: PresignedUrlOptions): Promise<string> {
    const filePath = this.getFilePath(key);
    
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${key}`);
    }
    
    // For local storage, return file:// URL
    return `file://${filePath}`;
  }

  async downloadBuffer(key: string): Promise<Buffer> {
    const filePath = this.getFilePath(key);
    
    try {
      return await fs.readFile(filePath);
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        throw new Error(`File not found: ${key}`);
      }
      throw error;
    }
  }

  async downloadFile(key: string, destination: string): Promise<void> {
    const sourcePath = this.getFilePath(key);
    
    // Ensure destination directory exists
    await this.ensureDirectory(dirname(destination));
    
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(sourcePath);
      const writeStream = createWriteStream(destination);
      
      readStream.pipe(writeStream);
      
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      readStream.on('error', reject);
    });
  }

  async deleteObject(key: string): Promise<void> {
    const filePath = this.getFilePath(key);
    
    try {
      await fs.unlink(filePath);
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  async deleteObjects(keys: string[]): Promise<void> {
    await Promise.all(keys.map(key => this.deleteObject(key)));
  }

  async objectExists(key: string): Promise<boolean> {
    const filePath = this.getFilePath(key);
    
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async listObjects(options?: ListObjectsOptions): Promise<ListObjectsResponse> {
    const prefix = options?.prefix ?? '';
    const maxKeys = options?.maxKeys ?? 1000;
    
    const objects: StorageObject[] = [];
    
    async function scanDirectory(dir: string, currentPrefix: string): Promise<void> {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          const relativePath = join(currentPrefix, entry.name);
          
          if (entry.isDirectory()) {
            await scanDirectory(fullPath, relativePath);
          } else if (entry.isFile()) {
            if (!prefix || relativePath.startsWith(prefix)) {
              const stats = await fs.stat(fullPath);
              objects.push({
                key: relativePath.replace(/\\/g, '/'), // Normalize path separators
                size: stats.size,
                lastModified: stats.mtime,
                etag: `"${stats.mtime.getTime()}"`, // Simple etag based on mtime
              });
              
              if (objects.length >= maxKeys) {
                return;
              }
            }
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
          throw error;
        }
      }
    }
    
    await scanDirectory(this.basePath, '');
    
    return {
      objects: objects.slice(0, maxKeys),
      isTruncated: objects.length > maxKeys,
      nextContinuationToken: objects.length > maxKeys ? 
        objects[maxKeys - 1]?.key : undefined,
    };
  }

  getObjectUrl(key: string): string {
    const filePath = this.getFilePath(key);
    return `file://${filePath}`;
  }

  async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
    const sourcePath = this.getFilePath(sourceKey);
    const destPath = this.getFilePath(destinationKey);
    
    // Ensure destination directory exists
    await this.ensureDirectory(dirname(destPath));
    
    await fs.copyFile(sourcePath, destPath);
  }
}