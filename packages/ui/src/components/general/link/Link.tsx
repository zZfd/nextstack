import { Anchor, styled, TextProps } from 'tamagui';

export interface LinkProps extends TextProps {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  variant?: 'default' | 'muted' | 'underline' | 'button';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
}

export const Link = styled(Anchor, {
  name: 'Link',
  textDecorationLine: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  variants: {
    variant: {
      default: {
        color: '$green9',
        hoverStyle: {
          color: '$green10',
          textDecorationLine: 'underline',
        },
        pressStyle: {
          color: '$green8',
        },
      },
      muted: {
        color: '$gray9',
        hoverStyle: {
          color: '$gray11',
          textDecorationLine: 'underline',
        },
        pressStyle: {
          color: '$gray8',
        },
      },
      underline: {
        color: '$green9',
        textDecorationLine: 'underline',
        hoverStyle: {
          color: '$green10',
          textDecorationLine: 'none',
        },
        pressStyle: {
          color: '$green8',
        },
      },
      button: {
        color: '$green9',
        backgroundColor: '$green2',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        borderRadius: '$2',
        hoverStyle: {
          backgroundColor: '$green3',
          color: '$green10',
        },
        pressStyle: {
          backgroundColor: '$green4',
          color: '$green8',
        },
      },
    },
    size: {
      sm: {
        fontSize: '$3',
        lineHeight: '$3',
      },
      md: {
        fontSize: '$4',
        lineHeight: '$4',
      },
      lg: {
        fontSize: '$5',
        lineHeight: '$5',
      },
    },
    external: {
      true: {
        // Additional styling for external links if needed
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});