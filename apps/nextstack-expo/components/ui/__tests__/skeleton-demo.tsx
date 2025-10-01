import * as React from 'react';
import { View } from 'react-native';

import { Skeleton } from '../skeleton';

/**
 * Demo component to showcase skeleton usage
 * This is not a real test, just a usage example
 */
export function SkeletonDemo() {
  return (
    <View className='flex-row items-center gap-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <View className='flex-1 gap-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-4/5' />
      </View>
    </View>
  );
}

/**
 * Demo with card skeleton
 */
export function SkeletonCardDemo() {
  return (
    <View className='w-full max-w-md gap-4 rounded-lg border border-border p-4'>
      <View className='gap-2'>
        <Skeleton className='h-32 w-full rounded-md' />
      </View>
      <View className='gap-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </View>
    </View>
  );
}

/**
 * Demo with list skeleton
 */
export function SkeletonListDemo() {
  return (
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
  );
}
