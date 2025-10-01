import * as React from 'react';
import { View } from 'react-native';

import { Separator } from '../separator';
import { Text } from '../text';

/**
 * Demo component to showcase separator usage
 * This is not a real test, just a usage example
 */
export function SeparatorDemo() {
  return (
    <View className='w-full max-w-md'>
      <View className='p-4'>
        <Text className='text-sm font-medium'>Radix Primitives</Text>
        <Text className='text-sm text-muted-foreground'>
          An open-source UI component library.
        </Text>
      </View>
      <Separator />
      <View className='flex-row items-center p-4'>
        <Text className='text-sm'>Blog</Text>
        <Separator orientation='vertical' className='mx-2 h-4' />
        <Text className='text-sm'>Docs</Text>
        <Separator orientation='vertical' className='mx-2 h-4' />
        <Text className='text-sm'>Source</Text>
      </View>
    </View>
  );
}

/**
 * Demo with horizontal separator
 */
export function HorizontalSeparatorDemo() {
  return (
    <View className='w-full max-w-md gap-4'>
      <View>
        <Text className='text-sm font-medium'>Section 1</Text>
        <Text className='text-sm text-muted-foreground'>
          Content for section 1
        </Text>
      </View>
      <Separator />
      <View>
        <Text className='text-sm font-medium'>Section 2</Text>
        <Text className='text-sm text-muted-foreground'>
          Content for section 2
        </Text>
      </View>
    </View>
  );
}

/**
 * Demo with vertical separator
 */
export function VerticalSeparatorDemo() {
  return (
    <View className='flex-row items-center gap-4 p-4'>
      <Text className='text-sm'>Item 1</Text>
      <Separator orientation='vertical' className='h-4' />
      <Text className='text-sm'>Item 2</Text>
      <Separator orientation='vertical' className='h-4' />
      <Text className='text-sm'>Item 3</Text>
    </View>
  );
}
