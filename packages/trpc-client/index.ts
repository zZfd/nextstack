import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@lzt/api-router";

export const trpc = createTRPCReact<AppRouter>();

// Re-export useful types and utilities
export type { AppRouter } from "@lzt/api-router";