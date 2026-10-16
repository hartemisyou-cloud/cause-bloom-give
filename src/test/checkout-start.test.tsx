import { describe, expect, it } from 'vitest';
import { bookPurchaseUrl, bookSlugByAmount, donationAmounts, parseDonationAmount } from '@/lib/checkout';
describe('Book purchase redirect', () => {
  it('maps each preset to the exact Hope Human Books slug', () => {
    expect(bookSlugByAmount).toEqual({
      20: 'the-adventures-of-tom-sawyer',
      30: 'little-women',
      50: 'adventures-of-huckleberry-finn',
      100: 'moby-dick',
      250: 'american-classics-collection',
      500: 'american-classics-library',
    });
    for (const amount of donationAmounts) {
      expect(bookPurchaseUrl(amount)).toBe(`https://hopehumanbooks.com/comprar/${bookSlugByAmount[amount]}`);
    }
  });
  it('rejects unsupported amounts and restores only valid presets', () => {
    expect(() => bookPurchaseUrl(25)).toThrow();
    expect(parseDonationAmount('100')).toBe(100);
    expect(parseDonationAmount('"250"')).toBe(250);
    expect(parseDonationAmount(25)).toBeUndefined();
  });
});
