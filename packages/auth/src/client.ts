import { createAuthClient } from 'better-auth/client';

// Factory function to create auth client with custom base URL
export function createAuthClientWithConfig(
  baseURL?: string
): ReturnType<typeof createAuthClient> | null {
  if (!baseURL) {
    return null;
  }
  return createAuthClient({
    baseURL,
  });
}
