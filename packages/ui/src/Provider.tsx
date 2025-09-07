import { TamaguiProvider as TamaguiProviderOriginal, TamaguiProviderProps } from 'tamagui'
import { tamaguiConfig } from './tamagui.config'

export interface ProviderProps extends Omit<TamaguiProviderProps, 'config'> {
  config?: TamaguiProviderProps['config']
}

export function TamaguiProvider({ 
  children, 
  config = tamaguiConfig,
  ...props 
}: ProviderProps) {
  return (
    <TamaguiProviderOriginal config={config as any} {...props}>
      {children}
    </TamaguiProviderOriginal>
  )
}