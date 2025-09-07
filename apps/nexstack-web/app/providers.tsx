'use client'

import { trpc } from '@lzt/trpc-client'
import { tamaguiConfig } from '@lzt/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import { TamaguiProvider } from 'tamagui'

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
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig as any}>
          {children}
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}