import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';

import { badgeVariants, badgeTextVariants } from './badge-variants';
import { TextClassContext } from './text';

import { cn } from '@/lib/utils';

type BadgeProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof badgeVariants>;

const Badge = React.forwardRef<React.ElementRef<typeof View>, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <TextClassContext.Provider value={cn(badgeTextVariants({ variant }))}>
      <View
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  )
);
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
