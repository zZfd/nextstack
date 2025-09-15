import { Button as TamaguiButton, styled, StackProps } from 'tamagui';

export interface ButtonProps extends StackProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = styled(TamaguiButton, {
  name: 'Button',
  borderRadius: '$3',
  borderWidth: 0,
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
        color: '$primaryForeground',
        pressStyle: {
          backgroundColor: '$primaryPress',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$primaryHover',
          scale: 1.02,
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryForeground',
        pressStyle: {
          backgroundColor: '$secondaryPress',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$secondaryHover',
          scale: 1.02,
        },
      },
      destructive: {
        backgroundColor: '$destructive',
        color: '$destructiveForeground',
        pressStyle: {
          backgroundColor: '$destructivePress',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$destructiveHover',
          scale: 1.02,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$borderColor',
        borderWidth: 1,
        color: '$color',
        pressStyle: {
          backgroundColor: '$accentPress',
          borderColor: '$borderColorPress',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$accentHover',
          borderColor: '$borderColorHover',
          scale: 1.02,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
        pressStyle: {
          backgroundColor: '$accentPress',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$accentHover',
          scale: 1.02,
        },
      },
    },
    size: {
      sm: {
        height: '$height.sm',
        paddingHorizontal: '$3',
        fontSize: '$3',
      },
      md: {
        height: '$height.md',
        paddingHorizontal: '$4',
        fontSize: '$4',
      },
      lg: {
        height: '$height.lg',
        paddingHorizontal: '$6',
        fontSize: '$5',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
