import { kantorLayanan } from './kantor-layanan';
import { resort } from './resort';
import type { KioskSite } from './types';

export type * from './types';

/** Registered kiosk use-case samples. Append new samples here. */
export const kioskSites: readonly KioskSite[] = [kantorLayanan, resort];

export function getSite(slug: string): KioskSite | undefined {
  return kioskSites.find((site) => site.slug === slug);
}

/** Flattens an organisation tree depth-first. */
export function flattenOrganization(root: KioskSite['organization']): KioskSite['organization'][] {
  return [root, ...(root.children ?? []).flatMap(flattenOrganization)];
}
