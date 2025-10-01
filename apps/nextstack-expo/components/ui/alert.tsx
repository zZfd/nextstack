import { type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

import {
  alertVariants,
  alertIconVariants,
  alertTitleVariants,
  alertDescriptionVariants,
} from './alert-variants';
import { Icon } from './icon';
import { TextClassContext } from './text';

import { cn } from '@/lib/utils';

const AlertContext = React.createContext<{
  variant?: VariantProps<typeof alertVariants>['variant'];
}>({});

type AlertProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertVariants> & {
    icon?: LucideIcon;
  };

const Alert = React.forwardRef<React.ElementRef<typeof View>, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <AlertContext.Provider value={{ variant }}>
      <View
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <Icon
            as={icon}
            className={cn(alertIconVariants({ variant }))}
            size={20}
          />
        )}
        <View className='flex-1 flex-col gap-1'>{children}</View>
      </View>
    </AlertContext.Provider>
  )
);
Alert.displayName = 'Alert';

type AlertTitleProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertTitleVariants>;

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  AlertTitleProps
>(({ className, variant, ...props }, ref) => {
  const context = React.useContext(AlertContext);
  const effectiveVariant = variant ?? context.variant;

  return (
    <TextClassContext.Provider
      value={cn(alertTitleVariants({ variant: effectiveVariant }), className)}
    >
      <View ref={ref} {...props} />
    </TextClassContext.Provider>
  );
});
AlertTitle.displayName = 'AlertTitle';

type AlertDescriptionProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertDescriptionVariants>;

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  AlertDescriptionProps
>(({ className, variant, ...props }, ref) => {
  const context = React.useContext(AlertContext);
  const effectiveVariant = variant ?? context.variant;

  return (
    <TextClassContext.Provider
      value={cn(
        alertDescriptionVariants({ variant: effectiveVariant }),
        className
      )}
    >
      <View ref={ref} {...props} />
    </TextClassContext.Provider>
  );
});
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps, AlertTitleProps, AlertDescriptionProps };
