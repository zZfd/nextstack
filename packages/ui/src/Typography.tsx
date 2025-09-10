import { 
  Text as TamaguiText, 
  H1 as TamaguiH1, 
  H2 as TamaguiH2, 
  H3 as TamaguiH3, 
  H4 as TamaguiH4, 
  H5 as TamaguiH5, 
  H6 as TamaguiH6,
  Paragraph as TamaguiParagraph,
  styled,
  TextProps,
  HeadingProps,
  ParagraphProps
} from 'tamagui'

export interface TypographyTextProps extends TextProps {}
export interface TypographyHeadingProps extends HeadingProps {}
export interface TypographyParagraphProps extends ParagraphProps {}

// Enhanced Text component with theme colors
export const Text = styled(TamaguiText, {
  name: 'Text',
  color: '$foreground',
  fontFamily: '$body',
  variants: {
    variant: {
      default: {
        color: '$foreground',
      },
      muted: {
        color: '$mutedForeground',
      },
      destructive: {
        color: '$destructive',
      },
      success: {
        color: '$success',
      },
      warning: {
        color: '$warning',
      },
      info: {
        color: '$info',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'default',
  },
})

// Enhanced Paragraph component
export const Paragraph = styled(TamaguiParagraph, {
  name: 'Paragraph',
  color: '$foreground',
  fontFamily: '$body',
  lineHeight: '$5',
  variants: {
    variant: {
      default: {
        color: '$foreground',
      },
      muted: {
        color: '$mutedForeground',
      },
      lead: {
        fontSize: '$6',
        color: '$mutedForeground',
      },
      large: {
        fontSize: '$5',
        fontWeight: '$2',
      },
      small: {
        fontSize: '$3',
        fontWeight: '$2',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'default',
  },
})

// Enhanced heading components with consistent theming
export const Heading1 = styled(TamaguiH1, {
  name: 'H1',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$4',
  fontSize: '$10',
  lineHeight: '$7',
})

export const Heading2 = styled(TamaguiH2, {
  name: 'H2', 
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$3',
  fontSize: '$9',
  lineHeight: '$6',
})

export const Heading3 = styled(TamaguiH3, {
  name: 'H3',
  color: '$foreground', 
  fontFamily: '$heading',
  fontWeight: '$3',
  fontSize: '$8',
  lineHeight: '$5',
})

export const Heading4 = styled(TamaguiH4, {
  name: 'H4',
  color: '$foreground',
  fontFamily: '$heading', 
  fontWeight: '$2',
  fontSize: '$7',
  lineHeight: '$4',
})

export const Heading5 = styled(TamaguiH5, {
  name: 'H5',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$2', 
  fontSize: '$6',
  lineHeight: '$3',
})

export const Heading6 = styled(TamaguiH6, {
  name: 'H6',
  color: '$foreground',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$5',
  lineHeight: '$2',
})

// Aliases for common usage
export const H1 = Heading1
export const H2 = Heading2
export const H3 = Heading3
export const H4 = Heading4
export const H5 = Heading5
export const H6 = Heading6