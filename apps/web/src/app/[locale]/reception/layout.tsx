import { robots } from '@taksu/content';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { SubNav } from '@/components/layout/sub-nav';
import { resolveLocale } from '@/lib/locale';

export default async function ReceptionLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await resolveLocale(params);
  const t = await getTranslations('Reception.subnav');
  const items = [
    { href: '/reception', label: t('overview') },
    ...robots.map((robot) => ({ href: `/reception/${robot.slug}`, label: robot.name })),
    { href: '/reception/compare', label: t('compare') },
    { href: '/reception/aksara-bali', label: t('aksara') },
  ];
  return (
    <div data-area="reception">
      <SubNav label={t('label')} items={items} rootHref="/reception" />
      {children}
    </div>
  );
}
