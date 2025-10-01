import { cva } from 'class-variance-authority';

export const dialogOverlayVariants = cva(
  'absolute inset-0 z-50 flex items-center justify-center bg-black/80 web:animate-in web:fade-in-0'
);

export const dialogContentVariants = cva(
  'z-50 max-w-lg gap-4 border border-border bg-background p-6 shadow-lg web:duration-200 web:animate-in web:fade-in-0 web:zoom-in-95 rounded-lg'
);

export const dialogHeaderVariants = cva('flex flex-col gap-2');

export const dialogFooterVariants = cva(
  'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'
);

export const dialogTitleVariants = cva('text-lg font-semibold text-foreground');

export const dialogDescriptionVariants = cva('text-sm text-muted-foreground');
