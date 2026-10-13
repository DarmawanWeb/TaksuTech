import type { Locale } from '@taksu/content';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { eduUrl } from '@/lib/links';
import { siteConfig } from '@/lib/site-config';

const linkClass = 'font-semibold underline decoration-1 underline-offset-4 hover:decoration-2';

/** A link from a post to a page on the education site, in the reader's language. */
export async function EduLink({ path, children }: { path: string; children: ReactNode }) {
  const locale = (await getLocale()) as Locale;
  return (
    <a href={eduUrl(locale, path)} className={linkClass}>
      {children}
    </a>
  );
}

/** A post's call to try something in the kiosk demo, which opens in a new tab. */
export async function KioskDemo({ path, label }: { path: string; label: string }) {
  const locale = (await getLocale()) as Locale;
  const common = await getTranslations('Common');
  const href = `${siteConfig.kioskUrl.replace(/\/+$/, '')}/${locale}${path}`;
  return (
    <p className="mt-8">
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center rounded-md px-5 text-sm font-semibold"
      >
        {label}
        <span className="sr-only"> {common('newTab')}</span>
      </a>
    </p>
  );
}
