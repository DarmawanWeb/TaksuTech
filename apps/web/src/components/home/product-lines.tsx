import { divisions, type Locale, pick } from '@taksu/content';
import { EduMark } from '@taksu/ui/brand/edu-wordmark';
import { LogoMark } from '@taksu/ui/brand/logo';
import { Button } from '@taksu/ui/components/button';
import Image, { type StaticImageData } from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { images } from '@/lib/images';
import { eduUrl, robotUrl } from '@/lib/links';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

type Division = (typeof divisions)[keyof typeof divisions];

function Line({
  division,
  mark,
  image,
  imageAlt,
  href,
  cta,
  locale,
}: {
  division: Division;
  mark: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  href: string;
  cta: string;
  locale: Locale;
}) {
  return (
    <article className="flex flex-col">
      <div className="bg-surface-muted aspect-[5/4] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          placeholder="blur"
          sizes="(min-width: 1152px) 576px, (min-width: 1024px) 50vw, 100vw"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold">
          {mark}
          {division.name}
        </p>
        <h3 className="mt-3 text-2xl leading-tight font-semibold sm:text-[1.75rem]">
          {pick(division.title, locale)}
        </h3>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          {pick(division.summary, locale)}
        </p>
        <ul className="mt-5 flex flex-col gap-2 text-[0.9375rem]">
          {division.points.map((point) => (
            <li key={point.en} className="flex gap-3">
              <span aria-hidden className="bg-accent mt-[0.6em] size-1.5 shrink-0 rounded-full" />
              {pick(point, locale)}
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" className="mt-8 self-start">
          <a href={href}>{cta}</a>
        </Button>
      </div>
    </article>
  );
}

/** The two product lines, each with its own site. Their photos and marks carry their identity. */
export async function ProductLines({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.lines');
  return (
    <section id="produk" className="scroll-mt-16 py-20">
      <Container>
        <SectionHeading title={t('title')} intro={t('intro')} />
        <div className="border-border divide-border mt-10 grid divide-y overflow-hidden rounded-lg border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <Line
            division={divisions.reception}
            mark={
              <span data-brand="reception" className="text-primary">
                <LogoMark className="size-6" />
              </span>
            }
            image={images.snowTimoBali}
            imageAlt={t('receptionImageAlt')}
            href={robotUrl(locale)}
            cta={t('visit', { brand: divisions.reception.name })}
            locale={locale}
          />
          <Line
            division={divisions.education}
            mark={
              <span data-brand="edu">
                <EduMark className="size-6" />
              </span>
            }
            image={images.sdV1}
            imageAlt={t('educationImageAlt')}
            href={eduUrl(locale)}
            cta={t('visit', { brand: divisions.education.name })}
            locale={locale}
          />
        </div>
      </Container>
    </section>
  );
}
