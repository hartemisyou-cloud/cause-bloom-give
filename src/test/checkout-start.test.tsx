import { describe, expect, it, beforeEach } from 'vitest';
import { checkoutAttempt, checkoutStartAction, donationAmounts, parseDonationAmount } from '@/lib/checkout';
const mem = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); } }; };
describe('Direct checkout start', () => {
  beforeEach(() => sessionStorage.clear());
  it('posts to the exact start endpoint with an exact USD-cent payload for all six presets', () => {
    expect(checkoutStartAction).toBe('https://www.hopehumanfoundations.org/api/public/pay/start');
    sessionStorage.setItem('hope-attribution', 'utm_source=qa&gclid=abc&redirect=https://x.example');
    for (const amount of donationAmounts) {
      const p = checkoutAttempt('mateo', amount, mem());
      expect(Object.keys(p).sort()).toEqual(['amountCents', 'attribution', 'campaignSlug', 'idempotencyKey']);
      expect(p.amountCents).toBe(amount * 100);
      expect(p.attribution).toEqual({ utm_source: 'qa', gclid: 'abc' });
      expect(p.idempotencyKey).toMatch(/^[0-9a-f]{32}$/);
    }
  });
  it('reuses the same attempt on retry and separates distinct selections', () => {
    const s = mem();
    const a = checkoutAttempt('mateo', 50, s);
    sessionStorage.setItem('hope-attribution', 'utm_source=later');
    expect(checkoutAttempt('mateo', 50, s)).toEqual(a);
    expect(checkoutAttempt('mateo', 100, s).idempotencyKey).not.toBe(a.idempotencyKey);
    expect(checkoutAttempt('graceline', 50, s).idempotencyKey).not.toBe(a.idempotencyKey);
  });
  it('restores only valid preset amounts from the error return', () => {
    expect(parseDonationAmount('100')).toBe(100);
    expect(parseDonationAmount('"250"')).toBe(250);
    expect(parseDonationAmount(25)).toBeUndefined();
    expect(() => checkoutAttempt('mateo', 25, mem())).toThrow();
  });
});
