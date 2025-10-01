import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

/**
 * Skeleton Example
 *
 * This demonstrates how to use the skeleton component in your React Native app.
 *
 * The Skeleton component is used to display a placeholder while content is loading.
 * It provides a better user experience by showing the layout structure before actual content loads.
 */

export function SkeletonExample() {
  return (
    <View className='flex-1 gap-6 p-4'>
      <View>
        <Text className='mb-4 text-lg font-semibold'>Basic Skeleton</Text>
        <View className='flex-row items-center gap-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <View className='flex-1 gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
          </View>
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Card Skeleton</Text>
        <View className='w-full max-w-md gap-4 rounded-lg border border-border p-4'>
          <Skeleton className='h-32 w-full rounded-md' />
          <View className='gap-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </View>
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>List Skeleton</Text>
        <View className='w-full max-w-md gap-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} className='flex-row items-center gap-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <View className='flex-1 gap-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Article Skeleton</Text>
        <View className='w-full max-w-md gap-4'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-48 w-full rounded-md' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Profile Skeleton</Text>
        <View className='w-full max-w-md gap-4 rounded-lg border border-border p-4'>
          <View className='flex-row items-center gap-4'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <View className='flex-1 gap-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-4 w-24' />
            </View>
          </View>
          <View className='gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </View>
        </View>
      </View>

      <View>
        <Text className='mb-4 text-lg font-semibold'>Custom Sizing</Text>
        <View className='w-full max-w-md gap-3'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-3 w-full' />
        </View>
      </View>
    </View>
  );
}
