import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { XStack, YStack, Text } from 'tamagui';

import { Badge, NotificationBadge, StatusBadge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge Component

Small status indicators and labels for categorizing and highlighting content.

## Features
- **Multiple Variants**: Default, secondary, destructive, outline, success, warning, info
- **Size Options**: Small, medium, and large sizes
- **Status Indicators**: Specialized badges for online/offline states
- **Notification Badges**: Circular badges for counts and alerts
- **Theme Integration**: Follows design system colors

## Components
- \`Badge\`: Main badge component with variants
- \`NotificationBadge\`: Circular badge for counts/notifications
- \`StatusBadge\`: Dot indicator for status (online/offline/busy/away)

## Usage
Use badges to show status, categorize content, highlight new features, or display counts.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: 'Badge variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Badge',
  render: (args) => (
    <Badge {...args}>Badge</Badge>
  ),
};

export const Variants: Story = {
  name: 'Badge Variants',
  render: () => (
    <YStack space="$4">
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Standard Variants</Text>
        <XStack space="$2" alignItems="center" flexWrap="wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </XStack>
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Status Variants</Text>
        <XStack space="$2" alignItems="center" flexWrap="wrap">
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </XStack>
      </YStack>
    </YStack>
  ),
};

export const Sizes: Story = {
  name: 'Badge Sizes',
  render: () => (
    <YStack space="$4">
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Size Variants</Text>
        <XStack space="$2" alignItems="center">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </XStack>
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Same Content, Different Sizes</Text>
        <XStack space="$2" alignItems="center">
          <Badge size="sm" variant="success">New</Badge>
          <Badge size="md" variant="success">New</Badge>
          <Badge size="lg" variant="success">New</Badge>
        </XStack>
      </YStack>
    </YStack>
  ),
};

export const NotificationBadges: Story = {
  name: 'Notification Badges',
  render: () => (
    <YStack space="$4">
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Notification Counts</Text>
        <XStack space="$4" alignItems="center">
          <YStack alignItems="center" space="$1">
            <NotificationBadge size="sm">3</NotificationBadge>
            <Text fontSize="$3">Small</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <NotificationBadge size="md">12</NotificationBadge>
            <Text fontSize="$3">Medium</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <NotificationBadge size="lg">99+</NotificationBadge>
            <Text fontSize="$3">Large</Text>
          </YStack>
        </XStack>
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Color Variants</Text>
        <XStack space="$4" alignItems="center">
          <YStack alignItems="center" space="$1">
            <NotificationBadge color="destructive">5</NotificationBadge>
            <Text fontSize="$3">Error</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <NotificationBadge color="primary">8</NotificationBadge>
            <Text fontSize="$3">Primary</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <NotificationBadge color="success">2</NotificationBadge>
            <Text fontSize="$3">Success</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <NotificationBadge color="warning">!</NotificationBadge>
            <Text fontSize="$3">Warning</Text>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  ),
};

export const StatusBadges: Story = {
  name: 'Status Indicators',
  render: () => (
    <YStack space="$4">
      <Text fontSize="$4" fontWeight="500">Status Indicators</Text>
      <XStack space="$6" alignItems="center">
        <YStack alignItems="center" space="$2">
          <StatusBadge status="online" />
          <Text fontSize="$3">Online</Text>
        </YStack>
        <YStack alignItems="center" space="$2">
          <StatusBadge status="offline" />
          <Text fontSize="$3">Offline</Text>
        </YStack>
        <YStack alignItems="center" space="$2">
          <StatusBadge status="busy" />
          <Text fontSize="$3">Busy</Text>
        </YStack>
        <YStack alignItems="center" space="$2">
          <StatusBadge status="away" />
          <Text fontSize="$3">Away</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

export const UsageExamples: Story = {
  name: 'Usage Examples',
  render: () => (
    <YStack space="$6" padding="$4">
      {/* Product Tags */}
      <YStack space="$2">
        <Text fontSize="$5" fontWeight="600">Product Tags</Text>
        <XStack space="$2" flexWrap="wrap">
          <Badge variant="success">New Arrival</Badge>
          <Badge variant="destructive">Limited Time</Badge>
          <Badge variant="warning">Sale</Badge>
          <Badge variant="info">Best Seller</Badge>
          <Badge variant="outline">Free Shipping</Badge>
        </XStack>
      </YStack>
      
      {/* User Status */}
      <YStack space="$2">
        <Text fontSize="$5" fontWeight="600">User Profiles</Text>
        <YStack space="$3">
          <XStack space="$3" alignItems="center">
            <YStack 
              width={40} 
              height={40} 
              borderRadius="$6" 
              backgroundColor="$primary" 
              alignItems="center" 
              justifyContent="center"
              position="relative"
            >
              <Text color="$white" fontWeight="bold">JD</Text>
              <StatusBadge 
                status="online" 
                position="absolute" 
                bottom={-2} 
                right={-2}
              />
            </YStack>
            <YStack>
              <Text fontWeight="500">John Doe</Text>
              <XStack space="$1" alignItems="center">
                <Badge size="sm" variant="secondary">Admin</Badge>
                <Badge size="sm" variant="success">Verified</Badge>
              </XStack>
            </YStack>
          </XStack>
          
          <XStack space="$3" alignItems="center">
            <YStack 
              width={40} 
              height={40} 
              borderRadius="$6" 
              backgroundColor="$secondary" 
              alignItems="center" 
              justifyContent="center"
              position="relative"
            >
              <Text color="$white" fontWeight="bold">SA</Text>
              <StatusBadge 
                status="busy" 
                position="absolute" 
                bottom={-2} 
                right={-2}
              />
            </YStack>
            <YStack>
              <Text fontWeight="500">Sarah Anderson</Text>
              <XStack space="$1" alignItems="center">
                <Badge size="sm" variant="outline">Moderator</Badge>
                <Badge size="sm" variant="info">Pro</Badge>
              </XStack>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
      
      {/* Notifications */}
      <YStack space="$2">
        <Text fontSize="$5" fontWeight="600">Navigation with Badges</Text>
        <XStack space="$4">
          <XStack space="$2" alignItems="center">
            <Text>Messages</Text>
            <NotificationBadge size="sm">3</NotificationBadge>
          </XStack>
          <XStack space="$2" alignItems="center">
            <Text>Notifications</Text>
            <NotificationBadge size="sm" color="warning">!</NotificationBadge>
          </XStack>
          <XStack space="$2" alignItems="center">
            <Text>Cart</Text>
            <NotificationBadge size="sm" color="primary">12</NotificationBadge>
          </XStack>
        </XStack>
      </YStack>
    </YStack>
  ),
};