import type { CacheStore, CacheOptions } from './cache.interface';
import { MemoryCache } from './memory.cache';

export class CacheManager {
  private store: CacheStore;
  private defaultTTL: number;
  private namespace: string;

  constructor(
    store?: CacheStore,
    defaultTTL = 300, // 5 minutes default
    namespace = 'api'
  ) {
    this.store = store ?? new MemoryCache();
    this.defaultTTL = defaultTTL;
    this.namespace = namespace;
  }

  private buildKey(key: string | string[]): string {
    const keyParts = Array.isArray(key) ? key : [key];
    return `${this.namespace}:${keyParts.join(':')}`;
  }

  async get<T>(key: string | string[]): Promise<T | null> {
    const cacheKey = this.buildKey(key);
    return await this.store.get<T>(cacheKey);
  }

  async set<T>(key: string | string[], value: T, ttl?: number): Promise<void> {
    const cacheKey = this.buildKey(key);
    const finalTTL = ttl ?? this.defaultTTL;
    await this.store.set(cacheKey, value, finalTTL);
  }

  async delete(key: string | string[]): Promise<void> {
    const cacheKey = this.buildKey(key);
    await this.store.delete(cacheKey);
  }

  async clear(pattern?: string): Promise<void> {
    const namespacePattern = pattern
      ? `${this.namespace}:${pattern}`
      : `${this.namespace}:.*`;
    await this.store.clear(namespacePattern);
  }

  async has(key: string | string[]): Promise<boolean> {
    const cacheKey = this.buildKey(key);
    return await this.store.has(cacheKey);
  }

  // Cache wrapper for async functions
  async wrap<T>(
    key: string | string[],
    fn: () => Promise<T>,
    options?: Partial<CacheOptions>
  ): Promise<T> {
    const cacheKey = this.buildKey(key);

    // Check if we should refresh the cache
    if (!options?.refresh) {
      const cached = await this.store.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    // Execute the function and cache the result
    const result = await fn();
    const ttl = options?.ttl ?? this.defaultTTL;
    await this.store.set(cacheKey, result, ttl);

    return result;
  }

  // Invalidate related cache entries
  async invalidate(patterns: string[]): Promise<void> {
    for (const pattern of patterns) {
      await this.clear(pattern);
    }
  }

  // Create a scoped cache manager with a sub-namespace
  scope(subNamespace: string): CacheManager {
    return new CacheManager(
      this.store,
      this.defaultTTL,
      `${this.namespace}:${subNamespace}`
    );
  }
}

// Singleton instance for the application
let cacheManager: CacheManager | null = null;

export function getCacheManager(): CacheManager {
  if (!cacheManager) {
    cacheManager = new CacheManager();
  }
  return cacheManager;
}

export function initCacheManager(
  store?: CacheStore,
  defaultTTL?: number,
  namespace?: string
): CacheManager {
  cacheManager = new CacheManager(store, defaultTTL, namespace);
  return cacheManager;
}