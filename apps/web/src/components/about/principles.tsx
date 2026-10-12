import { type Locale, pick, principles } from '@taksu/content';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

/** How we work, shared by both product lines. */
export function Principles({ locale, title }: { locale: Locale; title: string }) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={title} />
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {principles.map((item) => (
            <li key={item.id} className="border-border border-t pt-5">
              <h3 className="text-xl font-semibold">{pick(item.title, locale)}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {pick(item.body, locale)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
