import * as React from 'react';
import { TextInput } from 'react-native';

import { cn } from '@/lib/utils';

export type InputProps = React.ComponentPropsWithoutRef<typeof TextInput>;

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'web:flex h-12 native:h-12 rounded-lg border-0 bg-[#f8f8f8] px-4 web:py-2 text-base native:text-base text-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-[#717171] web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        placeholderTextColor='#717171'
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
