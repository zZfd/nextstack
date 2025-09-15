import type { CacheOptions } from './cache.interface';
import { getCacheManager } from './cache.manager';

// Decorator for caching method results
export function Cacheable(options?: Partial<CacheOptions>) {
  return function (
    target: Record<string, unknown>,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: unknown, ...args: unknown[]) {
      const cache = getCacheManager();

      // Build cache key from class name, method name, and arguments
      const className = (target as { constructor: { name: string } }).constructor.name;
      const cacheKey = options?.key ?? [
        className,
        propertyName,
        JSON.stringify(args),
      ];

      // Try to get from cache
      if (!options?.refresh) {
        const cached = await cache.get(cacheKey);
        if (cached !== null) {
          return cached;
        }
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Cache the result
      await cache.set(cacheKey, result, options?.ttl);

      return result;
    };

    return descriptor;
  };
}

// Decorator for invalidating cache
export function CacheEvict(patterns: string[] | ((args: unknown[]) => string[])) {
  return function (
    target: Record<string, unknown>,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: unknown, ...args: unknown[]) {
      const cache = getCacheManager();

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Invalidate cache
      const patternsToEvict = typeof patterns === 'function'
        ? patterns(args)
        : patterns;

      await cache.invalidate(patternsToEvict);

      return result;
    };

    return descriptor;
  };
}

// Decorator for updating cache
export function CachePut(options?: Partial<CacheOptions>) {
  return function (
    target: Record<string, unknown>,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: unknown, ...args: unknown[]) {
      const cache = getCacheManager();

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Build cache key
      const className = (target as { constructor: { name: string } }).constructor.name;
      const cacheKey = options?.key ?? [
        className,
        propertyName,
        JSON.stringify(args),
      ];

      // Update cache with the result
      await cache.set(cacheKey, result, options?.ttl);

      return result;
    };

    return descriptor;
  };
}