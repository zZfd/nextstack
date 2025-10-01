import * as SliderPrimitives from '@rn-primitives/slider';
import * as React from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils';

const SliderNative = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitives.Root>,
  { className: string; value: number; disabled?: boolean }
>(({ className, value = 0, ...props }, ref) => {
  const offset = useSharedValue<number>(value);
  const pressed = useSharedValue<boolean>(false);
  const width = useSharedValue<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
  };
  const pan = Gesture.Pan()
    .onBegin(event => {
      pressed.value = true;
      offset.value = clamp(event.x, 0, width.value);
    })
    .onChange(event => {
      offset.value = clamp(event.x, 0, width.value);
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  return (
    <SliderPrimitives.Root
      className={cn('h-2 w-full mx-[12px]', className)}
      ref={ref}
      value={value}
      {...props}
    >
      <View onLayout={onLayout}>
        <GestureDetector gesture={pan}>
          <SliderPrimitives.Track className='relative h-2 w-full bg-primary/20 rounded-full'>
            <SliderRange offset={offset} />
            <SliderThumb offset={offset} />
          </SliderPrimitives.Track>
        </GestureDetector>
      </View>
    </SliderPrimitives.Root>
  );
});

SliderNative.displayName = 'SliderNative';

const Slider = Platform.select({
  default: SliderNative,
});

export { Slider };

// Platform-specific Range component
const SliderRange = Platform.select({
  web: WebRange,
  default: NativeRange,
});

// Platform-specific Thumb component
const SliderThumb = Platform.select({
  web: WebThumb,
  default: NativeThumb,
});

type RangeProps = {
  offset: Animated.SharedValue<number>;
};

type ThumbProps = {
  offset: Animated.SharedValue<number>;
};

const THUMB_SIZE = 20; // h-5 w-5 = 20px

function WebRange({ offset }: RangeProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View
      className='h-full rounded-l-full bg-primary'
      style={{ width: offset.value }}
    >
      <SliderPrimitives.Range className='h-full w-full' />
    </View>
  );
}

function NativeRange({ offset }: RangeProps) {
  if (Platform.OS === 'web') {
    return null;
  }

  const animatedRangeStyles = useAnimatedStyle(() => ({
    width: offset.value,
  }));

  return (
    <SliderPrimitives.Range asChild>
      <Animated.View
        className='h-full rounded-l-full bg-primary'
        style={animatedRangeStyles}
      />
    </SliderPrimitives.Range>
  );
}

function WebThumb({ offset }: ThumbProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View
      className='absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-background border-primary border-2 rounded-full cursor-grab shadow-sm'
      style={{ left: offset.value - THUMB_SIZE / 2 }}
    >
      <SliderPrimitives.Thumb className='h-full w-full' />
    </View>
  );
}

function NativeThumb({ offset }: ThumbProps) {
  if (Platform.OS === 'web') {
    return null;
  }

  const animatedThumbStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value - THUMB_SIZE / 2,
      },
      {
        translateY: -THUMB_SIZE / 2,
      },
    ],
  }));

  return (
    <SliderPrimitives.Thumb asChild>
      <Animated.View
        className='absolute top-1/2 h-5 w-5 bg-background border-primary border-2 rounded-full shadow-sm'
        style={animatedThumbStyles}
      />
    </SliderPrimitives.Thumb>
  );
}
