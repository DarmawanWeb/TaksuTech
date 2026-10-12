import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './container';

/** Closing call to action on a petrol field. */
export async function CtaBand() {
  const t = await getTranslations('Home.cta');
  return (
    <section className="pt-8">
      <Container>
        <div className="bg-ink text-ink-foreground dark:border-border flex flex-col gap-8 rounded-lg p-8 sm:p-12 md:flex-row md:items-center md:justify-between dark:border">
          <div className="max-w-xl">
            <h2 className="text-[1.75rem] leading-tight font-semibold sm:text-4xl">{t('title')}</h2>
            <p className="text-ink-muted mt-3 text-lg">{t('body')}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-ink-foreground text-ink hover:bg-ink-foreground/90 shrink-0 self-start md:self-center"
          >
            <Link href="/contact">{t('button')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
