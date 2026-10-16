import type * as React from 'react';
import { cn } from '../lib/utils';

export function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'border-border bg-surface placeholder:text-muted-foreground h-11 w-full min-w-0 rounded-md border px-3 text-base disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
