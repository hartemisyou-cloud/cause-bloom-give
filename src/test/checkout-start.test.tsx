import { describe, expect, it, vi } from 'vitest';
import { bookPurchaseUrl, bookSlugByAmount, donationAmounts, parseDonationAmount, readMetaFbc, readMetaFbp } from '@/lib/checkout';
describe('Book purchase redirect', () => {
  it('appends a valid fbp after unchanged referral and attribution keys', () => {
    expect(bookPurchaseUrl(20, { campaignSlug: 'mateo', refCodes: { mateo: 'MAT01' }, search: '?utm_source=facebook&utm_medium=paid&utm_campaign=test&utm_content=creative&utm_term=term&fbclid=f1&gclid=g1', fbp: 'fb.1.1793924640000.123456' }))
      .toBe('https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer?ref=MAT01&utm_source=facebook&utm_medium=paid&utm_campaign=test&utm_content=creative&utm_term=term&fbclid=f1&gclid=g1&fbp=fb.1.1793924640000.123456');
  });
  it('appends a valid fbc after fbp', () => {
    expect(bookPurchaseUrl(20, { search: '?fbclid=f1', fbp: 'fb.1.1793924640000.123456', fbc: 'fb.1.1793924640001.987' }))
      .toBe('https://hopehumanbooks.com/comprar/the-adventures-of-tom-sawyer?fbclid=f1&fbp=fb.1.1793924640000.123456&fbc=fb.1.1793924640001.987');
  });
  it.each([null, '', 'fb.2.123.456', 'fb.1.abc.456', ' fb.1.123.456'])('omits invalid fbc %s', fbc => {
    expect(bookPurchaseUrl(50, { fbc })).toBe(bookPurchaseUrl(50));
  });
  it.each([null, '', 'fb.2.123.456', 'fb.1.abc.456', 'fb.1.123.456.extra', ' fb.1.123.456'])('omits invalid fbp %s', fbp => {
    expect(bookPurchaseUrl(50, { fbp })).toBe(bookPurchaseUrl(50));
  });
  it.each(['https://hopehumanfoundation.org/donate?slug=mateo&amount=50', 'https://www.hopehumanfoundation.org/donate?slug=mateo'])('appends a foundation HTTPS source %s after fbp', esrc => {
    const url = new URL(bookPurchaseUrl(50, { fbp: 'fb.1.123.456', esrc }));
    expect([...url.searchParams.keys()]).toEqual(['fbp', 'esrc']);
    expect(url.searchParams.get('esrc')).toBe(esrc);
  });
  it.each([null, '', 'not a URL', 'http://hopehumanfoundation.org/donate', 'https://foreign.org/donate', 'https://hopehumanfoundation.org.evil.org/donate', 'https://fakehopehumanfoundation.org/donate'])('omits invalid source %s without throwing', esrc => {
    expect(bookPurchaseUrl(50, { esrc })).toBe(bookPurchaseUrl(50));
  });
  it('reads only a valid existing _fbp cookie and is SSR-safe', () => {
    try {
      vi.stubGlobal('document', undefined);
      expect(readMetaFbp()).toBeNull();
      vi.stubGlobal('document', { cookie: 'other=1; _fbp=fb.1.123.456; last=2' });
      expect(readMetaFbp()).toBe('fb.1.123.456');
      vi.stubGlobal('document', { cookie: '_fbp=invalid' });
      expect(readMetaFbp()).toBeNull();
      vi.stubGlobal('document', { cookie: 'other_fbp=fb.1.123.456' });
      expect(readMetaFbp()).toBeNull();
    } finally { vi.unstubAllGlobals(); }
  });
  it('reads only a valid existing _fbc cookie and is SSR-safe', () => {
    try {
      vi.stubGlobal('document', undefined);
      expect(readMetaFbc()).toBeNull();
      vi.stubGlobal('document', { cookie: 'other=1; _fbc=fb.1.179.456; last=2' });
      expect(readMetaFbc()).toBe('fb.1.179.456');
      vi.stubGlobal('document', { cookie: '_fbc=invalid' });
      expect(readMetaFbc()).toBeNull();
      vi.stubGlobal('document', { cookie: 'other_fbc=fb.1.123.456' });
      expect(readMetaFbc()).toBeNull();
    } finally { vi.unstubAllGlobals(); }
  });
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
