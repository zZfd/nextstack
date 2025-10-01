/**
 * Progress Component Usage Examples
 *
 * This file demonstrates various ways to use the Progress component
 * in your React Native Expo application.
 */

import * as React from 'react';
import { View, ScrollView } from 'react-native';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';

/**
 * Example 1: Basic Progress Bar
 */
export function BasicProgressExample() {
  return (
    <View className='gap-2 p-4'>
      <Text className='text-sm font-medium'>Basic Progress</Text>
      <Progress value={60} max={100} />
    </View>
  );
}

/**
 * Example 2: Animated Progress with Timer
 */
export function AnimatedProgressExample() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <View className='gap-2 p-4'>
      <Text className='text-sm font-medium'>
        Animated Progress: {progress}%
      </Text>
      <Progress value={progress} max={100} />
    </View>
  );
}

/**
 * Example 3: File Upload Progress Simulator
 */
export function FileUploadProgressExample() {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <View className='gap-4 p-4'>
      <Text className='text-sm font-medium'>File Upload Simulation</Text>
      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm text-muted-foreground'>
            {isUploading
              ? 'Uploading...'
              : uploadProgress === 100
                ? 'Complete!'
                : 'Ready to upload'}
          </Text>
          <Text className='text-sm font-medium'>{uploadProgress}%</Text>
        </View>
        <Progress value={uploadProgress} max={100} />
      </View>
      <Button onPress={simulateUpload} disabled={isUploading}>
        <Text>{isUploading ? 'Uploading...' : 'Start Upload'}</Text>
      </Button>
    </View>
  );
}

/**
 * Example 4: Multiple Progress Bars
 */
export function MultipleProgressBarsExample() {
  return (
    <ScrollView className='gap-4 p-4'>
      <Text className='text-lg font-semibold'>Task Progress Overview</Text>

      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm'>Design Phase</Text>
          <Text className='text-sm font-medium'>100%</Text>
        </View>
        <Progress value={100} max={100} />
      </View>

      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm'>Development</Text>
          <Text className='text-sm font-medium'>75%</Text>
        </View>
        <Progress value={75} max={100} />
      </View>

      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm'>Testing</Text>
          <Text className='text-sm font-medium'>40%</Text>
        </View>
        <Progress value={40} max={100} />
      </View>

      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm'>Deployment</Text>
          <Text className='text-sm font-medium'>0%</Text>
        </View>
        <Progress value={0} max={100} />
      </View>
    </ScrollView>
  );
}

/**
 * Example 5: Custom Max Value
 */
export function CustomMaxValueExample() {
  const [current, setCurrent] = React.useState(5);
  const max = 20;

  return (
    <View className='gap-4 p-4'>
      <Text className='text-sm font-medium'>Download Progress</Text>
      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm text-muted-foreground'>
            {current} / {max} files downloaded
          </Text>
          <Text className='text-sm font-medium'>
            {Math.round((current / max) * 100)}%
          </Text>
        </View>
        <Progress value={current} max={max} />
      </View>
      <View className='flex-row gap-2'>
        <Button
          onPress={() => setCurrent(prev => Math.max(0, prev - 1))}
          className='flex-1'
        >
          <Text>-</Text>
        </Button>
        <Button
          onPress={() => setCurrent(prev => Math.min(max, prev + 1))}
          className='flex-1'
        >
          <Text>+</Text>
        </Button>
      </View>
    </View>
  );
}

/**
 * Example 6: Custom Styled Progress Bar
 */
export function CustomStyledProgressExample() {
  return (
    <View className='gap-4 p-4'>
      <Text className='text-sm font-medium'>Custom Styles</Text>

      {/* Default styling */}
      <View className='gap-2'>
        <Text className='text-xs text-muted-foreground'>Default</Text>
        <Progress value={60} max={100} />
      </View>

      {/* Taller progress bar */}
      <View className='gap-2'>
        <Text className='text-xs text-muted-foreground'>Tall</Text>
        <Progress value={60} max={100} className='h-6' />
      </View>

      {/* Smaller progress bar */}
      <View className='gap-2'>
        <Text className='text-xs text-muted-foreground'>Thin</Text>
        <Progress value={60} max={100} className='h-2' />
      </View>

      {/* Custom border radius */}
      <View className='gap-2'>
        <Text className='text-xs text-muted-foreground'>Square edges</Text>
        <Progress value={60} max={100} className='rounded-none' />
      </View>
    </View>
  );
}
