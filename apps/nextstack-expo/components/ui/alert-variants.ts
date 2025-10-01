import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 flex-row gap-3',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        success:
          'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
        destructive:
          'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const alertIconVariants = cva('mt-0.5', {
  variants: {
    variant: {
      default: 'text-foreground',
      success: 'text-green-600 dark:text-green-400',
      destructive: 'text-red-600 dark:text-red-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const alertTitleVariants = cva('font-semibold leading-tight', {
  variants: {
    variant: {
      default: 'text-foreground',
      success: 'text-green-900 dark:text-green-100',
      destructive: 'text-red-900 dark:text-red-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const alertDescriptionVariants = cva('text-sm leading-relaxed mt-1', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      success: 'text-green-800 dark:text-green-200',
      destructive: 'text-red-800 dark:text-red-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
