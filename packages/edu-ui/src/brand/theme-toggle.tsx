'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../components/button';
import { cn } from '../lib/utils';

export interface ThemeToggleProps {
  /** Label announced to screen readers, e.g. "Switch colour theme". */
  label: string;
  className?: string;
}

/** Toggles light/dark. Icons swap with CSS so server and client markup match. */
export function ThemeToggle({ label, className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className={cn(className)}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="hidden dark:block" aria-hidden />
      <Moon className="block dark:hidden" aria-hidden />
    </Button>
  );
}
