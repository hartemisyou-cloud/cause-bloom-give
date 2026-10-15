import { describe, expect, it } from 'vitest';
import { checkoutUrl, donationAmounts } from '@/lib/checkout';
describe('Authorized checkout navigation', () => {
  it('uses each authorized amount and the exact checkout origin', () => {
    for (const amount of donationAmounts) {
      const url = new URL(checkoutUrl(amount, 'mateo', 'utm_source=qa&gclid=abc&redirect=https://other.example'));
      expect(url.origin).toBe('https://hopehumanfoundations.org');
      expect(url.pathname).toBe('/pay');
      expect(url.searchParams.get('amount')).toBe(String(amount));
      expect(url.searchParams.get('campaign')).toBe('mateo');
      expect(url.searchParams.get('utm_source')).toBe('qa');
      expect(url.searchParams.has('redirect')).toBe(false);
    }
  });
  it('rejects unsupported amounts and absent campaign', () => {
    expect(() => checkoutUrl(25, 'mateo')).toThrow();
    expect(() => checkoutUrl(100, '')).toThrow();
  });
});