import { db } from "@nextstack/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Security validation for production
const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error('BETTER_AUTH_SECRET environment variable is required');
}
if (process.env.NODE_ENV === 'production' &&
    (secret.includes('change-this') || secret.includes('generate-with'))) {
  throw new Error('Please set a secure BETTER_AUTH_SECRET in production');
}

const isDev = process.env.NODE_ENV !== 'production';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql"
  }),
  secret,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,    // 7 days
    updateAge: 60 * 60 * 24,         // Update every 1 day
    freshAge: 60 * 60,               // Fresh session within 1 hour
    cookieCache: {
      enabled: true,
      maxAge: isDev ? 5 * 60 : 15 * 60, // Dev: 5min, Prod: 15min
    },
  },
  cors: {
    origin: isDev
      ? ['http://localhost:3000', 'http://localhost:3001']
      : process.env.CORS_ORIGINS?.split(',') || [],
    credentials: true,
  },
  advanced: {
    generateId: false, // Use Prisma default ID generation
    useSecureCookies: !isDev, // Use secure cookies in production
  }
});

// Export the configured auth instance
// Types are defined in client.ts for consistency