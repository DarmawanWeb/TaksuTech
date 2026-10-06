import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { SubNav } from '@/components/layout/sub-nav';
import { resolveLocale } from '@/lib/locale';

/** Taksu Edu is for schools anywhere, so this area uses its own neutral theme. */
export default async function EducationLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await resolveLocale(params);
  const t = await getTranslations('Edu.subnav');
  const items = [
    { href: '/education', label: t('overview') },
    { href: '/education/sd', label: 'SD' },
    { href: '/education/smp', label: 'SMP' },
    { href: '/education/sma', label: 'SMA' },
    { href: '/education/curriculum', label: t('curriculum') },
    { href: '/education/guides', label: t('guides') },
    { href: '/education/simulator', label: t('simulator') },
    { href: '/education/custom', label: t('custom') },
  ];
  return (
    <div data-area="edu" className="bg-background text-foreground">
      <SubNav label={t('label')} items={items} rootHref="/education" />
      {children}
    </div>
  );
}
