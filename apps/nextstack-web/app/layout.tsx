import { ThemeProvider } from '@nextstack/app/provider/ThemeProvider'
import { Provider } from '@nextstack/app/provider'
import type { Metadata } from 'next'
import './globals.css'

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
        <ThemeProvider>
          <Provider>
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}