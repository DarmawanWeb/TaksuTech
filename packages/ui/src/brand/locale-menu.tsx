'use client';

import { Languages } from 'lucide-react';
import { Button } from '../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';

export interface LocaleMenuProps {
  current: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  label: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

/** Presentational language picker; the app supplies routing via `onSelect`. */
export function LocaleMenu({ current, options, label, onSelect, disabled }: LocaleMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={label}
          disabled={disabled}
          className="gap-1.5"
        >
          <Languages aria-hidden />
          <span className="font-semibold uppercase">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={current} onValueChange={onSelect}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
