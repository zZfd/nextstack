import type { Request, Response, NextFunction } from 'express';

/**
 * Request timeout middleware
 * Automatically times out requests that take too long to process
 */
export const createTimeoutMiddleware = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Set timeout for this request
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        console.warn(
          `Request timeout after ${timeoutMs}ms for ${req.method} ${req.url} [${req.requestId}]`
        );

        res.status(504).json({
          error: 'Request timeout',
          message: `Request exceeded ${timeoutMs}ms timeout`,
          requestId: req.requestId,
          timestamp: new Date().toISOString(),
        });
      }
    }, timeoutMs);

    // Clear timeout when response is finished
    res.on('finish', () => {
      clearTimeout(timeout);
    });

    // Clear timeout when response is closed (client disconnect)
    res.on('close', () => {
      clearTimeout(timeout);
    });

    next();
  };
};

// Default timeout middleware (30 seconds)
export const timeoutMiddleware = createTimeoutMiddleware(
  parseInt(process.env.REQUEST_TIMEOUT_MS || '30000', 10)
);
