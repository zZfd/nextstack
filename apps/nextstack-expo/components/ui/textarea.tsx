import * as React from 'react';
import { TextInput, type NativeSyntheticEvent, type TextInputFocusEventData } from 'react-native';

import { cn } from '@/lib/utils';

export type TextareaProps = React.ComponentPropsWithoutRef<typeof TextInput>;

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ className, placeholderClassName, editable = true, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = React.useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = React.useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    return (
      <TextInput
        ref={ref}
        className={cn(
          'min-h-[80px] rounded-lg border border-input-border bg-white px-4 py-3 text-sm text-input-text tracking-[-0.15px]',
          'web:flex web:w-full',
          'placeholder:text-input-placeholder',
          'web:focus:outline-none web:focus:ring-0 web:focus:border-primary',
          isFocused && 'native:border-primary',
          editable === false && 'opacity-50',
          className
        )}
        placeholderTextColor='hsl(var(--input-placeholder))'
        placeholderClassName={placeholderClassName}
        editable={editable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline
        textAlignVertical="top"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
