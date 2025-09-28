import type { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Request ID middleware
 * Generates a unique ID for each request and adds it to:
 * - Request object (req.requestId)
 * - Response headers (X-Request-Id)
 */
export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if request ID already exists in headers (from load balancer, proxy, etc.)
  const existingRequestId =
    req.get('X-Request-Id') || req.get('X-Correlation-Id');

  // Use existing ID or generate a new one
  const requestId = existingRequestId || uuidv4();

  // Add to request object for use in other middleware/handlers
  req.requestId = requestId;

  // Add to response headers
  res.setHeader('X-Request-Id', requestId);

  next();
};
