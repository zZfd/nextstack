import {
  TamaguiProvider,
  type TamaguiProviderProps,
  ToastProvider,
  config,
  isWeb,
} from '@nextstack/ui'
import type { JSX } from 'react'
import { useColorScheme } from 'react-native'

export function Provider({
  children,
  defaultTheme = 'light',
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }): JSX.Element {
  const colorScheme = useColorScheme()
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light')

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <ToastProvider swipeDirection="horizontal" duration={6000} native={isWeb ? [] : ['mobile']}>
        {children}
      </ToastProvider>
    </TamaguiProvider>
  )
}