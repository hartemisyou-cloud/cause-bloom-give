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
/** Shape of a Meta browser/click identifier (fb.1.<timestamp>.<id>). */
const metaBrowserIdPattern = /^fb\.1\.\d+\.\d+$/;
/** Read an existing Meta browser identifier (_fbp) without setting a cookie. */
export function readMetaFbp(): string | null {
  return readMetaCookie('_fbp');
}
/** Read the existing Meta click identifier (_fbc) so paid-click matching uses the real value. */
export function readMetaFbc(): string | null {
  return readMetaCookie('_fbc');
}
function readMetaCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  try {
    const prefix = `${name}=`;
    const cookie = document.cookie.split(';').map(value => value.trim()).find(value => value.startsWith(prefix));
    const value = cookie?.slice(prefix.length);
    return value && metaBrowserIdPattern.test(value) ? value : null;
  } catch { return null; }
}
/** Destination for a selected amount; the foundation site only redirects, never calls a payment provider. */
export function bookPurchaseUrl(amount: number, opts: { campaignSlug?: string; search?: string; refCodes?: Record<string, string>; fbp?: string | null; fbc?: string | null; esrc?: string | null } = {}): string {
  if (!isDonationAmount(amount)) throw new Error('Select a supported amount.');
  const base = `${bookPurchaseBase}/${bookSlugByAmount[amount]}`;
  const parts: string[] = [];
  const used = new Set<string>();
  const add = (k: string, v: string | null | undefined) => { if (!v || used.has(k)) return; used.add(k); parts.push(`${k}=${encodeURIComponent(v)}`); };
  const ref = opts.campaignSlug ? (opts.refCodes ?? campaignRefCodes)[opts.campaignSlug] : undefined;
  add('ref', ref);
  const current = new URLSearchParams(opts.search ?? '');
  for (const k of forwardedAttributionKeys) add(k, current.get(k)?.trim());
  if (opts.fbp && metaBrowserIdPattern.test(opts.fbp)) add('fbp', opts.fbp);
  if (opts.fbc && metaBrowserIdPattern.test(opts.fbc)) add('fbc', opts.fbc);
  if (opts.esrc) {
    try {
      const source = new URL(opts.esrc);
      if (source.protocol === 'https:' && (source.hostname === 'hopehumanfoundation.org' || source.hostname.endsWith('.hopehumanfoundation.org'))) add('esrc', opts.esrc);
    } catch { /* Invalid source URLs are omitted without interrupting checkout. */ }
  }
  return parts.length ? `${base}?${parts.join('&')}` : base;
}
