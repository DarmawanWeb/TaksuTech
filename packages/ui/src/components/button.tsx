import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type * as React from 'react';
import { cn } from '../lib/utils';

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /** The one action that buys or orders. */
        default: 'bg-primary text-primary-foreground hover:bg-primary-strong',
        /** Strong but not a purchase, e.g. "See the robot". */
        ink: 'bg-ink text-ink-foreground hover:bg-ink/85',
        outline: 'border-edge text-foreground hover:bg-surface-muted border-2 bg-transparent',
        /** On asphalt or a robot colour. */
        light: 'text-foreground bg-white hover:bg-white/85',
        lightOutline: 'border-2 border-white/80 bg-transparent text-white hover:bg-white/10',
        ghost: 'text-foreground hover:bg-surface-muted',
        link: 'text-foreground h-auto px-0 underline decoration-primary decoration-2 underline-offset-4 hover:decoration-[3px]',
      },
      size: {
        sm: 'h-9 px-3 text-sm [&_svg]:size-4',
        default: 'h-11 px-5 text-[0.9375rem] [&_svg]:size-4',
        lg: 'h-13 px-6 text-base [&_svg]:size-5',
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
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a link) with button styles. */
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
