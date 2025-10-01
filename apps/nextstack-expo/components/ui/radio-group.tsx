import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Circle } from 'lucide-react-native';
import * as React from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn('web:grid gap-2', className)}
      {...props}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'h-4 w-4 native:h-[20] native:w-[20] aspect-square rounded-full border border-primary web:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn('items-center justify-center h-full w-full')}
      >
        <Circle
          size={10}
          strokeWidth={0}
          fill='currentColor'
          className='text-primary'
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
