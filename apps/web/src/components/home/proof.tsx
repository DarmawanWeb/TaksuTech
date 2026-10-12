import { GraduationCap, Monitor, Printer, ScrollText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '../shared/container';
import { FeatureGrid } from '../shared/feature-grid';
import { SectionHeading } from '../shared/section-heading';

const items = [
  { key: 'aksara', icon: ScrollText },
  { key: 'kiosk', icon: Printer },
  { key: 'kka', icon: GraduationCap },
  { key: 'simulator', icon: Monitor },
] as const;

export async function Proof() {
  const t = await getTranslations('Home.proof');
  return (
    <section className="border-border bg-surface border-y py-20">
      <Container>
        <SectionHeading title={t('title')} />
        <FeatureGrid
          className="mt-12 lg:grid-cols-4"
          items={items.map(({ key, icon }) => ({
            id: key,
            icon,
            title: t(`items.${key}.title`),
            body: t(`items.${key}.body`),
          }))}
        />
      </Container>
    </section>
  );
}
