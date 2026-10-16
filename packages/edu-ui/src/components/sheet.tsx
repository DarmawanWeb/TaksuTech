'use client';

import { X } from 'lucide-react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '../lib/utils';

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

/** Full-height panel that slides over the page; used for mobile navigation. */
export function SheetContent({
  className,
  children,
  closeLabel = 'Close',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { closeLabel?: string }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="bg-ink/60 data-[state=open]:animate-fade-in fixed inset-0 z-50" />
      <SheetPrimitive.Content
        className={cn(
          'border-border bg-background data-[state=open]:animate-fade-in fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-6 border-l p-6 shadow-2xl',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="text-muted-foreground hover:text-foreground absolute top-5 right-5 rounded-sm p-1">
          <X className="size-5" aria-hidden />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
