import * as SliderPrimitive from '@rn-primitives/slider';
import * as React from 'react';
import { Platform, type GestureResponderEvent } from 'react-native';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value: controlledValue, onValueChange, min = 0, max = 100, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(controlledValue ?? 50);
  const trackRef = React.useRef<React.ElementRef<typeof SliderPrimitive.Track>>(null);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: number[]) => {
      const nextValue = newValue[0];
      if (typeof nextValue !== 'number') return;

      setInternalValue(nextValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  // Mobile gesture handling for native platforms
  const handleTrackPress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (Platform.OS === 'web') return;

      // @ts-expect-error - measure is available but not in types
      trackRef.current?.measure((x: number, y: number, width: number) => {
        const { locationX } = event.nativeEvent;
        const percentage = Math.max(0, Math.min(100, (locationX / width) * 100));
        const newValue = min + (percentage / 100) * (max - min);
        handleValueChange([newValue]);
      });
    },
    [min, max, handleValueChange]
  );

  // Calculate percentage for thumb positioning
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center web:cursor-pointer disabled:opacity-50',
        className
      )}
      value={value}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track
        ref={trackRef}
        onStartShouldSetResponder={() => Platform.OS !== 'web'}
        onResponderGrant={handleTrackPress}
        className='relative h-2 w-full grow overflow-hidden rounded-full bg-secondary'
      >
        <SliderPrimitive.Range
          className='absolute h-full bg-primary'
          style={{ width: `${percentage}%` }}
        />
        <SliderPrimitive.Thumb
          className='absolute block h-5 w-5 -translate-x-1/2 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:pointer-events-none'
          style={{ left: `${percentage}%` }}
        />
      </SliderPrimitive.Track>
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
