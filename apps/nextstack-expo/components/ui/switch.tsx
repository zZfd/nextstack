import * as SwitchPrimitive from '@rn-primitives/switch';
import * as React from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils';

const ANIMATION_DURATION = 200;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Use shared value for animation progress
  const progress = useSharedValue(props.checked ? 1 : 0);

  // Update progress when checked changes
  React.useEffect(() => {
    progress.value = withTiming(props.checked ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [props.checked, progress]);

  // Animate thumb translation (only for native)
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    if (Platform.OS === 'web') return {}; // Let CSS handle web animations

    // Translation distance: 46 - 22 - 2 = 22px
    const translateX = progress.value * 22;

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'web:peer h-6 w-11 native:h-[26] native:w-[46] shrink-0 rounded-full border-2 border-transparent web:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:focus-visible:ring-offset-background',
        props.checked ? 'bg-primary' : 'bg-input',
        className
      )}
      {...props}
    >
      {Platform.OS === 'web' ? (
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
          )}
        />
      ) : (
        <View style={{ width: 46, height: 26 }}>
          <Animated.View style={[thumbAnimatedStyle, { position: 'absolute' }]}>
            <SwitchPrimitive.Thumb
              className={cn(
                'pointer-events-none block h-[22] w-[22] rounded-full bg-background shadow-lg ring-0'
              )}
            />
          </Animated.View>
        </View>
      )}
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
