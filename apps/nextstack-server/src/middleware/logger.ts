import type { Request } from 'express';
import morgan from 'morgan';

// Custom token for request ID
morgan.token('request-id', (req: Request) => req.requestId || 'unknown');

// Custom token for user ID if available
morgan.token('user-id', (req: Request) => {
  const userId = (req as Request & { user?: { id: string } }).user?.id;
  return userId || 'anonymous';
});

// Development format with colors
const developmentFormat =
  ':method :url :status :res[content-length] - :response-time ms - :request-id';

// Production format in JSON
const productionFormat: morgan.FormatFn = (tokens, req, res) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    contentLength: tokens.res(req, res, 'content-length'),
    responseTime: `${tokens['response-time'](req, res)}ms`,
    requestId: tokens['request-id'](req, res),
    userId: tokens['user-id'](req, res),
    userAgent: tokens['user-agent'](req, res),
    remoteAddr: tokens['remote-addr'](req, res),
    referer: tokens.referrer(req, res),
  });
};

// Create logger middleware based on environment
export const createRequestLogger = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    return morgan(productionFormat, {
      stream: {
        write: (message: string) => {
          // In production, use console.log for structured logging
          console.log(message.trim());
        },
      },
    });
  } else {
    return morgan(developmentFormat);
  }
};

// Skip logging for health checks and other monitoring endpoints
export const shouldSkipLogging = (req: Request) => {
  return req.url === '/health' || req.url === '/metrics';
};

export const requestLogger = createRequestLogger();
