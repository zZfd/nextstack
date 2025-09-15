import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { XStack, YStack, Text } from 'tamagui';

import {
  Avatar,
  AvatarFallback,
  AvatarFallbackText,
  AvatarGroup,
  StatusAvatar,
  StatusIndicator
} from '../Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Avatar Component

User profile images and fallback initials with consistent styling and status indicators.

## Features
- **Multiple Sizes**: Small to 2XL for different contexts
- **Gradient Borders**: Brand, sunset, ocean gradient options
- **Fallback Support**: Initials or icons when image unavailable
- **Status Indicators**: Online, offline, busy, away states
- **Avatar Groups**: Overlapping avatars for team displays
- **Image Support**: Automatic fallback to initials

## Components
- \`Avatar\`: Base avatar container
- \`AvatarImage\`: Image component for avatar photos
- \`AvatarFallback\`: Fallback container for initials/icons
- \`AvatarFallbackText\`: Styled text for initials
- \`AvatarGroup\`: Container for multiple avatars
- \`CompoundAvatar\`: Ready-to-use avatar with image/fallback logic
- \`StatusAvatar\`: Avatar with status indicator

## Usage
Use avatars to represent users, team members, or any entities that benefit from visual identification.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
    },
    gradient: {
      control: 'select',
      options: [false, true, 'brand', 'sunset', 'ocean'],
      description: 'Gradient border effect',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Basic Avatar',
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>
        <AvatarFallbackText>JD</AvatarFallbackText>
      </AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  name: 'Avatar Sizes',
  render: () => (
    <YStack space="$4">
      <Text fontSize="$4" fontWeight="500">Different Sizes</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <Avatar size="sm">
            <AvatarFallback>
              <AvatarFallbackText size="sm">S</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Small (32px)</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="md">
            <AvatarFallback>
              <AvatarFallbackText size="md">M</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Medium (40px)</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="lg">
            <AvatarFallback>
              <AvatarFallbackText size="lg">L</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Large (48px)</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="xl">
            <AvatarFallback>
              <AvatarFallbackText size="xl">XL</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">XL (64px)</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="2xl">
            <AvatarFallback>
              <AvatarFallbackText size="2xl">2XL</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">2XL (80px)</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

export const GradientBorders: Story = {
  name: 'Gradient Borders',
  render: () => (
    <YStack space="$4">
      <Text fontSize="$4" fontWeight="500">Gradient Border Effects</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <Avatar size="lg" gradient={true}>
            <AvatarFallback>
              <AvatarFallbackText size="lg">BG</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Blue-Purple</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="lg" gradient="brand">
            <AvatarFallback color="emerald">
              <AvatarFallbackText size="lg">BR</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Brand</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="lg" gradient="sunset">
            <AvatarFallback color="warning">
              <AvatarFallbackText size="lg">SU</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Sunset</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <Avatar size="lg" gradient="ocean">
            <AvatarFallback color="teal">
              <AvatarFallbackText size="lg">OC</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Ocean</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

export const FallbackColors: Story = {
  name: 'Fallback Colors',
  render: () => (
    <YStack space="$4">
      <Text fontSize="$4" fontWeight="500">Different Fallback Colors</Text>
      <XStack space="$3" alignItems="center" flexWrap="wrap">
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="primary">
              <AvatarFallbackText size="md">PR</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Primary</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="secondary">
              <AvatarFallbackText size="md">SE</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Secondary</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="success">
              <AvatarFallbackText size="md">SU</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Success</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="warning">
              <AvatarFallbackText size="md">WA</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Warning</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="destructive">
              <AvatarFallbackText size="md">DE</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Destructive</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="purple">
              <AvatarFallbackText size="md">PU</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Purple</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="teal">
              <AvatarFallbackText size="md">TE</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Teal</Text>
        </YStack>
        
        <YStack alignItems="center" space="$1">
          <Avatar size="md">
            <AvatarFallback color="emerald">
              <AvatarFallbackText size="md">EM</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Emerald</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

export const StatusAvatars: Story = {
  name: 'Status Indicators',
  render: () => (
    <YStack space="$4">
      <Text fontSize="$4" fontWeight="500">Avatar with Status</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <StatusAvatar>
            <Avatar size="lg">
              <AvatarFallback color="primary">
                <AvatarFallbackText size="lg">ON</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <StatusIndicator size="lg" status="online" />
          </StatusAvatar>
          <Text fontSize="$3">Online</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <StatusAvatar>
            <Avatar size="lg">
              <AvatarFallback color="secondary">
                <AvatarFallbackText size="lg">OF</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <StatusIndicator size="lg" status="offline" />
          </StatusAvatar>
          <Text fontSize="$3">Offline</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <StatusAvatar>
            <Avatar size="lg">
              <AvatarFallback color="destructive">
                <AvatarFallbackText size="lg">BS</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <StatusIndicator size="lg" status="busy" />
          </StatusAvatar>
          <Text fontSize="$3">Busy</Text>
        </YStack>
        
        <YStack alignItems="center" space="$2">
          <StatusAvatar>
            <Avatar size="lg">
              <AvatarFallback color="warning">
                <AvatarFallbackText size="lg">AW</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <StatusIndicator size="lg" status="away" />
          </StatusAvatar>
          <Text fontSize="$3">Away</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

export const AvatarGroups: Story = {
  name: 'Avatar Groups',
  render: () => (
    <YStack space="$4">
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Overlapping Avatar Group</Text>
        <AvatarGroup spacing="tight">
          <Avatar size="md">
            <AvatarFallback color="primary">
              <AvatarFallbackText size="md">AB</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback color="success">
              <AvatarFallbackText size="md">CD</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback color="warning">
              <AvatarFallbackText size="md">EF</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback color="purple">
              <AvatarFallbackText size="md">+2</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Spaced Avatar Group</Text>
        <AvatarGroup spacing="normal">
          <Avatar size="md">
            <AvatarFallback color="teal">
              <AvatarFallbackText size="md">GH</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback color="emerald">
              <AvatarFallbackText size="md">IJ</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback color="destructive">
              <AvatarFallbackText size="md">KL</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </YStack>
    </YStack>
  ),
};

export const CompositionExample: Story = {
  name: 'Avatar Composition',
  render: () => (
    <YStack space="$4">
      <Text fontSize="$4" fontWeight="500">Composed Avatar Usage</Text>
      <XStack space="$4" alignItems="center">
        <YStack alignItems="center" space="$2">
          <Avatar size="lg">
            <AvatarFallback color="primary">
              <AvatarFallbackText size="lg">JD</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">John Doe</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar size="lg" gradient="brand">
            <AvatarFallback color="emerald">
              <AvatarFallbackText size="lg">SA</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Sarah Anderson</Text>
        </YStack>

        <YStack alignItems="center" space="$2">
          <Avatar size="lg" gradient="sunset">
            <AvatarFallback color="warning">
              <AvatarFallbackText size="lg">MJ</AvatarFallbackText>
            </AvatarFallback>
          </Avatar>
          <Text fontSize="$3">Mike Johnson</Text>
        </YStack>
      </XStack>
    </YStack>
  ),
};

export const UsageExamples: Story = {
  name: 'Usage Examples',
  render: () => (
    <YStack space="$6" padding="$4">
      <YStack space="$3">
        <Text fontSize="$5" fontWeight="600">Team Member List</Text>
        <YStack space="$3">
          {[
            { name: 'John Doe', role: 'Frontend Developer', status: 'online' as const, initials: 'JD', color: 'primary' as const },
            { name: 'Sarah Anderson', role: 'Backend Developer', status: 'busy' as const, initials: 'SA', color: 'success' as const },
            { name: 'Mike Johnson', role: 'UI Designer', status: 'away' as const, initials: 'MJ', color: 'warning' as const },
            { name: 'Lisa Chen', role: 'Product Manager', status: 'offline' as const, initials: 'LC', color: 'purple' as const },
          ].map((member, index) => (
            <XStack key={index} space="$3" alignItems="center">
              <StatusAvatar>
                <Avatar size="md">
                  <AvatarFallback color={member.color}>
                    <AvatarFallbackText size="md">{member.initials}</AvatarFallbackText>
                  </AvatarFallback>
                </Avatar>
                <StatusIndicator size="md" status={member.status} />
              </StatusAvatar>
              <YStack>
                <Text fontSize="$4" fontWeight="500">{member.name}</Text>
                <Text fontSize="$3" color="$mutedForeground">{member.role}</Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
      
      <YStack space="$3">
        <Text fontSize="$5" fontWeight="600">Project Collaborators</Text>
        <XStack space="$2" alignItems="center">
          <AvatarGroup spacing="tight">
            <Avatar size="sm">
              <AvatarFallback color="primary">
                <AvatarFallbackText size="sm">A</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback color="success">
                <AvatarFallbackText size="sm">B</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback color="warning">
                <AvatarFallbackText size="sm">C</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback color="purple">
                <AvatarFallbackText size="sm">D</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>
                <AvatarFallbackText size="sm">+5</AvatarFallbackText>
              </AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <Text fontSize="$4" marginLeft="$2">9 collaborators</Text>
        </XStack>
      </YStack>
    </YStack>
  ),
};