import { CalendarDays, Flower2, Languages, ScrollText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';
import { PawukonToday } from './pawukon-today';

const items = [
  { key: 'aksara', icon: ScrollText },
  { key: 'pawukon', icon: CalendarDays },
  { key: 'salam', icon: Flower2 },
  { key: 'language', icon: Languages },
] as const;

export async function MadeForBali() {
  const t = await getTranslations('Home.bali');
  return (
    <section className="border-border bg-surface border-y py-20">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading aksara="Dibuat untuk Bali" title={t('title')} intro={t('intro')} />
          <PawukonToday />
        </div>
        <dl className="grid content-start gap-x-10 gap-y-10 sm:grid-cols-2 lg:pt-14">
          {items.map(({ key, icon: Icon }) => (
            <div key={key}>
              <dt className="flex items-center gap-3 text-lg font-semibold">
                <Icon className="text-primary size-5" aria-hidden />
                {t(`items.${key}.title`)}
              </dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">
                {t(`items.${key}.body`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
