import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import {
  CheckCircle,
  Heart,
  Star,
  Settings,
  User,
  Mail,
  Calendar,
  Home,
  Plus,
  X,
} from '@tamagui/lucide-icons';
import { XStack, YStack } from 'tamagui';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'General/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'color' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    children: <CheckCircle />,
  },
};

export const Sizes: Story = {
  render: () => (
    <XStack alignItems='center' gap='$4'>
      <Icon size='xs'>
        <Star />
      </Icon>
      <Icon size='sm'>
        <Star />
      </Icon>
      <Icon size='md'>
        <Star />
      </Icon>
      <Icon size='lg'>
        <Star />
      </Icon>
      <Icon size='xl'>
        <Star />
      </Icon>
    </XStack>
  ),
};

export const Colors: Story = {
  render: () => (
    <XStack alignItems='center' gap='$4'>
      <Icon color='$gray9'>
        <Heart />
      </Icon>
      <Icon color='$green9'>
        <Heart />
      </Icon>
      <Icon color='$blue9'>
        <Heart />
      </Icon>
      <Icon color='$red9'>
        <Heart />
      </Icon>
      <Icon color='$orange9'>
        <Heart />
      </Icon>
    </XStack>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <XStack alignItems='center' gap='$4'>
      <Icon
        size='lg'
        backgroundColor='$green2'
        borderRadius='$2'
        padding='$2'
        color='$green9'
      >
        <CheckCircle />
      </Icon>
      <Icon
        size='lg'
        backgroundColor='$blue2'
        borderRadius='$6'
        padding='$2'
        color='$blue9'
      >
        <Settings />
      </Icon>
      <Icon
        size='lg'
        backgroundColor='$red2'
        borderRadius='$2'
        padding='$2'
        color='$red9'
      >
        <X />
      </Icon>
    </XStack>
  ),
};

export const IconVariety: Story = {
  render: () => (
    <YStack flexWrap='wrap' maxWidth={300}>
      <XStack gap='$4' flexWrap='wrap'>
        <Icon size='lg' color='$green9'>
          <CheckCircle />
        </Icon>
        <Icon size='lg' color='$red9'>
          <Heart />
        </Icon>
        <Icon size='lg' color='$blue9'>
          <Star />
        </Icon>
        <Icon size='lg' color='$gray9'>
          <Settings />
        </Icon>
        <Icon size='lg' color='$purple9'>
          <User />
        </Icon>
      </XStack>
      <XStack gap='$4' flexWrap='wrap'>
        <Icon size='lg' color='$orange9'>
          <Mail />
        </Icon>
        <Icon size='lg' color='$teal9'>
          <Calendar />
        </Icon>
        <Icon size='lg' color='$green9'>
          <Home />
        </Icon>
        <Icon size='lg' color='$blue9'>
          <Plus />
        </Icon>
        <Icon size='lg' color='$red9'>
          <X />
        </Icon>
      </XStack>
    </YStack>
  ),
};
