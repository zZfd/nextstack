import type { CacheStore } from './cache.interface';

interface CacheEntry<T> {
  value: T;
  expiresAt?: number;
}

export class MemoryCache implements CacheStore {
  private cache = new Map<string, CacheEntry<unknown>>();
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      await this.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    // Clear existing timer if any
    this.clearTimer(key);

    const entry: CacheEntry<T> = { value };

    if (ttl && ttl > 0) {
      entry.expiresAt = Date.now() + ttl * 1000;

      // Set auto-delete timer
      const timer = setTimeout(() => {
        this.delete(key);
      }, ttl * 1000);

      this.timers.set(key, timer);
    }

    this.cache.set(key, entry);
  }

  async delete(key: string): Promise<void> {
    this.clearTimer(key);
    this.cache.delete(key);
  }

  async clear(pattern?: string): Promise<void> {
    if (pattern) {
      const regex = new RegExp(pattern);
      const keysToDelete: string[] = [];

      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          keysToDelete.push(key);
        }
      }

      for (const key of keysToDelete) {
        await this.delete(key);
      }
    } else {
      // Clear all timers
      for (const timer of this.timers.values()) {
        clearTimeout(timer);
      }

      this.cache.clear();
      this.timers.clear();
    }
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  private clearTimer(key: string): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }

  // Additional utility methods
  async keys(pattern?: string): Promise<string[]> {
    const keys: string[] = [];

    if (pattern) {
      const regex = new RegExp(pattern);
      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          keys.push(key);
        }
      }
    } else {
      keys.push(...this.cache.keys());
    }

    return keys;
  }

  async size(): Promise<number> {
    return this.cache.size;
  }
}