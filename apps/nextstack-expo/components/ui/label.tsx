import * as React from 'react';

import { Text } from './text';

import { cn } from '@/lib/utils';

export type LabelProps = React.ComponentPropsWithoutRef<typeof Text>;

const Label = React.forwardRef<React.ElementRef<typeof Text>, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          'text-sm native:text-sm font-medium leading-5 text-[#2d2d2d] tracking-[-0.15px]',
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export { Label };
