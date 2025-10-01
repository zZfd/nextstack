import * as React from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

type SkeletonProps = React.ComponentPropsWithoutRef<typeof View>;

const Skeleton = React.forwardRef<React.ElementRef<typeof View>, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('rounded-md bg-muted', className)} {...props} />
  ),
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
