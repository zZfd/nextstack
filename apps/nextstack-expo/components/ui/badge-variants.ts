import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary',
        secondary:
          'border-transparent bg-secondary',
        destructive:
          'border-transparent bg-destructive',
        outline: 'border-border bg-background',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const badgeTextVariants = cva(
  'text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
