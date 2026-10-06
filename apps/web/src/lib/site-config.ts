/** Public configuration, inlined at build time from NEXT_PUBLIC_* variables. */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  kioskUrl: process.env.NEXT_PUBLIC_KIOSK_URL ?? 'http://localhost:3001',
  playgroundUrl: process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? 'http://localhost:3002',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
} as const;
