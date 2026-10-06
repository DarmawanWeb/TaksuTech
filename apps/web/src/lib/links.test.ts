import { describe, expect, it } from 'vitest';
import { demoUrl, mailtoUrl, whatsappUrl } from './links';

describe('links', () => {
  it('builds localized demo URLs for both demo apps', () => {
    expect(demoUrl({ app: 'kiosk', path: '/timo/kantor-layanan' }, 'en')).toBe(
      'http://localhost:3001/en/timo/kantor-layanan',
    );
    expect(demoUrl({ app: 'playground', path: '?track=sd' }, 'id')).toBe(
      'http://localhost:3002/id?track=sd',
    );
  });

  it('only builds WhatsApp links when a number is configured', () => {
    expect(whatsappUrl('Halo', '')).toBeNull();
    expect(whatsappUrl('Halo Taksu', '+62 812-0000')).toBe(
      'https://wa.me/628120000?text=Halo%20Taksu',
    );
  });

  it('encodes mailto fields', () => {
    expect(mailtoUrl('a@b.co', 'Demo robot', 'Halo & salam')).toBe(
      'mailto:a@b.co?subject=Demo%20robot&body=Halo%20%26%20salam',
    );
  });
});
