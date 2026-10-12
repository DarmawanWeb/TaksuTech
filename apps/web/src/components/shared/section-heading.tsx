import { cn } from '@taksu/ui/lib/utils';

export interface SectionHeadingProps {
  title: string;
  intro?: string;
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  title,
  intro,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <Heading
        className={cn(
          'font-semibold',
          Heading === 'h1'
            ? 'text-[2.5rem] leading-[1.05] sm:text-5xl'
            : 'text-[1.75rem] leading-tight sm:text-4xl',
        )}
      >
        {title}
      </Heading>
      {intro ? <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{intro}</p> : null}
    </div>
  );
}
