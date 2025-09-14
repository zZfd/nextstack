import { db } from '@nextstack/database';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export interface AuthConfig {
  secret: string;
  baseURL: string;
  corsOrigins?: string[];
  isDevelopment?: boolean;
}

// Validate auth configuration
function validateAuthConfig(config: AuthConfig): void {
  if (!config.secret) {
    throw new Error(
      'Auth configuration error: secret is required.\n' +
      'Please provide BETTER_AUTH_SECRET in your environment variables.'
    );
  }

  if (!config.baseURL) {
    throw new Error(
      'Auth configuration error: baseURL is required.\n' +
      'Please provide BETTER_AUTH_URL in your environment variables.'
    );
  }

  // Production security checks
  const isProduction = !config.isDevelopment;
  if (isProduction && (
    config.secret.includes('change-this') ||
    config.secret.includes('generate-with') ||
    config.secret.length < 32
  )) {
    throw new Error(
      'Security Error: Please set a secure BETTER_AUTH_SECRET in production.\n' +
      'Generate one with: openssl rand -base64 32'
    );
  }
}

// Create auth configuration
export function createAuthConfig(config: AuthConfig): BetterAuthOptions {
  validateAuthConfig(config);

  const isDev = config.isDevelopment ?? false;

  return {
    database: prismaAdapter(db, {
      provider: 'postgresql',
    }),
    secret: config.secret,
    baseURL: config.baseURL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // Update every 1 day
      freshAge: 60 * 60, // Fresh session within 1 hour
      cookieCache: {
        enabled: true,
        maxAge: isDev ? 5 * 60 : 15 * 60, // Dev: 5min, Prod: 15min
      },
    },
    advanced: {
      generateId: false, // Use Prisma default ID generation
      useSecureCookies: !isDev, // Use secure cookies in production
    },
  };
}

// Factory function to create auth instance
export function createAuth(config: AuthConfig) {
  const authConfig = createAuthConfig(config);
  return betterAuth(authConfig);
}

// Export types
export type Auth = ReturnType<typeof createAuth>;
