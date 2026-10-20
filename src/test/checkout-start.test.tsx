import { describe, expect, it } from 'vitest';
import { checkoutAttempt, checkoutStartAction, donationAmounts, parseDonationAmount } from '@/lib/checkout';

function fakeStore() {
  const map = new Map<string, string>();
  return { getItem: (k: string) => map.get(k) ?? null, setItem: (k: string, v: string) => { map.set(k, v); } };
}

describe('Direct checkout start', () => {
  it('targets the authorized Hope Human Books checkout start endpoint', () => {
    expect(checkoutStartAction).toBe('https://hopehumanbooks.com/donations/start');
  });
  it('builds the payload with campaignSlug, amountCents in cents and an idempotency key', () => {
    const payload = checkoutAttempt('mateo', 30, fakeStore());
    expect(payload.campaignSlug).toBe('mateo');
    expect(payload.amountCents).toBe(3000);
    expect(payload.idempotencyKey).toMatch(/^[0-9a-f]{32}$/);
  });
  it('reuses the same payload and key on retry for the same selection', () => {
    const store = fakeStore();
    expect(checkoutAttempt('mateo', 30, store)).toEqual(checkoutAttempt('mateo', 30, store));
    expect(checkoutAttempt('mateo', 20, store).idempotencyKey).not.toBe(checkoutAttempt('mateo', 30, store).idempotencyKey);
  });
  it('snapshots only the seven allowed attribution keys, once each', () => {
    window.sessionStorage.setItem('hope-attribution', 'utm_source=facebook&utm_source=second&utm_campaign=demo%20%C3%A1&fbclid=abc&csid=untracked');
    const payload = checkoutAttempt('mateo', 50, fakeStore());
    expect(payload.attribution).toEqual({ utm_source: 'facebook', utm_campaign: 'demo á', fbclid: 'abc' });
    window.sessionStorage.removeItem('hope-attribution');
  });
  it('rejects unsupported amounts and restores only valid presets', () => {
    expect(() => checkoutAttempt('mateo', 25, fakeStore())).toThrow();
    expect(() => checkoutAttempt('', 30, fakeStore())).toThrow();
    expect(parseDonationAmount('100')).toBe(100);
    expect(parseDonationAmount('"250"')).toBe(250);
    expect(parseDonationAmount(25)).toBeUndefined();
  });
});
