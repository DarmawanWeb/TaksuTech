'use client';

import { localeLabels, locales } from '@taksu/content';
import { LocaleMenu } from '@taksu/ui/brand/locale-menu';
import { Logo } from '@taksu/ui/brand/logo';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { Badge } from '@taksu/ui/components/badge';
import { cn } from '@taksu/ui/lib/utils';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { hasLocale, useLocale, useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { levels } from '../sim/levels';
import type { LevelId } from '../sim/types';
import { LevelScreen } from './level-screen';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const localeOptions = locales.map((value) => ({ value, label: localeLabels[value] }));

export function Playground() {
  const t = useTranslations('Playground');
  const levelText = useTranslations('Levels');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const track = searchParams.get('track') === 'smp' ? 'smp' : 'sd';
  const [pending, startTransition] = useTransition();
  const [levelIndex, setLevelIndex] = useState(0);
  const [solved, setSolved] = useState<ReadonlySet<LevelId>>(new Set());
  const level = levels[levelIndex] ?? levels[0];
  if (!level) return null;

  return (
    <div className="min-h-dvh">
      <header className="border-border flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-4 py-3 lg:px-6">
        <a href={`${siteUrl}/${locale}`} aria-label={t('backToSite')} className="shrink-0">
          <Logo />
        </a>
        <div className="min-w-0">
          <h1 className="font-display truncate text-lg font-semibold [font-stretch:90%]">
            {t('title')}
          </h1>
          <Badge variant={track} className="mt-0.5">
            {t(`track.${track}`)}
          </Badge>
        </div>
        <nav
          aria-label={t('levels')}
          className="order-last flex w-full gap-2 overflow-x-auto md:order-none md:ml-auto md:w-auto"
        >
          {levels.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              aria-current={index === levelIndex ? 'step' : undefined}
              onClick={() => setLevelIndex(index)}
              className={cn(
                'flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors',
                index === levelIndex
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface hover:border-primary',
              )}
            >
              {solved.has(entry.id) ? (
                <Check className="size-4" aria-label={t('completed')} />
              ) : (
                index + 1
              )}
              <span className="hidden xl:inline">{levelText(`${entry.id}.title`)}</span>
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <LocaleMenu
            current={locale}
            options={localeOptions}
            label={t('language')}
            disabled={pending}
            onSelect={(next) => {
              if (!hasLocale(routing.locales, next)) return;
              startTransition(() =>
                router.replace({ pathname, query: { track } }, { locale: next }),
              );
            }}
          />
          <ThemeToggle label={t('theme')} />
        </div>
      </header>
      <LevelScreen
        key={level.id}
        level={level}
        track={track}
        hasNext={levelIndex < levels.length - 1}
        onSolved={() => setSolved((current) => new Set(current).add(level.id))}
        onNext={() => setLevelIndex((index) => Math.min(index + 1, levels.length - 1))}
      />
    </div>
  );
}
