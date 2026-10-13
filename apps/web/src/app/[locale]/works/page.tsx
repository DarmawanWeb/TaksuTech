import { pick, workKinds, works } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { WorkEntry } from '@/components/works/work-entry';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Works' });
  return pageMetadata({
    locale,
    path: '/works',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function WorksPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Works');
  const groups = workKinds.map((kind) => ({
    kind,
    items: works.filter((work) => work.kind === kind),
  }));

  return (
    <>
      <section className="pt-14 pb-6 lg:pt-20">
        <Container>
          <h1 className="max-w-3xl text-[2.5rem] leading-[1.05] font-semibold sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-xl leading-relaxed">
            {t('intro')}
          </p>
          <nav aria-label={t('index')} className="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-4xl">
            {groups.map((group) => (
              <div key={group.kind}>
                <h2 className="text-muted-foreground text-sm font-semibold">
                  {t(`groups.${group.kind}`)}
                </h2>
                <ul className="border-border mt-3 border-t">
                  {group.items.map((work) => (
                    <li key={work.id} className="border-border border-b">
                      <a
                        href={`#${work.id}`}
                        className="decoration-accent block py-2.5 font-medium decoration-2 underline-offset-4 hover:underline"
                      >
                        {pick(work.name, locale)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </Container>
      </section>

      {groups.map((group, groupIndex) => (
        <section
          key={group.kind}
          aria-labelledby={`group-${group.kind}`}
          className="pt-14 pb-4 lg:pt-20"
        >
          <Container>
            <h2
              id={`group-${group.kind}`}
              className="text-[1.75rem] leading-tight font-semibold sm:text-4xl"
            >
              {t(`groups.${group.kind}`)}
            </h2>
            <div className="border-border divide-border mt-6 divide-y border-t">
              {group.items.map((work, index) => (
                <WorkEntry
                  key={work.id}
                  work={work}
                  locale={locale}
                  priority={groupIndex === 0 && index === 0}
                />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        button={t('cta.button')}
        href={{ pathname: '/contact', query: { topic: 'custom' } }}
      />
    </>
  );
}
