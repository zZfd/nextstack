import { db } from "@nexstack/database";
import type * as trpc from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

// Universal context options for both Express and fetch adapters
interface CreateContextOptions {
  req?: Request | trpcExpress.CreateExpressContextOptions['req'];
  res?: Response | trpcExpress.CreateExpressContextOptions['res'];
}

export const createContext = (_opts?: CreateContextOptions) => {
  // You can access request/response here if needed for auth, etc.
  // const { req, res } = opts || {};
  
  return {
    db,
  };
};

// Express-specific wrapper for backward compatibility
export const createExpressContext = (opts: trpcExpress.CreateExpressContextOptions) => {
  return createContext(opts);
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;