import { View as TamaguiView, ViewProps } from 'tamagui'

export interface LayoutProps extends ViewProps {}

export function Layout({ children, ...props }: LayoutProps) {
  return <TamaguiView {...props}>{children}</TamaguiView>
}