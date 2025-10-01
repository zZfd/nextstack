import { View } from 'react-native';

import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

/**
 * Separator Example
 *
 * This demonstrates how to use the separator component in your React Native app.
 *
 * The Separator component is used to visually separate content in an interface.
 * It can be oriented horizontally or vertically.
 */

export function SeparatorExample() {
  return (
    <View className='flex-1 gap-6 p-4'>
      <View>
        <Text className='mb-4 text-lg font-semibold'>Horizontal Separator</Text>
        <View className='w-full max-w-md'>
          <View className='p-4'>
            <Text className='text-sm font-medium'>Radix Primitives</Text>
            <Text className='text-sm text-muted-foreground'>
              An open-source UI component library.
            </Text>
          </View>
          <Separator />
          <View className='p-4'>
            <Text className='text-sm font-medium'>React Native</Text>
            <Text className='text-sm text-muted-foreground'>
              A framework for building native apps using React.
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Vertical Separator</Text>
        <View className='flex-row items-center p-4'>
          <Text className='text-sm'>Home</Text>
          <Separator orientation='vertical' className='mx-4 h-4' />
          <Text className='text-sm'>About</Text>
          <Separator orientation='vertical' className='mx-4 h-4' />
          <Text className='text-sm'>Contact</Text>
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Mixed Usage</Text>
        <View className='w-full max-w-md rounded-lg border border-border p-4'>
          <View className='mb-2'>
            <Text className='text-sm font-medium'>Settings</Text>
          </View>
          <Separator className='mb-2' />
          <View className='flex-row items-center justify-between py-2'>
            <Text className='text-sm'>Profile</Text>
            <Text className='text-sm text-muted-foreground'>Edit</Text>
          </View>
          <Separator className='my-2' />
          <View className='flex-row items-center justify-between py-2'>
            <Text className='text-sm'>Security</Text>
            <Text className='text-sm text-muted-foreground'>Manage</Text>
          </View>
          <Separator className='my-2' />
          <View className='flex-row items-center justify-between py-2'>
            <Text className='text-sm'>Notifications</Text>
            <Text className='text-sm text-muted-foreground'>Configure</Text>
          </View>
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Custom Styling</Text>
        <View className='w-full max-w-md'>
          <Text className='text-sm'>Section 1</Text>
          <Separator className='my-4 bg-primary' />
          <Text className='text-sm'>Section 2</Text>
          <Separator className='my-4 h-0.5 bg-destructive' />
          <Text className='text-sm'>Section 3</Text>
        </View>
      </View>
    </View>
  );
}
