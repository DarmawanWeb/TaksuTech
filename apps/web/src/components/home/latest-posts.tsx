import type { Locale } from '@taksu/content';
import { getTranslations } from 'next-intl/server';
import { formatDate, posts } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

/** The three newest blog posts, so the home page shows the team is still at work. */
export async function LatestPosts({ locale }: { locale: Locale }) {
  const [t, blog] = await Promise.all([getTranslations('Home.posts'), getTranslations('Blog')]);
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={t('title')} intro={t('intro')} />
          <Link
            href="/blog"
            className="shrink-0 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {t('all')}
          </Link>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => {
            const meta = post.meta[locale];
            return (
              <li key={post.slug} className="border-border flex flex-col border-t pt-5">
                <p className="text-muted-foreground text-sm font-semibold">
                  {blog(`topics.${meta.topic}`)}
                </p>
                <h3 className="mt-1.5 text-xl leading-snug font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="decoration-accent decoration-2 underline-offset-4 hover:underline"
                  >
                    {meta.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mt-2 flex-1 leading-relaxed">{meta.summary}</p>
                <p className="text-muted-foreground mt-4 text-sm">
                  <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
