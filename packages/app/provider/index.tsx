import { isWeb } from '@nextstack/ui'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'sonner'

export function Provider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <>
      {children}
      {isWeb && (
        <Toaster
          richColors
          closeButton
          position="top-right"
        />
      )}
    </>
  )
}