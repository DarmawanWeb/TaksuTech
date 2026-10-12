import { divisions, educationLevels, type Locale, names, robots } from '@taksu/content';
import { EduMark } from '@taksu/ui/brand/edu-wordmark';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { eduUrl, robotUrl } from '@/lib/links';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

/**
 * The two product lines, each with its own site. The reception card wears the Taksu
 * night indigo; the education card keeps the education line's own colours.
 */
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
            <div className="mt-8 grid flex-1 grid-cols-3 items-end gap-4">
              <RobotIllustration kind="snow" label="Snow" />
              <RobotIllustration kind="timo" label="Timo" />
              <RobotIllustration kind="kiosk" label="Taksu Kiosk" />
            </div>
            <Button asChild className="mt-8 self-start">
              <a href={robotUrl(locale)}>{t('receptionCta', { brand: names.robot })}</a>
            </Button>
          </article>

          <article
            data-brand="edu"
            className="bg-background text-foreground flex flex-col overflow-hidden rounded-xl border-2 border-black p-8 shadow-[6px_6px_0_0_#000]"
          >
            <p className="flex items-center gap-2 text-sm font-bold">
              <EduMark className="size-6" />
              {divisions.education.name}
            </p>
            <h3 className="mt-2 text-3xl font-semibold [font-stretch:90%]">
              {divisions.education.title[locale]}
            </h3>
            <p className="text-muted-foreground mt-3">{divisions.education.summary[locale]}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {educationLevels.map((level) => (
                <li key={level.slug}>
                  <Badge variant={level.slug} className="text-black">
                    {level.kit}
                  </Badge>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid flex-1 grid-cols-3 items-end gap-4">
              {educationLevels.map((level) => (
                <RobotIllustration key={level.slug} kind={level.slug} label={level.kit} />
              ))}
            </div>
            <Button
              asChild
              className="mt-8 self-start rounded-md border-2 border-black font-bold text-black shadow-[3px_3px_0_0_#000]"
            >
              <a href={eduUrl(locale)}>{t('educationCta', { brand: names.edu })}</a>
            </Button>
          </article>
        </div>
      </Container>
    </section>
  );
}
