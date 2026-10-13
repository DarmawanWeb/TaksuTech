import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';

/** Each reason points at something on the site that backs it up. */
const reasons = [
  { id: 'build', href: '/works' },
  { id: 'team', href: '/about' },
  { id: 'try', href: '/demo' },
  { id: 'local', href: '/blog/aksara-di-layar' },
  { id: 'offline', href: '/blog/saat-server-sibuk' },
  { id: 'honest', href: '/blog/yang-kami-buang' },
] as const;

/** Why pick us over the many other robot sellers, each claim with a link to its proof. */
export async function WhyUs() {
  const t = await getTranslations('Home.why');
  return (
    <section className="py-20">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-[1.75rem] leading-tight font-semibold text-balance sm:text-4xl">
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{t('intro')}</p>
          </div>
        </div>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {reasons.map((reason) => (
            <li key={reason.id} className="border-foreground border-t-2 pt-5">
              <h3 className="text-xl leading-snug font-semibold">
                {t(`reasons.${reason.id}.title`)}
              </h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {t(`reasons.${reason.id}.body`)}
              </p>
              <Link
                href={reason.href}
                className="decoration-accent mt-3 inline-block text-[0.9375rem] font-semibold underline decoration-2 underline-offset-4 hover:decoration-[3px]"
              >
                {t(`reasons.${reason.id}.link`)}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
