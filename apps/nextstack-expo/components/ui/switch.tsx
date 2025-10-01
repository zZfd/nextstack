import * as SwitchPrimitive from '@rn-primitives/switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'web:peer h-6 w-11 native:h-[26] native:w-[46] shrink-0 rounded-full border-2 border-transparent web:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:focus-visible:ring-offset-background',
      props.checked ? 'bg-primary' : 'bg-input',
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 native:h-[22] native:w-[22] rounded-full bg-background shadow-lg ring-0 transition-transform web:data-[state=checked]:translate-x-5 web:data-[state=unchecked]:translate-x-0 native:data-[state=checked]:translate-x-5 native:data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitive.Root>
));

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
