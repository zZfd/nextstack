import { Button, styled } from 'tamagui';

export const MyButton = styled(Button, {
  name: 'MyButton',
  borderRadius: '$3',
  borderWidth: 0,
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
        color: '$primaryForeground',
        pressStyle: {
          backgroundColor: '$primary',
          opacity: 0.8,
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$primary',
          opacity: 0.9,
          scale: 1.02,
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryForeground',
        pressStyle: {
          backgroundColor: '$secondary',
          opacity: 0.8,
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$secondary',
          opacity: 0.9,
          scale: 1.02,
        },
      },
      destructive: {
        backgroundColor: '$destructive',
        color: '$destructiveForeground',
        pressStyle: {
          backgroundColor: '$destructive',
          opacity: 0.8,
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$destructive',
          opacity: 0.9,
          scale: 1.02,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$border',
        borderWidth: 1,
        color: '$foreground',
        pressStyle: {
          backgroundColor: '$accent',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$accent',
          scale: 1.02,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$foreground',
        pressStyle: {
          backgroundColor: '$accent',
          scale: 0.95,
        },
        hoverStyle: {
          backgroundColor: '$accent',
          scale: 1.02,
        },
      },
    },
    size: {
      sm: {
        height: 32,
        paddingHorizontal: '$3',
        fontSize: '$3',
      },
      md: {
        height: 40,
        paddingHorizontal: '$4',
        fontSize: '$4',
      },
      lg: {
        height: 48,
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
