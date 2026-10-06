import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

export async function ProductLines() {
  const t = await getTranslations('Home.lines');

  return (
    <section className="py-20">
      <Container>
        <SectionHeading aksara="Produk" title={t('title')} intro={t('intro')} />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <article className="dark border-border bg-background text-foreground flex flex-col overflow-hidden rounded-xl border p-8 lg:col-span-7">
            <h3 className="text-3xl font-semibold [font-stretch:90%]">{t('commercialTitle')}</h3>
            <p className="text-muted-foreground mt-3 max-w-lg">{t('commercialBody')}</p>
            <Button asChild className="mt-6 self-start">
              <Link href="/robots">{t('commercialCta')}</Link>
            </Button>
            <div className="mt-10 grid grid-cols-2 items-end gap-8 px-4">
              <RobotIllustration kind="timo" label="Timo" />
              <RobotIllustration kind="snow" label="Snow" className="w-[92%]" />
            </div>
          </article>

          <article className="border-border bg-surface flex flex-col rounded-xl border p-8 lg:col-span-5">
            <div className="flex gap-2">
              <Badge variant="sd">SD</Badge>
              <Badge variant="smp">SMP</Badge>
              <Badge variant="sma">SMA</Badge>
            </div>
            <h3 className="mt-5 text-3xl font-semibold [font-stretch:90%]">
              {t('educationTitle')}
            </h3>
            <p className="text-muted-foreground mt-3">{t('educationBody')}</p>
            <Button asChild variant="outline" className="mt-6 self-start">
              <Link href="/education">{t('educationCta')}</Link>
            </Button>
            <div className="mt-auto grid grid-cols-3 items-end gap-3 pt-10">
              <RobotIllustration kind="sd" label="SD" />
              <RobotIllustration kind="smp" label="SMP" />
              <RobotIllustration kind="sma" label="SMA" />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
