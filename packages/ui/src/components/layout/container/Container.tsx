import { ScrollView as TamaguiScrollView, styled, ScrollViewProps } from 'tamagui'

export interface ContainerProps extends ScrollViewProps {}

export const Container = styled(TamaguiScrollView, {
  name: 'Container',
  backgroundColor: '$background',
  flex: 1,
  variants: {
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
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
  } as const,
})