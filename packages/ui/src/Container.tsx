import { ScrollView as TamaguiScrollView, ScrollViewProps } from 'tamagui'

export interface ContainerProps extends ScrollViewProps {}

export function Container({ children, ...props }: ContainerProps) {
  return <TamaguiScrollView {...props}>{children}</TamaguiScrollView>
}