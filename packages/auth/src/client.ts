import { createAuthClient } from "better-auth/client";

// Factory function to create auth client with custom base URL
export function createAuthClientWithConfig(baseURL?: string): ReturnType<typeof createAuthClient> {
  return createAuthClient({
    baseURL: baseURL || getDefaultBaseURL(),
  });
}

const getDefaultBaseURL = (): string => {
  // In browser, use environment variable or current origin
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
           process.env.VITE_BETTER_AUTH_URL ||
           process.env.EXPO_PUBLIC_BETTER_AUTH_URL ||
           window.location.origin ||
           "http://localhost:3000";
  }

  // Server-side, use environment variable
  return process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

// Default client for convenience (maintains backward compatibility)
export const authClient: ReturnType<typeof createAuthClient> = createAuthClientWithConfig();

export type AuthClient = typeof authClient;

// Define types based on what better-auth actually returns at runtime
export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;  // better-auth returns boolean, not Date
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}