'use client';

import { NavigationMenu as Primitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Site navigation with menus that open on hover or click and stay keyboard friendly. Content
 * renders under its own trigger (no shared viewport), which suits one or two menus in a header.
 */
export function NavigationMenu({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root className={cn('relative', className)} {...props} />;
}

export const NavigationMenuList = Primitive.List;
export const NavigationMenuItem = Primitive.Item;
export const NavigationMenuTrigger = Primitive.Trigger;
export const NavigationMenuLink = Primitive.Link;

export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      className={cn(
        'border-border bg-background data-[state=open]:animate-fade-in absolute top-full left-0 z-50 mt-2 rounded-lg border shadow-xl',
        className,
      )}
      {...props}
    />
  );
}
