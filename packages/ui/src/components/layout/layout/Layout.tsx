import { View as TamaguiView, styled, ViewProps } from 'tamagui'

export interface LayoutProps extends ViewProps {}

export const Layout = styled(TamaguiView, {
  name: 'Layout',
  backgroundColor: '$background',
  variants: {
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
    },
    padded: {
      true: {
        padding: '$4',
      },
      small: {
        padding: '$2', 
      },
      large: {
        padding: '$6',
      },
    },
    rounded: {
      true: {
        borderRadius: '$3',
      },
      small: {
        borderRadius: '$2',
      },
      large: {
        borderRadius: '$5',
      },
    },
    bordered: {
      true: {
        borderWidth: 1,
        borderColor: '$border',
      },
    },
  } as const,
})