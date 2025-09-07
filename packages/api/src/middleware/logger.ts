import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  meta?: Record<string, unknown>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogEntry['level'], message: string, meta?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    };
  }

  private output(entry: LogEntry) {
    if (this.isDevelopment) {
      const color = {
        info: '\x1b[36m',
        warn: '\x1b[33m',
        error: '\x1b[31m',
        debug: '\x1b[35m',
      }[entry.level];
      
      console.log(
        `${color}[${entry.timestamp}] ${entry.level.toUpperCase()}\x1b[0m: ${entry.message}`,
        entry.meta ? entry.meta : ''
      );
    } else {
      console.log(JSON.stringify(entry));
    }
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.output(this.formatMessage('info', message, meta));
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.output(this.formatMessage('warn', message, meta));
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.output(this.formatMessage('error', message, meta));
  }

  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.LOG_LEVEL === 'debug' || this.isDevelopment) {
      this.output(this.formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger();

// tRPC logging middleware
export function createLoggingContext({ req, res }: CreateExpressContextOptions): {
  req: CreateExpressContextOptions['req'];
  res: CreateExpressContextOptions['res'];
  logger: Logger;
  startTime: number;
  requestId: string;
} {
  const start = Date.now();
  
  return {
    req,
    res,
    logger,
    startTime: start,
    requestId: Math.random().toString(36).substr(2, 9),
  };
}

export type Context = inferAsyncReturnType<typeof createLoggingContext>;