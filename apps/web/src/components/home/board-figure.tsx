import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { images } from '@/lib/images';

/** Photo size in pixels; callout coordinates below are measured on it. */
const W = 900;
const H = 506;

/**
 * Parts of the SMP v1 board, each pointed at with a numbered balloon like an assembly drawing.
 * The photo stays light in dark mode, so the callouts keep the light theme's petrol.
 */
const parts = [
  { id: 'esp32', target: [300, 236], balloon: [128, 84] },
  { id: 'connectors', target: [452, 338], balloon: [432, 452] },
  { id: 'power', target: [572, 252], balloon: [740, 420] },
] as const;

const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;
const at = ([x, y]: readonly [number, number]) => ({ left: px(x), top: py(y) });

/** Keeps terms like Wi-Fi from breaking at their hyphen. */
const nowrap = (chunks: ReactNode) => <span className="whitespace-nowrap">{chunks}</span>;

export async function BoardFigure() {
  const t = await getTranslations('Home.board');
  return (
    <figure>
      <div className="border-border relative overflow-hidden rounded-lg border">
        <Image
          src={images.smpBoard}
          alt={t('alt')}
          priority
          placeholder="blur"
          sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
          className="h-auto w-full"
        />
        {/* Percentages keep the leader lines on their parts at any width, with a 1.5px stroke. */}
        <svg className="absolute inset-0 size-full" aria-hidden>
          {parts.map((part, index) => (
            <line
              key={part.id}
              x1={px(part.balloon[0])}
              y1={py(part.balloon[1])}
              x2={px(part.target[0])}
              y2={py(part.target[1])}
              pathLength={1}
              className="callout-line"
              style={{ animationDelay: `${300 + index * 180}ms` }}
              stroke="#12343b"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        {parts.map((part, index) => (
          <span key={part.id} aria-hidden>
            <span
              className="callout-dot bg-accent absolute size-2.5 -translate-1/2 rounded-full ring-2 ring-white"
              style={{ ...at(part.target), animationDelay: `${520 + index * 180}ms` }}
            />
            <span
              className="callout-balloon absolute flex size-6 -translate-1/2 sm:size-7 items-center justify-center rounded-full bg-[#12343b] text-sm font-semibold text-white ring-2 ring-white"
              style={{ ...at(part.balloon), animationDelay: `${200 + index * 180}ms` }}
            >
              {index + 1}
            </span>
          </span>
        ))}
      </div>
      <figcaption className="mt-5">
        <ol className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          {parts.map((part, index) => (
            <li key={part.id} className="flex gap-3">
              <span
                aria-hidden
                className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              >
                {index + 1}
              </span>
              <span>
                <span className="font-semibold">{t(`parts.${part.id}.name`)}</span>
                <span className="text-muted-foreground block">
                  {t.rich(`parts.${part.id}.role`, { nowrap })}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground border-border mt-5 border-t pt-3 text-sm">
          {t('caption')}
        </p>
      </figcaption>
    </figure>
  );
}
