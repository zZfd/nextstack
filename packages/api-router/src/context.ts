import { db } from "@lzt/database";
import type * as trpc from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req: _req,
  res: _res,
}: trpcExpress.CreateExpressContextOptions): { db: typeof db } => {
  // For now, we'll just pass the db instance
  return {
    db,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;