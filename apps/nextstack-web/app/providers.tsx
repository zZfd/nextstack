'use client'

import { trpc } from '@nextstack/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'

import { config } from '../config'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })
  )
  
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: config.trpcEndpoint,
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}