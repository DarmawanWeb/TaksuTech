import { cn } from '../lib/utils';

const sizes = {
  sm: 'size-9 text-sm border-2',
  md: 'size-12 text-lg border-[3px]',
  lg: 'size-16 text-2xl border-4',
  xl: 'size-24 text-4xl border-[5px]',
} as const;

/**
 * A number plate like the roundel on a race car: every robot and every Drop gets the next
 * number in the series, so #01 is Ciko and the next release continues the count.
 */
export function RaceNumber({
  value,
  size = 'md',
  className,
  label,
}: {
  /** The release number; `null` draws a question mark for an unrevealed drop. */
  value: number | null;
  size?: keyof typeof sizes;
  className?: string;
  /** Screen-reader text, e.g. "Nomor 01". Defaults to hidden, as the name is usually nearby. */
  label?: string;
}) {
  const text = value === null ? '??' : String(value).padStart(2, '0');
  return (
    <span
      className={cn(
        'type-number inline-grid shrink-0 place-items-center rounded-full border-[#191b20] bg-white pr-[0.08em] text-[#191b20]',
        sizes[size],
        className,
      )}
    >
      <span aria-hidden>{text}</span>
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
