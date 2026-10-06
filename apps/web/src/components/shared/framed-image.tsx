import { cn } from '@taksu/ui/lib/utils';
import Image, { type StaticImageData } from 'next/image';

/** Product photo or poster with a soft frame and optional caption. */
export function FramedImage({
  src,
  alt,
  caption,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={cn('border-border bg-surface overflow-hidden rounded-xl border', className)}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        className="h-auto w-full"
      />
      {caption ? (
        <figcaption className="text-muted-foreground px-4 py-3 text-xs">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
