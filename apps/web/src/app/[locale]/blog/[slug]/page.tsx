import { brand } from '@taksu/content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { formatDate, getPost, posts, relatedPosts } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [locale, { slug }] = await Promise.all([localeFromParams(params), params]);
  const post = getPost(slug);
  if (!post) return {};
  const meta = post.meta[locale];
  const metadata = pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: meta.title,
    description: meta.summary,
  });
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { 'application/rss+xml': `/${locale}/blog/feed.xml` },
    },
    openGraph: { ...metadata.openGraph, type: 'article', publishedTime: meta.date },
  };
}

export default async function PostPage({ params }: Props) {
  const [locale, { slug }] = await Promise.all([resolveLocale(params), params]);
  const post = getPost(slug);
  if (!post) notFound();
  const [t, nav] = await Promise.all([getTranslations('Blog'), getTranslations('Nav')]);
  const meta = post.meta[locale];
  const Body = post.Body[locale];
  const author = meta.author ?? t('team', { brand: brand.name });
  const others = relatedPosts(post);
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    inLanguage: locale,
    author: { '@type': 'Organization', name: author },
    publisher: { '@type': 'Organization', name: brand.name },
    mainEntityOfPage: `${siteConfig.url}/${locale}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="pt-10 pb-16 lg:pb-20">
        <Container>
          <nav aria-label={t('breadcrumb')}>
            <ol className="text-muted-foreground flex flex-wrap gap-2 text-[0.9375rem]">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground underline-offset-4 hover:underline"
                >
                  {nav('blog')}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">
                {meta.title}
              </li>
            </ol>
          </nav>
          <div className="mx-auto max-w-[44rem]">
            <p className="text-muted-foreground mt-10 text-sm font-semibold">
              {t(`topics.${meta.topic}`)}
            </p>
            <h1 className="mt-2 text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1.06] font-semibold">
              {meta.title}
            </h1>
            <p className="text-muted-foreground mt-5">
              <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time>,{' '}
              {t('readingTime', { count: meta.minutes })}, {author}
            </p>
            <p className="mt-6 text-xl leading-relaxed">{meta.summary}</p>
            <div className="border-border mt-8 border-t pt-2">
              <Body />
            </div>
          </div>
        </Container>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from our own post data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }}
        />
      </article>

      {others.length > 0 ? (
        <section className="pb-12">
          <Container>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('more')}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((entry) => (
                <li key={entry.slug}>
                  <article className="border-border hover:border-foreground/40 relative flex h-full flex-col rounded-lg border p-6 transition-colors focus-within:border-foreground/40">
                    <p className="text-muted-foreground text-sm">
                      {t(`topics.${entry.meta[locale].topic}`)},{' '}
                      <time dateTime={entry.meta[locale].date}>
                        {formatDate(entry.meta[locale].date, locale)}
                      </time>
                    </p>
                    <h3 className="mt-3 text-xl leading-snug font-semibold">
                      <Link
                        href={`/blog/${entry.slug}`}
                        className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
                      >
                        {entry.meta[locale].title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mt-2">{entry.meta[locale].summary}</p>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}
