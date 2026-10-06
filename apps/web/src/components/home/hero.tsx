import { OM_SWASTIASTU } from '@taksu/bali';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { NameWriter } from '@taksu/ui/brand/name-writer';
import { CandiBentarHalf } from '@taksu/ui/brand/ornaments';
import { RobotFace } from '@taksu/ui/brand/robot-face';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';

export async function Hero() {
  const [t, common] = await Promise.all([getTranslations('Home.hero'), getTranslations('Common')]);

  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <h1 className="text-[clamp(2.6rem,6.2vw,4.8rem)] leading-[1.02] font-bold tracking-tight [font-stretch:80%]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t('body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/robots">{t('primaryCta')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/education">{t('secondaryCta')}</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-10 text-sm font-semibold">{common('partOf')}</p>
        </div>

        {/* The robot screen stands inside a candi bentar: the gate where guests are welcomed. */}
        <div className="relative mx-auto w-full max-w-md px-4 sm:px-16">
          <CandiBentarHalf
            side="left"
            className="text-primary/20 absolute bottom-0 left-0 hidden h-[112%] w-auto sm:block"
          />
          <CandiBentarHalf
            side="right"
            className="text-primary/20 absolute right-0 bottom-0 hidden h-[112%] w-auto sm:block"
          />
          <figure className="dark border-border bg-background text-foreground relative rounded-xl border p-6 shadow-2xl">
            <RobotFace variant="timo" label={t('faceLabel')} className="mx-auto max-w-52" />
            <AksaraText
              aksara={OM_SWASTIASTU.aksara}
              decorative
              className="text-primary mt-2 block text-center text-3xl"
            />
            <p className="font-display text-center text-2xl font-semibold">{OM_SWASTIASTU.latin}</p>
            <NameWriter
              className="border-border mt-6 border-t pt-5"
              label={t('writerLabel')}
              placeholder={t('writerPlaceholder')}
              hint={t('writerHint')}
              emptyText={t('writerEmpty')}
              initialValue="Made"
            />
            <figcaption className="text-muted-foreground mt-4 text-xs">
              {t('panelCaption')}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
