import { cva } from 'class-variance-authority';

export const dropdownMenuOverlayVariants = cva(
  'absolute inset-0 z-50 bg-transparent web:animate-in web:fade-in-0'
);

export const dropdownMenuContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md web:animate-in web:fade-in-0 web:zoom-in-95 web:slide-in-from-top-2'
);

export const dropdownMenuSubContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md web:animate-in web:fade-in-0 web:zoom-in-95 web:slide-in-from-left-2'
);
