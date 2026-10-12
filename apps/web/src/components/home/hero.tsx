import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';
import { BoardFigure } from './board-figure';

export async function Hero() {
  const [t, common] = await Promise.all([getTranslations('Home.hero'), getTranslations('Common')]);
  return (
    <section>
      <Container className="grid gap-12 pt-14 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-5 lg:pt-4">
          <h1 className="text-[clamp(2.6rem,5.4vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed">{t('body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#produk">{t('ctaProducts')}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/demo">{t('ctaDemo')}</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-10 text-sm">{common('partOf')}</p>
        </div>
        <div className="lg:col-span-7">
          <BoardFigure />
        </div>
      </Container>
    </section>
  );
}
