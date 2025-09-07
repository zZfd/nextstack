import type { AppRouter } from "@nexstack/api";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

// Re-export useful types and utilities
export type { AppRouter } from "@nexstack/api";