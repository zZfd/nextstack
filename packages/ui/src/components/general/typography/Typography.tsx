import {
  HeadingProps,
  ParagraphProps,
  styled,
  H1 as TamaguiH1,
  H2 as TamaguiH2,
  H3 as TamaguiH3,
  H4 as TamaguiH4,
  H5 as TamaguiH5,
  H6 as TamaguiH6,
  Paragraph as TamaguiParagraph,
  Text as TamaguiText,
  TextProps,
} from 'tamagui';

// Text Props Interface - Rule 4: Explicit TypeScript interfaces
export interface TypographyTextProps extends TextProps {
  variant?: 'default' | 'muted' | 'destructive' | 'success' | 'warning' | 'info';
}

// Paragraph Props Interface
export interface TypographyParagraphProps extends ParagraphProps {
  variant?: 'default' | 'muted' | 'lead' | 'large' | 'small';
}

// Heading Props Interface
export interface TypographyHeadingProps extends HeadingProps {
  variant?: 'default' | 'muted' | 'destructive' | 'success' | 'warning' | 'info';
}

// Rule 3: Use variants instead of runtime switch statements
// Rule 2: Use styled Tamagui components as building blocks
export const Text = styled(TamaguiText, {
  name: 'Text',
  fontFamily: '$body',
  color: '$foreground',

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
});

// Rule 3: Use declarative variants instead of runtime functions
export const Paragraph = styled(TamaguiParagraph, {
  name: 'Paragraph',
  fontFamily: '$body',
  lineHeight: '$5',
  color: '$foreground',

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
        color: '$foreground',
      },
      small: {
        fontSize: '$3',
        fontWeight: '$2',
        color: '$foreground',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
});

// Enhanced heading components with consistent theming and variants
export const Heading1 = styled(TamaguiH1, {
  name: 'H1',
  fontFamily: '$heading',
  fontWeight: '$4',
  fontSize: '$10',
  lineHeight: '$7',

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
});

export const Heading2 = styled(TamaguiH2, {
  name: 'H2',
  fontFamily: '$heading',
  fontWeight: '$3',
  fontSize: '$9',
  lineHeight: '$6',

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
});

export const Heading3 = styled(TamaguiH3, {
  name: 'H3',
  fontFamily: '$heading',
  fontWeight: '$3',
  fontSize: '$8',
  lineHeight: '$5',

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
});

export const Heading4 = styled(TamaguiH4, {
  name: 'H4',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$7',
  lineHeight: '$4',

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
});

export const Heading5 = styled(TamaguiH5, {
  name: 'H5',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$6',
  lineHeight: '$3',

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
});

export const Heading6 = styled(TamaguiH6, {
  name: 'H6',
  fontFamily: '$heading',
  fontWeight: '$2',
  fontSize: '$5',
  lineHeight: '$2',

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
});

// Aliases for common usage
export const H1 = Heading1;
export const H2 = Heading2;
export const H3 = Heading3;
export const H4 = Heading4;
export const H5 = Heading5;
export const H6 = Heading6;
