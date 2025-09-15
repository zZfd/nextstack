import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { XStack, YStack, Text } from 'tamagui';

import { Badge, Button } from '../../general';

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '.';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Card Component

Card components for containing and organizing content with a consistent design.

## Features
- **Flexible Structure**: Header, Content, Footer sections
- **Hover Effects**: Smooth transitions with scale and shadow
- **Theme Integration**: Follows design system colors and spacing
- **Composable**: Mix and match Card parts as needed

## Components
- \`Card\`: Base container
- \`CardHeader\`: Header section with optional border
- \`CardContent\`: Main content area
- \`CardFooter\`: Footer section with optional border
- \`CardTitle\`: Styled title for headers
- \`CardDescription\`: Styled description for headers

## Usage
Cards are perfect for displaying grouped information, product details, user profiles, or any content that benefits from visual separation.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Basic Card',
  render: () => (
    <Card width={300} hover>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a simple card description that explains what this card is about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is the main content of the card. You can put any content here.</Text>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  name: 'Card without Footer',
  render: () => (
    <Card width={300} hover>
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A card with just header and content.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          This card doesn&apos;t have a footer. Sometimes you don&apos;t need one!
        </Text>
      </CardContent>
    </Card>
  ),
};

export const WithBorders: Story = {
  name: 'Card with Borders',
  render: () => (
    <Card width={300} hover>
      <CardHeader withBorder>
        <CardTitle>Header with Border</CardTitle>
        <CardDescription>This header has a border below it.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Content area in the middle.</Text>
      </CardContent>
      <CardFooter withBorder>
        <XStack space="$2">
          <Button size="sm" variant="outline">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </XStack>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  name: 'Product Card Example',
  render: () => (
    <Card width={280} hover>
      <CardHeader>
        <YStack space="$2">
          <XStack alignItems="center" justifyContent="space-between">
            <CardTitle>MacBook Pro 14&quot;</CardTitle>
            <Badge variant="success">In Stock</Badge>
          </XStack>
          <CardDescription>
            Apple M2 Pro chip with 10-core CPU and 16-core GPU
          </CardDescription>
        </YStack>
      </CardHeader>
      <CardContent>
        <YStack space="$3">
          <Text fontSize="$7" fontWeight="bold" color="$primary">
            $1,999
          </Text>
          <Text fontSize="$4" color="$mutedForeground">
            • 16GB unified memory
            • 512GB SSD storage
            • 14-inch Liquid Retina XDR display
          </Text>
        </YStack>
      </CardContent>
      <CardFooter>
        <XStack space="$2" width="100%">
          <Button flex={1} variant="outline">Add to Cart</Button>
          <Button flex={1}>Buy Now</Button>
        </XStack>
      </CardFooter>
    </Card>
  ),
};

export const UserProfileCard: Story = {
  name: 'User Profile Card',
  render: () => (
    <Card width={320} hover>
      <CardHeader>
        <XStack space="$3" alignItems="center">
          <YStack 
            width={60} 
            height={60} 
            borderRadius="$6" 
            backgroundColor="$primary" 
            alignItems="center" 
            justifyContent="center"
          >
            <Text color="$white" fontSize="$6" fontWeight="bold">
              JD
            </Text>
          </YStack>
          <YStack flex={1}>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Senior Frontend Developer</CardDescription>
            <XStack space="$2" marginTop="$1">
              <Badge size="sm" variant="outline">React</Badge>
              <Badge size="sm" variant="outline">TypeScript</Badge>
            </XStack>
          </YStack>
        </XStack>
      </CardHeader>
      <CardContent>
        <Text fontSize="$4">
          Passionate about creating beautiful user interfaces with modern web technologies. 
          5+ years of experience in React and TypeScript.
        </Text>
      </CardContent>
      <CardFooter>
        <XStack space="$2" width="100%">
          <Button flex={1} variant="outline">Message</Button>
          <Button flex={1}>View Profile</Button>
        </XStack>
      </CardFooter>
    </Card>
  ),
};

export const CardGrid: Story = {
  name: 'Card Grid',
  render: () => (
    <YStack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">Featured Products</Text>
      <XStack space="$4" flexWrap="wrap">
        {[
          { title: 'iPhone 15 Pro', price: '$999', status: 'new' },
          { title: 'iPad Air', price: '$599', status: 'sale' },
          { title: 'Apple Watch', price: '$399', status: 'popular' },
        ].map((product, index) => (
          <Card key={index} width={240} hover>
            <CardHeader>
              <XStack alignItems="center" justifyContent="space-between">
                <CardTitle>{product.title}</CardTitle>
                <Badge 
                  variant={product.status === 'new' ? 'success' : product.status === 'sale' ? 'destructive' : 'default'}
                  size="sm"
                >
                  {product.status}
                </Badge>
              </XStack>
            </CardHeader>
            <CardContent>
              <Text fontSize="$6" fontWeight="bold" color="$primary">
                {product.price}
              </Text>
            </CardContent>
            <CardFooter>
              <Button width="100%" size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </XStack>
    </YStack>
  ),
};