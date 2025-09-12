import { YStack, Text, styled } from 'tamagui';

// Base Card component
export const Card = styled(YStack, {
  name: 'Card',
  borderRadius: '$3', // rounded-lg
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$card',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  
  // Hover effects following design guide
  variants: {
    hover: {
      true: {
        hoverStyle: {
          borderColor: '$borderColorHover',
          shadowColor: '$shadowColorHover',
          shadowOpacity: 0.15,
          shadowRadius: 6,
          scale: 1.02,
        },
        animation: 'quick',
      },
    },
  } as const,
});

// CardHeader component
export const CardHeader = styled(YStack, {
  name: 'CardHeader',
  padding: '$6',
  borderBottomWidth: 0,
  
  variants: {
    withBorder: {
      true: {
        borderBottomWidth: 1,
        borderBottomColor: '$borderColor',
        marginBottom: '$2',
      },
    },
  } as const,
});

// CardContent component
export const CardContent = styled(YStack, {
  name: 'CardContent',
  padding: '$6',
  paddingTop: 0,
  flex: 1,
});

// CardFooter component
export const CardFooter = styled(YStack, {
  name: 'CardFooter',
  padding: '$6',
  paddingTop: 0,
  borderTopWidth: 0,
  
  variants: {
    withBorder: {
      true: {
        borderTopWidth: 1,
        borderTopColor: '$borderColor',
        marginTop: '$2',
      },
    },
  } as const,
});

// Card Title component for header
export const CardTitle = styled(Text, {
  name: 'CardTitle',
  fontSize: '$6', // text-lg
  fontWeight: '600', // font-semibold
  color: '$color',
  lineHeight: '$4',
});

// Card Description component for header
export const CardDescription = styled(Text, {
  name: 'CardDescription',
  fontSize: '$4', // text-sm
  color: '$mutedForeground',
  lineHeight: '$3',
  marginTop: '$1',
});

// Compound Card component with all parts
// eslint-disable-next-line react-refresh/only-export-components
export const CompoundCard = {
  Root: Card,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
};