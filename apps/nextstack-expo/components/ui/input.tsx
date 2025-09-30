import * as React from 'react';
import { TextInput } from 'react-native';

import { cn } from '@/lib/utils';

export type InputProps = React.ComponentPropsWithoutRef<typeof TextInput>;

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderClassName, editable = true, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-12 rounded-lg border border-[rgba(0,0,0,0.1)] bg-white px-4 text-sm text-[#2d2d2d] tracking-[-0.15px]',
          'web:flex web:w-full web:py-2',
          'placeholder:text-[#717171]',
          editable === false && 'opacity-50',
          className
        )}
        placeholderTextColor='#717171'
        placeholderClassName={placeholderClassName}
        editable={editable}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
