import { trpc } from '@nextstack/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';

import { App } from './App';
import { config } from './config';

export function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: config.trpcEndpoint,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}