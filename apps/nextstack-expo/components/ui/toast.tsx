import * as ToastPrimitive from '@rn-primitives/toast';
import { type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Platform } from 'react-native';

import { TextClassContext } from './text';
import {
  toastVariants,
  toastActionVariants,
  toastCloseVariants,
  toastTitleVariants,
  toastDescriptionVariants,
} from './toast-variants';

import { cn } from '@/lib/utils';

const ToastProvider = React.Fragment;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<typeof React.Fragment>
>(({ ...props }, _ref) => <React.Fragment {...props} />);
ToastViewport.displayName = 'ToastViewport';

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(toastActionVariants(), className)}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(toastCloseVariants(), className)}
    {...props}
  >
    <X size={Platform.OS === 'web' ? 16 : 18} className='text-foreground' />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value={cn(toastTitleVariants(), className)}>
    <ToastPrimitive.Title ref={ref} {...props} />
  </TextClassContext.Provider>
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value={cn(toastDescriptionVariants(), className)}>
    <ToastPrimitive.Description ref={ref} {...props} />
  </TextClassContext.Provider>
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
