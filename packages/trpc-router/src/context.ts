import type { Session, User } from '@nextstack/auth';
import { db } from '@nextstack/database';
import type * as trpcExpress from '@trpc/server/adapters/express';

import type { Auth } from './auth';

// Universal context options for both Express and fetch adapters
interface CreateContextOptions {
  req?: Request | trpcExpress.CreateExpressContextOptions['req'];
  res?: Response | trpcExpress.CreateExpressContextOptions['res'];
  auth: Auth;
  isDevelopment?: boolean;
}

export const createContext = async (opts: CreateContextOptions) => {
  // Extract session from request headers for auth
  let session: Session | null = null;
  let user: User | null = null;

  if (opts?.req) {
    try {
      // Create proper headers object for Better Auth
      const headers = new Headers();
      const reqHeaders = opts.req.headers;

      // Handle different header formats
      if (reqHeaders) {
        if (typeof reqHeaders.get === 'function') {
          // Headers object - use entries() method
          for (const [key, value] of (reqHeaders as { entries(): IterableIterator<[string, string]> }).entries()) {
            headers.set(key, value);
          }
        } else {
          // Plain object
          Object.entries(reqHeaders).forEach(([key, value]) => {
            if (typeof value === 'string') {
              headers.set(key, value);
            } else if (Array.isArray(value)) {
              headers.set(key, value[0]);
            }
          });
        }
      }

      const sessionResult = await opts.auth.api.getSession({
        headers,
      });

      if (sessionResult?.session && sessionResult?.user) {
        // Map Better Auth types to our schema types
        session = {
          ...sessionResult.session,
          ipAddress: sessionResult.session.ipAddress ?? null,
          userAgent: sessionResult.session.userAgent ?? null,
        };
        user = {
          ...sessionResult.user,
          name: sessionResult.user.name ?? null,
          emailVerified: sessionResult.user.emailVerified,
          image: sessionResult.user.image ?? null,
        };
      }
    } catch (error) {
      // Improved error handling based on environment
      if (opts.isDevelopment) {
        console.error('Auth session validation failed:', error);
      }
      // In production, silently fail for security
    }
  }

  return {
    db,
    session,
    user,
  };
};

// Express-specific wrapper
export const createExpressContext = (auth: Auth, isDevelopment?: boolean) =>
  async (opts: trpcExpress.CreateExpressContextOptions) => {
    return await createContext({ ...opts, auth, isDevelopment });
  };

export type Context = Awaited<ReturnType<typeof createContext>>;
