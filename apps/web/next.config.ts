import path from 'node:path';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
/** Blog posts are MDX files under src/content/blog. */
const withMDX = createMDX({ extension: /\.mdx$/ });
const monorepoRoot = path.join(process.cwd(), '../..');
const trimSlash = (url: string) => url.replace(/\/+$/, '');

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: monorepoRoot,
  turbopack: { root: monorepoRoot },
  transpilePackages: ['@taksu/ui', '@taksu/bali', '@taksu/content'],
  poweredByHeader: false,
  agentRules: false,
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    // The product lines moved to their own sites; keep old links working.
    const edu = trimSlash(process.env.NEXT_PUBLIC_EDU_URL ?? 'http://localhost:3003');
    const robot = trimSlash(process.env.NEXT_PUBLIC_ROBOT_URL ?? 'http://localhost:3004');
    const locale = '/:locale(id|en)';
    const moved: [string, string][] = [
      [`${locale}/robots`, `${robot}/:locale`],
      [`${locale}/robots/:slug`, `${robot}/:locale/:slug`],
      [`${locale}/reception`, `${robot}/:locale`],
      [`${locale}/reception/:path*`, `${robot}/:locale/:path*`],
      [`${locale}/education`, `${edu}/:locale`],
      [`${locale}/education/custom`, `${edu}/:locale/schools`],
      [`${locale}/education/:level(sd|smp|sma)`, `${edu}/:locale/kits/:level`],
      [`${locale}/education/:path*`, `${edu}/:locale/:path*`],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default withNextIntl(withMDX(nextConfig));
