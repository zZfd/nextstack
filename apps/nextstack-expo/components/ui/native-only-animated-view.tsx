import * as React from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

/**
 * Native-only animated view component
 * On web, renders as a regular View
 * On native platforms, renders as an Animated.View
 */
export function NativeOnlyAnimatedView(props: AnimatedProps<ViewProps>) {
  if (Platform.OS === 'web') {
    // Extract only View-compatible props for web by filtering out Reanimated-specific props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { entering, exiting, layout, animatedProps, ...viewProps } =
      props as AnimatedProps<ViewProps> & {
        entering?: unknown;
        exiting?: unknown;
        layout?: unknown;
        animatedProps?: unknown;
      };
    return <View {...(viewProps as ViewProps)} />;
  }

  return <Animated.View {...props} />;
}
