import type { DemoEntry, Locale } from '@taksu/content';
import { siteConfig } from './site-config';

const trimSlash = (url: string) => url.replace(/\/+$/, '');

/** Absolute URL of a demo inside its demo app, with the locale prefix. */
export function demoUrl(demo: Pick<DemoEntry, 'app' | 'path'>, locale: Locale): string {
  const base = trimSlash(demo.app === 'kiosk' ? siteConfig.kioskUrl : siteConfig.playgroundUrl);
  return `${base}/${locale}${demo.path}`;
}

export function kioskLauncherUrl(locale: Locale): string {
  return `${trimSlash(siteConfig.kioskUrl)}/${locale}`;
}

/** wa.me deep link with a pre-filled message, or null when no number is configured. */
export function whatsappUrl(
  message: string,
  number: string = siteConfig.whatsappNumber,
): string | null {
  const digits = number.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
