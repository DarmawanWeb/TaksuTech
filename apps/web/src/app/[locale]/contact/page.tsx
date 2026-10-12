import { brand } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/contact/contact-form';
import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { whatsappUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return pageMetadata({
    locale,
    path: '/contact',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function ContactPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Contact'), getTranslations('Common')]);
  const whatsapp = whatsappUrl(common('whatsappGreeting'));

  return (
    <section className="pt-14 pb-10 lg:pt-20">
      <Container>
        <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="border-border bg-surface rounded-lg border p-6 sm:p-8">
            <ContactForm email={brand.contact.email} />
          </div>
          <aside>
            <h2 className="text-xl font-semibold">{t('direct.title')}</h2>
            <dl className="divide-border border-border mt-4 divide-y border-y text-sm">
              <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
                <dt className="text-muted-foreground">{t('direct.person')}</dt>
                <dd className="font-semibold">{brand.contact.person}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
                <dt className="text-muted-foreground">{t('direct.email')}</dt>
                <dd className="font-semibold break-all">
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="hover:text-primary hover:underline"
                  >
                    {brand.contact.email}
                  </a>
                </dd>
              </div>
              {whatsapp ? (
                <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
                  <dt className="text-muted-foreground">{t('direct.whatsapp')}</dt>
                  <dd className="font-semibold">
                    <a href={whatsapp} className="hover:text-primary hover:underline">
                      wa.me
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
                <dt className="text-muted-foreground">{t('direct.location')}</dt>
                <dd className="font-semibold">{brand.location[locale]}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  );
}
