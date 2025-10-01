import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import {
  tooltipOverlayVariants,
  tooltipContentVariants,
} from './tooltip-variants';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Root;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipOverlay = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <TooltipPrimitive.Overlay
      className={cn(tooltipOverlayVariants(), className)}
      style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      {...props}
      ref={ref}
    />
  );
});
TooltipOverlay.displayName = 'TooltipOverlay';

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
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
      <TooltipPrimitive.Content
        ref={ref}
        className={cn(tooltipContentVariants(), className)}
        {...props}
      />
    );

    return (
      <TooltipPortal hostName={portalHost}>
        {overlay ? (
          <TooltipOverlay className={overlayClassName}>
            {content}
          </TooltipOverlay>
        ) : (
          content
        )}
      </TooltipPortal>
    );
  }
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipContent,
  TooltipOverlay,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
};
