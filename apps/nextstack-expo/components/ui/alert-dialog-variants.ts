import { cva } from 'class-variance-authority';

export const alertDialogOverlayVariants = cva(
  'absolute inset-0 z-50 bg-black/80 web:animate-in web:fade-in-0',
);

export const alertDialogContentVariants = cva(
  'z-50 max-w-lg gap-4 border border-border bg-background p-6 shadow-lg web:duration-200 web:animate-in web:fade-in-0 web:zoom-in-95 rounded-lg',
);

export const alertDialogHeaderVariants = cva('flex flex-col gap-2');

export const alertDialogFooterVariants = cva(
  'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
);

export const alertDialogTitleVariants = cva(
  'text-lg font-semibold text-foreground',
);

export const alertDialogDescriptionVariants = cva(
  'text-sm text-muted-foreground',
);
