'use client';

import { transliterate } from '@taksu/bali';
import { useId, useMemo, useState } from 'react';
import { cn } from '../lib/utils';

export interface NameWriterProps {
  label: string;
  placeholder: string;
  hint: string;
  emptyText: string;
  initialValue?: string;
  size?: 'md' | 'lg';
  className?: string;
  /** Called with the Latin text as the visitor types. */
  onValueChange?: (value: string) => void;
}

/** Live Latin → Aksara Bali converter for names and short phrases. */
export function NameWriter({
  label,
  placeholder,
  hint,
  emptyText,
  initialValue = '',
  size = 'md',
  className,
  onValueChange,
}: NameWriterProps) {
  const inputId = useId();
  const hintId = useId();
  const [value, setValue] = useState(initialValue);
  const aksara = useMemo(() => transliterate(value), [value]);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <label htmlFor={inputId} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        maxLength={40}
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        aria-describedby={hintId}
        onChange={(event) => {
          setValue(event.target.value);
          onValueChange?.(event.target.value);
        }}
        className={cn(
          'border-border bg-surface text-foreground placeholder:text-muted-foreground w-full rounded-md border px-4 font-semibold placeholder:font-normal',
          size === 'lg' ? 'h-16 text-2xl' : 'h-12 text-lg',
        )}
      />
      <output
        htmlFor={inputId}
        aria-live="polite"
        lang="ban-Bali"
        className={cn(
          'aksara text-foreground block min-h-[2em] break-words',
          size === 'lg' ? 'text-6xl' : 'text-4xl',
          !aksara && 'text-muted-foreground font-sans text-base',
        )}
      >
        {aksara || emptyText}
      </output>
      <p id={hintId} className="text-muted-foreground text-xs">
        {hint}
      </p>
    </div>
  );
}
