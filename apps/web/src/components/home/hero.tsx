import { OM_SWASTIASTU } from '@taksu/bali';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { Button } from '@taksu/ui/components/button';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { images } from '@/lib/images';
import { Container } from '../shared/container';

export async function Hero() {
  const [t, common] = await Promise.all([getTranslations('Home.hero'), getTranslations('Common')]);
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
        <div>
          <AksaraText
            aksara={OM_SWASTIASTU.aksara}
            decorative
            className="text-primary block pb-2 text-2xl"
          />
          <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] font-bold tracking-tight [font-stretch:80%]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t('body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/reception">{t('ctaReception')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/education">{t('ctaEducation')}</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-10 text-sm font-semibold">{common('partOf')}</p>
        </div>
        <figure className="relative">
          <div className="border-border overflow-hidden rounded-xl border shadow-2xl">
            <Image
              src={images.snowTimoBali}
              alt={t('imageAlt')}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="text-muted-foreground mt-3 text-sm">{t('caption')}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
