import * as SliderPrimitives from '@rn-primitives/slider';
import * as React from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils';

interface SliderNativeProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderPrimitives.Root>,
    'value' | 'onValueChange'
  > {
  className?: string;
  value?: number;
  onValueChange?: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
  disabled?: boolean;
}

const SliderNative = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitives.Root>,
  SliderNativeProps
>(
  (
    {
      className,
      value = 0,
      onValueChange,
      max = 100,
      min = 0,
      step = 1,
      disabled,
      ...props
    },
    ref
  ) => {
    const offset = useSharedValue<number>(0);
    const pressed = useSharedValue<boolean>(false);
    const width = useSharedValue<number>(0);
    const previousValue = React.useRef<number>(value);

    // Helper function to calculate offset from value
    const calculateOffset = React.useCallback(
      (val: number, trackWidth: number) => {
        if (trackWidth === 0) return 0;
        const percentage = (val - min) / (max - min);
        return clamp(percentage * trackWidth, 0, trackWidth);
      },
      [max, min]
    );

    // Sync offset when value or width changes
    React.useEffect(() => {
      if (width.value > 0) {
        offset.value = calculateOffset(value, width.value);
      }
    }, [value, calculateOffset]);

    // Callback wrapper that can be called from worklet
    const handleValueChange = React.useCallback(
      (newValue: number) => {
        if (
          onValueChange &&
          Math.abs(newValue - previousValue.current) >= step
        ) {
          previousValue.current = newValue;
          onValueChange([newValue]);
        }
      },
      [onValueChange, step]
    );

    const onLayout = (event: LayoutChangeEvent) => {
      const newWidth = event.nativeEvent.layout.width;
      width.value = newWidth;
      // Initialize offset based on current value
      offset.value = calculateOffset(value, newWidth);
    };

    const pan = Gesture.Pan()
      .onBegin(event => {
        'worklet';
        pressed.value = true;
        const clampedOffset = clamp(event.x, 0, width.value);
        offset.value = clampedOffset;

        // Calculate value from offset (worklet-safe)
        if (width.value > 0) {
          const percentage = clamp(clampedOffset / width.value, 0, 1);
          const rawValue = percentage * (max - min) + min;
          const steppedValue = Math.round(rawValue / step) * step;
          const newValue = Math.max(min, Math.min(max, steppedValue));

          runOnJS(handleValueChange)(newValue);
        }
      })
      .onChange(event => {
        'worklet';
        const clampedOffset = clamp(event.x, 0, width.value);
        offset.value = clampedOffset;

        // Calculate value from offset (worklet-safe)
        if (width.value > 0) {
          const percentage = clamp(clampedOffset / width.value, 0, 1);
          const rawValue = percentage * (max - min) + min;
          const steppedValue = Math.round(rawValue / step) * step;
          const newValue = Math.max(min, Math.min(max, steppedValue));

          runOnJS(handleValueChange)(newValue);
        }
      })
      .onFinalize(() => {
        'worklet';
        pressed.value = false;
      });

    return (
      <SliderPrimitives.Root
        className={cn('h-2 w-full mx-[12px]', className)}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
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
  }
);

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
