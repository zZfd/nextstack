import { 
  Text as TamaguiText, 
  H1 as TamaguiH1, 
  H2 as TamaguiH2, 
  H3 as TamaguiH3, 
  H4 as TamaguiH4, 
  H5 as TamaguiH5, 
  H6 as TamaguiH6,
  TextProps,
  HeadingProps
} from 'tamagui'

export interface TypographyTextProps extends TextProps {}
export interface TypographyHeadingProps extends HeadingProps {}

export function Text({ children, ...props }: TypographyTextProps) {
  return <TamaguiText {...props}>{children}</TamaguiText>
}

export function Heading1({ children, ...props }: TypographyHeadingProps) {
  return <TamaguiH1 {...props}>{children}</TamaguiH1>
}

export function Heading2({ children, ...props }: TypographyHeadingProps) {
  return <TamaguiH2 {...props}>{children}</TamaguiH2>
}

export function Heading3({ children, ...props }: TypographyHeadingProps) {
  return <TamaguiH3 {...props}>{children}</TamaguiH3>
}

export function Heading4({ children, ...props }: TypographyHeadingProps) {
  return <TamaguiH4 {...props}>{children}</TamaguiH4>
}

export function Heading5({ children, ...props }: TypographyHeadingProps) {
  return <TamaguiH5 {...props}>{children}</TamaguiH5>
}

export function Heading6({ children, ...props }: TypographyHeadingProps) {
  return <TamaguiH6 {...props}>{children}</TamaguiH6>
}

// Alias for common usage
export const H1 = Heading1
export const H2 = Heading2
export const H3 = Heading3
export const H4 = Heading4
export const H5 = Heading5
export const H6 = Heading6