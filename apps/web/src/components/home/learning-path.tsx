import { learningPath, pick, type Locale } from '@taksu/content';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';
import { Steps } from '../shared/steps';

export async function LearningPathSection({ locale }: { locale: Locale }) {
  const [t, nav] = await Promise.all([getTranslations('Home.path'), getTranslations('Nav')]);
  return (
    <section className="py-20">
      <Container>
        <SectionHeading aksara="Alur belajar" title={t('title')} intro={t('intro')} />
        <Steps
          className="mt-12"
          steps={learningPath.map((step) => ({
            id: step.id,
            title: pick(step.title, locale),
            body: pick(step.body, locale),
          }))}
        />
        <Button asChild variant="outline" className="mt-10">
          <Link href="/education">{nav('education')}</Link>
        </Button>
      </Container>
    </section>
  );
}
