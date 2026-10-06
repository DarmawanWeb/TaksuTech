import { pick, values, type Locale } from '@taksu/content';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

export function Values({ locale, title, intro }: { locale: Locale; title: string; intro: string }) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading aksara="Tri Hita Karana" title={title} intro={intro} />
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {values.map((value) => (
            <li key={value.id} className="border-primary border-t-2 pt-5">
              <AksaraText latin={value.name} decorative className="text-primary block text-xl" />
              <p className="text-muted-foreground text-sm font-semibold">{value.name}</p>
              <h3 className="mt-3 text-xl font-semibold">{pick(value.title, locale)}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {pick(value.body, locale)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
