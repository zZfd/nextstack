import { Separator as TamaguiSeparator, styled, StackProps } from 'tamagui';

export interface SeparatorProps extends StackProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  variant?: 'default' | 'muted' | 'strong';
}

export const Separator = styled(TamaguiSeparator, {
  name: 'Separator',
  backgroundColor: '$gray6',
  flexShrink: 0,

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
      },
      vertical: {
        width: 1,
        height: '100%',
        alignSelf: 'stretch',
      },
    },
    thickness: {
      thin: {
        variants: {
          orientation: {
            horizontal: {
              height: 1,
            },
            vertical: {
              width: 1,
            },
          },
        },
      },
      medium: {
        variants: {
          orientation: {
            horizontal: {
              height: 2,
            },
            vertical: {
              width: 2,
            },
          },
        },
      },
      thick: {
        variants: {
          orientation: {
            horizontal: {
              height: 4,
            },
            vertical: {
              width: 4,
            },
          },
        },
      },
    },
    variant: {
      default: {
        backgroundColor: '$gray6',
      },
      muted: {
        backgroundColor: '$gray4',
      },
      strong: {
        backgroundColor: '$gray9',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
    thickness: 'thin',
    variant: 'default',
  },
});