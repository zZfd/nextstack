import * as TabsPrimitive from '@rn-primitives/tabs';
import type { ListRef, TriggerRef, ContentRef } from '@rn-primitives/tabs';
import * as React from 'react';

import { TextClassContext } from './text';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  ListRef,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex-row items-center justify-center rounded-md bg-muted p-1',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  TriggerRef,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { value: rootValue } = TabsPrimitive.useRootContext();
  const isActive = props.value === rootValue;

  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm font-medium web:transition-all',
        props.disabled && 'web:pointer-events-none opacity-50',
        isActive ? 'text-foreground' : 'text-muted-foreground'
      )}
    >
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'group inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 web:transition-all',
          'web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive && 'bg-white',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  ContentRef,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
