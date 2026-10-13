import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PostList } from '@/components/blog/post-list';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { formatDate, posts, topics } from '@/content/blog';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const metadata = pageMetadata({
    locale,
    path: '/blog',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { 'application/rss+xml': `/${locale}/blog/feed.xml` },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Blog');
  const used = topics.filter((topic) => posts.some((post) => post.meta[locale].topic === topic));

  return (
    <>
      <section className="pt-14 pb-10 lg:pt-20">
        <Container>
          <h1 className="text-[2.5rem] leading-[1.05] font-semibold sm:text-5xl">{t('title')}</h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-xl leading-relaxed">
            {t('intro')}
          </p>
        </Container>
      </section>
      <section className="pb-16">
        <Container>
          <PostList
            items={posts.map((post) => {
              const meta = post.meta[locale];
              return {
                slug: post.slug,
                title: meta.title,
                summary: meta.summary,
                date: meta.date,
                dateLabel: formatDate(meta.date, locale),
                readingTime: t('readingTime', { count: meta.minutes }),
                topic: meta.topic,
              };
            })}
            topics={used.map((id) => ({ id, label: t(`topics.${id}`) }))}
            labels={{ all: t('all'), filter: t('filter') }}
          />
          <a
            href={`/${locale}/blog/feed.xml`}
            className="mt-8 inline-block font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {t('rss')}
          </a>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
