import { cva } from 'class-variance-authority';

export const alertVariants = cva('relative w-full rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive:
        'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const alertTitleVariants = cva(
  'mb-1 font-medium leading-none tracking-tight',
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const alertDescriptionVariants = cva('text-sm [&_p]:leading-relaxed', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      destructive: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
