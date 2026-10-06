import { divisions, educationLevels, robots, type Locale } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { images } from '@/lib/images';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

export async function Divisions({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.divisions');
  return (
    <section className="py-20">
      <Container>
        <SectionHeading aksara="Produk" title={t('title')} intro={t('intro')} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="dark border-border bg-background text-foreground flex flex-col overflow-hidden rounded-xl border p-8">
            <p className="font-display text-primary text-sm font-bold">
              {divisions.reception.name}
            </p>
            <h3 className="mt-1 text-3xl font-semibold [font-stretch:90%]">
              {divisions.reception.title[locale]}
            </h3>
            <p className="text-muted-foreground mt-3">{divisions.reception.summary[locale]}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {robots.map((robot) => (
                <li key={robot.slug}>
                  <Badge variant="gold">{robot.name}</Badge>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 items-end gap-4">
              <RobotIllustration kind="snow" label="Snow" />
              <RobotIllustration kind="timo" label="Timo" />
              <RobotIllustration kind="kiosk" label="Taksu Kiosk" />
            </div>
            <Button asChild className="mt-8 self-start">
              <Link href="/reception">{t('receptionCta')}</Link>
            </Button>
          </article>
          <article
            data-area="edu"
            className="border-border bg-surface text-foreground flex flex-col overflow-hidden rounded-xl border"
          >
            <div className="p-8 pb-0">
              <p className="font-display text-primary text-sm font-bold">
                {divisions.education.name}
              </p>
              <h3 className="mt-1 text-3xl font-semibold [font-stretch:90%]">
                {divisions.education.title[locale]}
              </h3>
              <p className="text-muted-foreground mt-3">{divisions.education.summary[locale]}</p>
              <ul className="mt-5 flex gap-2">
                {educationLevels.map((level) => (
                  <li key={level.slug}>
                    <Badge variant={level.slug}>{level.short}</Badge>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6">
                <Link href="/education">{t('educationCta')}</Link>
              </Button>
            </div>
            <Image
              src={images.jenjang}
              alt={t('educationImageAlt')}
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="mt-8 h-auto w-full"
            />
          </article>
        </div>
      </Container>
    </section>
  );
}
