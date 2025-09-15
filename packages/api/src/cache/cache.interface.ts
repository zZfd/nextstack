export interface CacheConfig {
  ttl?: number; // Time to live in seconds
  namespace?: string;
}

export interface CacheStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(pattern?: string): Promise<void>;
  has(key: string): Promise<boolean>;
}

export interface CacheOptions extends CacheConfig {
  key: string | string[];
  ttl?: number;
  refresh?: boolean;
}