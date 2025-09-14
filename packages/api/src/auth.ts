import { createAuth } from '@nextstack/auth';
import { toNodeHandler } from 'better-auth/node';

// Factory function to create auth instance with provided config
export function createAuthFromConfig(config: {
  secret: string;
  baseURL: string;
  corsOrigins?: string[];
  isDevelopment?: boolean;
}) {
  return createAuth({
    secret: config.secret,
    baseURL: config.baseURL,
    corsOrigins: config.corsOrigins,
    isDevelopment: config.isDevelopment,
  });
}

// Factory function to create Better Auth HTTP handler for Express
export function createAuthHandler(auth: Auth) {
  return toNodeHandler(auth.handler);
}

// Export auth type for internal use
export type Auth = ReturnType<typeof createAuthFromConfig>;
