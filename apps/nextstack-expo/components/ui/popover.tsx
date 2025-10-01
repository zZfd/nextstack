import * as PopoverPrimitive from '@rn-primitives/popover';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import {
  popoverOverlayVariants,
  popoverContentVariants,
} from './popover-variants';

import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverClose = PopoverPrimitive.Close;

const PopoverOverlay = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Overlay
      className={cn(popoverOverlayVariants(), className)}
      style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      {...props}
      ref={ref}
    />
  );
});
PopoverOverlay.displayName = 'PopoverOverlay';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    portalHost?: string;
    overlay?: boolean;
    overlayClassName?: string;
  }
>(
  (
    { className, portalHost, overlay = false, overlayClassName, ...props },
    ref
  ) => {
    const content = (
      <PopoverPrimitive.Content
        ref={ref}
        className={cn(popoverContentVariants(), className)}
        {...props}
      />
    );

    return (
      <PopoverPortal hostName={portalHost}>
        {overlay ? (
          <PopoverOverlay className={overlayClassName}>
            {content}
          </PopoverOverlay>
        ) : (
          content
        )}
      </PopoverPortal>
    );
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverPortal,
  PopoverOverlay,
};
