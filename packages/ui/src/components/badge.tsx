import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.8125rem] font-bold whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-foreground',
        outline: 'border-border text-foreground border',
        primary: 'bg-primary text-primary-foreground',
        /** Amber, like a turn signal: something new or on its way. */
        signal: 'bg-accent text-[#191b20]',
        eye: 'bg-eye-soft text-foreground',
        success: 'bg-success/12 text-success',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
