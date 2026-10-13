import { type Locale, pick, services, type Work } from '@taksu/content';
import { cn } from '@taksu/ui/lib/utils';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';
import { workImages } from '@/lib/images';
import { workLinkUrl } from '@/lib/links';
import { ExternalButton } from '../shared/external-button';

/**
 * One piece of work as a spec sheet: the picture, what it is, the few facts that matter,
 * where to try it, and which service it shows we can do for others.
 */
export async function WorkEntry({
  work,
  locale,
  priority = false,
}: {
  work: Work;
  locale: Locale;
  priority?: boolean;
}) {
  const [t, common] = await Promise.all([getTranslations('Works'), getTranslations('Common')]);
  const related = services.filter((service) => work.services.includes(service.id));

  return (
    <article id={work.id} className="grid scroll-mt-24 gap-8 py-12 lg:grid-cols-12 lg:gap-12">
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-7',
          work.fit === 'cover' ? 'bg-surface-muted' : 'bg-lightbox',
        )}
      >
        <Image
          src={workImages[work.image]}
          alt={pick(work.imageAlt, locale)}
          fill
          placeholder="blur"
          priority={priority}
          sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
          className={work.fit === 'cover' ? 'object-cover' : 'object-contain p-5 sm:p-8'}
        />
      </div>

      <div className="flex flex-col lg:col-span-5">
        <h3 className="text-2xl leading-tight font-semibold sm:text-[1.75rem]">
          {pick(work.name, locale)}
        </h3>
        <p className="mt-2 text-lg leading-snug">{pick(work.lead, locale)}</p>
        <p className="text-muted-foreground mt-3 leading-relaxed">{pick(work.body, locale)}</p>
        <dl className="border-border mt-6 border-t text-[0.9375rem]">
          {work.facts.map((fact) => (
            <div
              key={fact.label.en}
              className="border-border grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 border-b py-2.5"
            >
              <dt className="text-muted-foreground">{pick(fact.label, locale)}</dt>
              <dd className="font-medium">{pick(fact.value, locale)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          {work.links.map((link, index) => (
            <ExternalButton
              key={`${link.site}${link.path}`}
              href={workLinkUrl(link, locale)}
              variant={index === 0 ? 'default' : 'outline'}
              size="sm"
              newTabLabel={common('newTab')}
            >
              {pick(link.label, locale)}
            </ExternalButton>
          ))}
        </div>
        {related.length > 0 ? (
          <p className="text-muted-foreground mt-6 text-sm">
            {t('related', { count: related.length })}{' '}
            {related.map((service, index) => (
              <Fragment key={service.id}>
                {index > 0 ? ', ' : null}
                <Link
                  href={{ pathname: '/services', hash: service.id }}
                  className="text-foreground font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {pick(service.title, locale)}
                </Link>
              </Fragment>
            ))}
          </p>
        ) : null}
      </div>
    </article>
  );
}
