import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';

const staticPaths = ['', '/services', '/demo', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.flatMap((path) =>
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
