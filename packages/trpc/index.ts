import type { AppRouter } from "@nexstack/api";
import { createTRPCReact, type CreateTRPCReact } from "@trpc/react-query";

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

// Re-export useful types and utilities
export type { AppRouter } from "@nexstack/api";