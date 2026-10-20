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
  it('forwards encoded attribution from the current URL', () => {
    expect(bookPurchaseUrl(30, { search: '?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo%20%C3%A1&utm_content=c1&fbclid=abc123&x=1' }))
      .toBe('https://hopehumanbooks.com/comprar/little-women?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo%20%C3%A1&utm_content=c1&fbclid=abc123');
  });
  it('keeps the plain URL without attribution or ref', () => {
    expect(bookPurchaseUrl(100, { search: '?utm_source=&other=1' })).toBe('https://hopehumanbooks.com/comprar/moby-dick');
  });
  it('appends ref first when configured', () => {
    expect(bookPurchaseUrl(20, { campaignSlug: 'mateo', search: '?gclid=g1', refCodes: { mateo: 'MAT01' } }))
      .toBe('https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer?ref=MAT01&gclid=g1');
  });
  it('forwards only the seven allowed nonempty keys, once each, without replacing the campaign UTM',()=>{
    const url=new URL(bookPurchaseUrl(50,{campaignSlug:'mateo',search:'?utm_source=first&utm_source=second&utm_medium=paid&utm_campaign=original&utm_content=creative&utm_term=term&fbclid=f&gclid=g&amount=500&campaign=fake&csid=untrusted&ref=fake'}));
    expect([...url.searchParams.keys()]).toEqual(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid']);
    expect(url.searchParams.getAll('utm_source')).toEqual(['first']);expect(url.searchParams.get('utm_campaign')).toBe('original');expect(url.pathname).toBe('/comprar/adventures-of-huckleberry-finn');
  });
});
