import type * as React from 'react';
import { cn } from '../lib/utils';

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'border-border bg-surface placeholder:text-muted-foreground min-h-28 w-full rounded-md border px-3 py-2 text-base disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
