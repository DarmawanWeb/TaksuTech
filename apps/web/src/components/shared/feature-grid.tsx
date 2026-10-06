import { cn } from '@taksu/ui/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

/** Definition list of features; reads as prose, not as a card wall. */
export function FeatureGrid({ items, className }: { items: FeatureItem[]; className?: string }) {
  return (
    <dl className={cn('grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map(({ id, icon: Icon, title, body }) => (
        <div key={id}>
          <dt className="flex items-center gap-3 font-semibold">
            <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-md">
              <Icon className="size-5" aria-hidden />
            </span>
            {title}
          </dt>
          {body ? (
            <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">{body}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
