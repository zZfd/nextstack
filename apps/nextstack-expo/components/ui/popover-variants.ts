import { cva } from 'class-variance-authority';

export const popoverOverlayVariants = cva(
  'absolute inset-0 z-50 flex items-center justify-center bg-black/80 web:animate-in web:fade-in-0'
);

export const popoverContentVariants = cva(
  'z-50 w-72 rounded-md border border-border bg-popover p-4 shadow-md outline-none web:duration-200 web:animate-in web:fade-in-0 web:zoom-in-95'
);
