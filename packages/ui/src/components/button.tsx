import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type * as React from 'react';
import { cn } from '../lib/utils';

export const buttonVariants = cva(
  'focus-visible:outline-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-surface-muted text-foreground hover:bg-surface-muted/70',
        outline: 'border-border hover:bg-surface-muted border bg-transparent',
        ghost: 'hover:bg-surface-muted',
        ink: 'bg-ink text-ink-foreground hover:bg-ink/85',
        link: 'text-primary h-auto px-0 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm [&_svg]:size-4',
        default: 'h-11 px-5 text-sm [&_svg]:size-4',
        lg: 'h-13 px-7 text-base [&_svg]:size-5',
        xl: 'h-16 px-8 text-lg [&_svg]:size-6',
        icon: 'size-10 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a link) with button styles. */
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
