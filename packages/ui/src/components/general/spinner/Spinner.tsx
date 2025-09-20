import { Spinner as TamaguiSpinner, styled, StackProps } from 'tamagui';

export interface SpinnerProps extends StackProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'muted';
}

export const Spinner = styled(TamaguiSpinner, {
  name: 'Spinner',

  variants: {
    size: {
      sm: {
        width: '$1',
        height: '$1',
      },
      md: {
        width: '$1.5',
        height: '$1.5',
      },
      lg: {
        width: '$2',
        height: '$2',
      },
    },
    variant: {
      primary: {
        color: '$green9',
      },
      secondary: {
        color: '$gray9',
      },
      muted: {
        color: '$gray7',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});