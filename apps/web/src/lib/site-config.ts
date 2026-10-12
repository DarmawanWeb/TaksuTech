/** Public configuration, inlined at build time from NEXT_PUBLIC_* variables. */
export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_COMPANY_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000',
  eduUrl: process.env.NEXT_PUBLIC_EDU_URL ?? 'http://localhost:3003',
  robotUrl: process.env.NEXT_PUBLIC_ROBOT_URL ?? 'http://localhost:3004',
  kioskUrl: process.env.NEXT_PUBLIC_KIOSK_URL ?? 'http://localhost:3001',
  simUrl: process.env.NEXT_PUBLIC_SIM_URL ?? 'http://localhost:3002',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
} as const;
