export const donationAmounts = [20, 30, 50, 100, 250, 500] as const;
/** Secure checkout route; donation navigation opens from there. */
export const bookPurchaseBase = 'https://hopehumanbooks.com/comprar';
/** Maps each donation preset (USD) to the matching store product slug. */
export const bookSlugByAmount: Record<(typeof donationAmounts)[number], string> = {
  20: 'the-adventures-of-tom-sawyer',
  30: 'little-women',
  50: 'adventures-of-huckleberry-finn',
  100: 'moby-dick',
  250: 'american-classics-collection',
  500: 'american-classics-library',
};
/** Title shown for each preset on the purchase step. */
export const bookTitleByAmount: Record<(typeof donationAmounts)[number], string> = {
  20: 'The Adventures of Tom Sawyer — Mark Twain',
  30: 'Little Women — Louisa May Alcott',
  50: 'Adventures of Huckleberry Finn — Mark Twain',
  100: 'Moby-Dick — Herman Melville',
  250: 'American Classics Collection',
  500: 'American Classics Library',
};
export function isDonationAmount(value: unknown): value is (typeof donationAmounts)[number] {
  return typeof value === 'number' && donationAmounts.some(v => v === value);
}
/** Parses a search value (number or numeric string, possibly quoted) into a preset USD amount. */
export function parseDonationAmount(raw: unknown): number | undefined {
  const n = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw.replace(/^"|"$/g, '')) : NaN;
  return isDonationAmount(n) ? n : undefined;
}
/** Referral code per campaign slug. Configure once per campaign; campaigns without a code navigate unchanged. */
export const campaignRefCodes: Record<string, string> = {};
/** Attribution keys forwarded from the donate page URL to the store. */
export const forwardedAttributionKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'] as const;
/** Destination for a selected amount; the foundation site only redirects, never calls a payment provider. */
export function bookPurchaseUrl(amount: number, opts: { campaignSlug?: string; search?: string; refCodes?: Record<string, string> } = {}): string {
  if (!isDonationAmount(amount)) throw new Error('Select a supported amount.');
  const base = `${bookPurchaseBase}/${bookSlugByAmount[amount]}`;
  const parts: string[] = [];
  const used = new Set<string>();
  const add = (k: string, v: string | null | undefined) => { if (!v || used.has(k)) return; used.add(k); parts.push(`${k}=${encodeURIComponent(v)}`); };
  const ref = opts.campaignSlug ? (opts.refCodes ?? campaignRefCodes)[opts.campaignSlug] : undefined;
  add('ref', ref);
  const current = new URLSearchParams(opts.search ?? '');
  for (const k of forwardedAttributionKeys) add(k, current.get(k)?.trim());
  return parts.length ? `${base}?${parts.join('&')}` : base;
}
