import { CompanyLogo } from '@taksu/ui/brand/company-logo';
import { cn } from '@taksu/ui/lib/utils';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';

/** Each row points at something on the site that backs our answer up. */
const rows = [
  { id: 'build', href: '/works' },
  { id: 'team', href: '/about' },
  { id: 'try', href: '/demo' },
  { id: 'local', href: '/blog/aksara-di-layar' },
  { id: 'offline', href: '/blog/saat-server-sibuk' },
  { id: 'honest', href: '/blog/yang-kami-buang' },
] as const;

/** Our column sits on petrol in light mode and on a raised surface in dark mode. */
const ours = 'bg-ink text-ink-foreground dark:bg-surface-muted dark:text-foreground';

const proofClass =
  'decoration-accent mt-3 inline-block text-[0.9375rem] font-semibold underline decoration-2 underline-offset-4 hover:decoration-[3px]';

/**
 * Why pick us over the many other robot sellers: what buyers often get elsewhere next to our
 * answer, row by row, each answer linking to its proof.
 */
export async function WhyUs() {
  const t = await getTranslations('Home.why');
  return (
    <section className="py-20" aria-labelledby="why-us">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2
            id="why-us"
            className="text-[1.75rem] leading-tight font-semibold text-balance sm:text-4xl lg:col-span-6"
          >
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed lg:col-span-6 lg:pb-1">
            {t('intro')}
          </p>
        </div>

        <table className="mt-14 hidden w-full table-fixed border-separate border-spacing-0 text-left md:table">
          <caption className="sr-only">{t('caption')}</caption>
          <colgroup>
            <col className="w-[21%]" />
            <col className="w-[33%]" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="pb-5 align-bottom">
                <span className="sr-only">{t('topic')}</span>
              </th>
              <th
                scope="col"
                className="text-muted-foreground pr-10 pb-5 align-bottom text-[0.9375rem] font-semibold"
              >
                {t('often')}
              </th>
              <th scope="col" className={cn(ours, 'rounded-t-lg px-8 pt-8 pb-6 align-bottom')}>
                <CompanyLogo />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <th
                  scope="row"
                  className="border-border border-t py-6 pr-6 align-top text-[1.0625rem] leading-snug font-semibold"
                >
                  {t(`rows.${row.id}.topic`)}
                </th>
                <td className="border-border text-muted-foreground border-t py-6 pr-10 align-top leading-relaxed">
                  {t(`rows.${row.id}.often`)}
                </td>
                <td
                  className={cn(
                    ours,
                    'border-t border-white/15 px-8 py-6 align-top leading-relaxed dark:border-border',
                    index === rows.length - 1 && 'rounded-b-lg pb-8',
                  )}
                >
                  <p>{t(`rows.${row.id}.us`)}</p>
                  <Link href={row.href} className={proofClass}>
                    {t(`rows.${row.id}.link`)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phones: one card with our answers, what is often offered elsewhere under each. */}
        <div className={cn(ours, 'mt-10 rounded-lg md:hidden')}>
          <div className="px-5 pt-6 pb-1">
            <CompanyLogo />
          </div>
          <ul>
            {rows.map((row) => (
              <li
                key={row.id}
                className="border-t border-white/15 px-5 py-5 first:border-t-0 dark:border-border"
              >
                <h3 className="text-ink-muted text-sm font-semibold dark:text-muted-foreground">
                  {t(`rows.${row.id}.topic`)}
                </h3>
                <p className="mt-1.5 leading-relaxed">{t(`rows.${row.id}.us`)}</p>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed dark:text-muted-foreground">
                  {t('often')}: {t(`rows.${row.id}.often`)}
                </p>
                <Link href={row.href} className={proofClass}>
                  {t(`rows.${row.id}.link`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
