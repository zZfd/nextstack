import { YStack as TamaguiYStack, XStack as TamaguiXStack, styled, YStackProps, XStackProps } from 'tamagui'

export interface StackProps extends YStackProps {}
export interface HStackProps extends XStackProps {}

// Enhanced vertical stack with theme integration
export const Stack = styled(TamaguiYStack, {
  name: 'Stack',
  variants: {
    spacing: {
      none: {
        gap: 0,
      },
      sm: {
        gap: '$2',
      },
      md: {
        gap: '$4',
      },
      lg: {
        gap: '$6',
      },
      xl: {
        gap: '$8',
      },
    },
    padded: {
      true: {
        padding: '$4',
      },
      sm: {
        padding: '$2',
      },
      lg: {
        padding: '$6',
      },
    },
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,
  defaultVariants: {
    spacing: 'md',
  },
})

// Enhanced horizontal stack with theme integration  
export const HStack = styled(TamaguiXStack, {
  name: 'HStack',
  variants: {
    spacing: {
      none: {
        gap: 0,
      },
      sm: {
        gap: '$2',
      },
      md: {
        gap: '$4',
      },
      lg: {
        gap: '$6',
      },
      xl: {
        gap: '$8',
      },
    },
    padded: {
      true: {
        padding: '$4',
      },
      sm: {
        padding: '$2',
      },
      lg: {
        padding: '$6',
      },
    },
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    distribution: {
      spaceBetween: {
        justifyContent: 'space-between',
      },
      spaceAround: {
        justifyContent: 'space-around',
      },
      spaceEvenly: {
        justifyContent: 'space-evenly',
      },
    },
  } as const,
  defaultVariants: {
    spacing: 'md',
  },
})