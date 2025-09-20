import { NextTamaguiProvider } from '@nextstack/app/provider/NextTamaguiProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextStack - Full-stack TypeScript Scaffold',
  description: 'A full-stack TypeScript development scaffold built on Monorepo architecture',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}