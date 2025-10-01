import { cva } from 'class-variance-authority';

export const accordionItemVariants = cva('border-b border-border');

export const accordionHeaderVariants = cva('flex');

export const accordionTriggerVariants = cva(
  'flex flex-1 flex-row items-center justify-between py-4 text-sm font-medium web:transition-all web:hover:underline'
);

export const accordionTriggerTextVariants = cva('text-foreground');

export const accordionContentVariants = cva(
  'overflow-hidden text-sm web:transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
);

export const accordionContentTextVariants = cva(
  'pb-4 pt-0 text-muted-foreground'
);
