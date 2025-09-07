import type { AppRouter } from "@lzt/api-router";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

// Re-export useful types and utilities
export type { AppRouter } from "@lzt/api-router";