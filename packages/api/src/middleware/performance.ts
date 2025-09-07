import { TRPCError } from '@trpc/server';
import { logger } from './logger';

export interface PerformanceMetrics {
  duration: number;
  memory: NodeJS.MemoryUsage;
  timestamp: string;
}

export function createPerformanceMonitor() {
  const metrics: PerformanceMetrics[] = [];
  
  return {
    track: (operation: string, startTime: number) => {
      const duration = Date.now() - startTime;
      const memory = process.memoryUsage();
      
      const metric: PerformanceMetrics = {
        duration,
        memory,
        timestamp: new Date().toISOString(),
      };
      
      metrics.push(metric);
      
      // Log slow operations
      if (duration > 1000) {
        logger.warn(`Slow operation detected: ${operation}`, {
          duration,
          memoryUsed: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`,
        });
      }
      
      // Cleanup old metrics (keep last 1000)
      if (metrics.length > 1000) {
        metrics.splice(0, metrics.length - 1000);
      }
      
      return metric;
    },
    
    getMetrics: () => metrics.slice(),
    
    getAverageResponseTime: (lastN = 100) => {
      const recent = metrics.slice(-lastN);
      if (recent.length === 0) return 0;
      
      const total = recent.reduce((sum, metric) => sum + metric.duration, 0);
      return Math.round(total / recent.length);
    },
    
    getMemoryPressure: () => {
      const memory = process.memoryUsage();
      const heapUsedMB = memory.heapUsed / 1024 / 1024;
      const heapTotalMB = memory.heapTotal / 1024 / 1024;
      
      return {
        heapUsedMB: Math.round(heapUsedMB),
        heapTotalMB: Math.round(heapTotalMB),
        usage: Math.round((heapUsedMB / heapTotalMB) * 100),
        external: Math.round(memory.external / 1024 / 1024),
      };
    },
  };
}

export const performanceMonitor = createPerformanceMonitor();

// Memory pressure check middleware
export function checkMemoryPressure() {
  const pressure = performanceMonitor.getMemoryPressure();
  
  // If memory usage is too high, throw an error
  if (pressure.usage > 90) {
    logger.error('High memory pressure detected', pressure);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Server under high load, please try again later',
    });
  }
  
  // Warn if memory usage is getting high
  if (pressure.usage > 75) {
    logger.warn('Elevated memory pressure', pressure);
  }
  
  return pressure;
}

// Request timeout middleware
export function withTimeout<T>(
  promise: Promise<T>, 
  timeoutMs: number = 30000
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new TRPCError({
          code: 'TIMEOUT',
          message: `Operation timed out after ${timeoutMs}ms`,
        }));
      }, timeoutMs);
    }),
  ]);
}