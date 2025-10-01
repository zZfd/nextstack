// App configuration
export const config = {
  // tRPC endpoint - adjust based on your environment
  trpcEndpoint:
    process.env.EXPO_PUBLIC_TRPC_ENDPOINT || 'http://localhost:3001/trpc',

  // Better-auth endpoint
  authEndpoint:
    process.env.EXPO_PUBLIC_AUTH_ENDPOINT || 'http://localhost:3001',
} as const;
