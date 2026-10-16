export const locales = ['id', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'id';

/** Display names shown in language switchers, written in their own language. */
export const localeLabels: Record<Locale, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

/** A value that exists in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Picks the value for `locale`, falling back to the default locale. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[defaultLocale];
}
