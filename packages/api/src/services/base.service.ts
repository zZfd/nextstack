import type { PrismaClient } from '@nextstack/database';

import type { PrismaTransaction } from '../repositories/base.repository';

export interface ServiceContext {
  db: PrismaClient | PrismaTransaction;
  userId?: string;
  sessionId?: string;
}

export abstract class BaseService {
  protected readonly db: PrismaClient | PrismaTransaction;
  protected readonly userId?: string;
  protected readonly sessionId?: string;

  constructor(context: ServiceContext) {
    this.db = context.db;
    this.userId = context.userId;
    this.sessionId = context.sessionId;
  }

  protected async withTransaction<T>(
    fn: (tx: PrismaTransaction) => Promise<T>
  ): Promise<T> {
    if ('$transaction' in this.db) {
      return await (this.db as PrismaClient).$transaction(fn);
    }
    // Already in a transaction
    return await fn(this.db as PrismaTransaction);
  }

  protected checkAuthentication(): void {
    if (!this.userId) {
      throw new Error('User must be authenticated');
    }
  }

  protected checkAuthorization(resourceOwnerId: string): void {
    this.checkAuthentication();
    if (this.userId !== resourceOwnerId) {
      throw new Error('User is not authorized to access this resource');
    }
  }

  protected async validateExists<T>(
    entity: T | null,
    entityName: string
  ): Promise<T> {
    if (!entity) {
      throw new Error(`${entityName} not found`);
    }
    return entity;
  }

  protected sanitizeInput<T extends Record<string, unknown>>(
    input: T,
    allowedFields: string[]
  ): Partial<T> {
    const sanitized: Partial<T> = {};
    for (const field of allowedFields) {
      if (field in input) {
        sanitized[field as keyof T] = input[field];
      }
    }
    return sanitized;
  }
}