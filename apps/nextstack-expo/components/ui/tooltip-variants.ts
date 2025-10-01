import { cva } from 'class-variance-authority';

export const tooltipOverlayVariants = cva(
  'absolute inset-0 z-50 bg-black/80 web:animate-in web:fade-in-0',
);

export const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md web:duration-200 web:animate-in web:fade-in-0 web:zoom-in-95',
);
