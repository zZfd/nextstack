import { createAuth, AuthConfig } from '@nextstack/auth';

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

// Export auth type for internal use
export type Auth = ReturnType<typeof createAuthFromConfig>;