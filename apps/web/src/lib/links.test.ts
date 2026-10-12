import { describe, expect, it } from 'vitest';
import { demoUrl, eduUrl, mailtoUrl, robotUrl, simulatorUrl, whatsappUrl } from './links';

describe('links', () => {
  it('builds localized demo URLs for both demo apps', () => {
    expect(demoUrl({ app: 'kiosk', path: '/kiosk/kantor-layanan' }, 'en')).toBe(
      'http://localhost:3001/en/kiosk/kantor-layanan',
    );
    expect(demoUrl({ app: 'sim', path: '?robot=sd' }, 'id')).toBe(
      'http://localhost:3002/id?robot=sd',
    );
  });

  it('links out to the product sites', () => {
    expect(eduUrl('id', '/kits/sd')).toBe('http://localhost:3003/id/kits/sd');
    expect(robotUrl('en')).toBe('http://localhost:3004/en');
  });

  it('deep-links into simulator missions', () => {
    expect(simulatorUrl('id', 'smp', 'smp-radar')).toBe(
      'http://localhost:3002/id?robot=smp&mission=smp-radar',
    );
    expect(simulatorUrl('en')).toBe('http://localhost:3002/en');
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
