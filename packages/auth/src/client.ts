import { createAuthClient } from "better-auth/client";

const getBaseURL = (): string => {
  // In browser, use environment variable or current origin
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
           window.location.origin ||
           "http://localhost:3000";
  }

  // Server-side, use environment variable
  return process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export type AuthClient = typeof authClient;

// Define types based on Prisma database schema
export interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}