import * as AccordionPrimitive from '@rn-primitives/accordion';
import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

import {
  accordionItemVariants,
  accordionHeaderVariants,
  accordionTriggerVariants,
  accordionTriggerTextVariants,
  accordionContentVariants,
  accordionContentTextVariants,
} from './accordion-variants';
import { TextClassContext } from './text';

import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants(), className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header
    ref={ref}
    className={cn(accordionHeaderVariants(), className)}
    {...props}
  />
));
AccordionHeader.displayName = 'AccordionHeader';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { value } = AccordionPrimitive.useItemContext();
  const { value: rootValue } = AccordionPrimitive.useRootContext();
  const isExpanded = Array.isArray(rootValue)
    ? rootValue.includes(value)
    : rootValue === value;

  return (
    <AccordionPrimitive.Header className={cn(accordionHeaderVariants())}>
      <TextClassContext.Provider value={accordionTriggerTextVariants()}>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(accordionTriggerVariants(), className)}
          {...props}
        >
          <>{children}</>
          <ChevronDown
            size={16}
            className={cn(
              'text-muted-foreground web:transition-transform web:duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </AccordionPrimitive.Trigger>
      </TextClassContext.Provider>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(accordionContentVariants(), className)}
      {...props}
    >
      <TextClassContext.Provider value={accordionContentTextVariants()}>
        <View className={cn(accordionContentTextVariants())}>{children}</View>
      </TextClassContext.Provider>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
};
