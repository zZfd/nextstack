import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';

import { alertVariants, alertTitleVariants, alertDescriptionVariants } from './alert-variants';
import { TextClassContext } from './text';

import { cn } from '@/lib/utils';

type AlertProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertVariants>;

const Alert = React.forwardRef<React.ElementRef<typeof View>, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <View
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

type AlertTitleProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertTitleVariants>;

const AlertTitle = React.forwardRef<React.ElementRef<typeof View>, AlertTitleProps>(
  ({ className, variant, ...props }, ref) => (
    <TextClassContext.Provider value={cn(alertTitleVariants({ variant }), className)}>
      <View ref={ref} {...props} />
    </TextClassContext.Provider>
  ),
);
AlertTitle.displayName = 'AlertTitle';

type AlertDescriptionProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertDescriptionVariants>;

const AlertDescription = React.forwardRef<React.ElementRef<typeof View>, AlertDescriptionProps>(
  ({ className, variant, ...props }, ref) => (
    <TextClassContext.Provider value={cn(alertDescriptionVariants({ variant }), className)}>
      <View ref={ref} {...props} />
    </TextClassContext.Provider>
  ),
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps, AlertTitleProps, AlertDescriptionProps };
