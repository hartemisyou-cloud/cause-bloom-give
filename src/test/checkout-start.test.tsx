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
  const refCodes = { mateo: 'MAT01' };
  it('appends ref and fbclid when the campaign has a configured code', () => {
    expect(bookPurchaseUrl(30, { campaignSlug: 'mateo', fbclid: 'abc123', refCodes }))
      .toBe('https://hopehumanbooks.com/comprar/little-women?ref=MAT01&fbclid=abc123');
  });
  it('appends only ref when there is no fbclid', () => {
    expect(bookPurchaseUrl(20, { campaignSlug: 'mateo', refCodes }))
      .toBe('https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer?ref=MAT01');
  });
  it('navigates unchanged when the campaign has no ref code', () => {
    expect(bookPurchaseUrl(100, { campaignSlug: 'unknown', fbclid: 'abc123', refCodes }))
      .toBe('https://hopehumanbooks.com/comprar/moby-dick');
  });
});
