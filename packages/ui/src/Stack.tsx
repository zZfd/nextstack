import { YStack as TamaguiYStack, XStack as TamaguiXStack, YStackProps, XStackProps } from 'tamagui'

export interface StackProps extends YStackProps {}
export interface HStackProps extends XStackProps {}

export function Stack({ children, ...props }: StackProps) {
  return <TamaguiYStack {...props}>{children}</TamaguiYStack>
}

export function HStack({ children, ...props }: HStackProps) {
  return <TamaguiXStack {...props}>{children}</TamaguiXStack>
}