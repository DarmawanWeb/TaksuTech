import { educationLevels, guides, robots } from '@taksu/content';
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';

const staticPaths = [
  '',
  '/reception',
  '/reception/compare',
  '/reception/aksara-bali',
  '/education',
  '/education/curriculum',
  '/education/guides',
  '/education/simulator',
  '/education/custom',
  '/demo',
  '/about',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...robots.map((robot) => `/reception/${robot.slug}`),
    ...educationLevels.flatMap((level) => [
      `/education/${level.slug}`,
      `/education/curriculum/${level.slug}`,
    ]),
    ...guides.map((guide) => `/education/guides/${guide.slug}`),
  ];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((entry) => [entry, `${siteConfig.url}/${entry}${path}`]),
        ),
      },
    })),
  );
}
