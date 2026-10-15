export const donationAmounts = [20, 30, 50, 100, 250, 500] as const;
export function checkoutUrl(amount: number, slug: string, attribution = '') {
  if (!donationAmounts.some(value => value === amount) || !slug) throw new Error('Select a supported amount and campaign.');
  const url = new URL('https://hopehumanfoundations.org/pay');
  url.searchParams.set('amount', String(amount));
  url.searchParams.set('campaign', slug);
  const saved = new URLSearchParams(attribution);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
    const value = saved.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.href;
}
export const checkoutStartAction = 'https://www.hopehumanfoundations.org/api/public/pay/start';
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;
export type CheckoutPayload = { campaignSlug: string; amountCents: number; idempotencyKey: string; attribution?: Record<string, string> };
export function isDonationAmount(value: unknown): value is (typeof donationAmounts)[number] {
  return typeof value === 'number' && donationAmounts.some(v => v === value);
}
/** Parses a search value (number or numeric string, possibly quoted) into a preset USD amount. */
export function parseDonationAmount(raw: unknown): number | undefined {
  const n = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw.replace(/^"|"$/g, '')) : NaN;
  return isDonationAmount(n) ? n : undefined;
}
function snapshotAttribution(raw: string) {
  const saved = new URLSearchParams(raw); const out: Record<string, string> = {};
  for (const key of attributionKeys) { const v = saved.get(key); if (v) out[key] = v.slice(0, 200); }
  return Object.keys(out).length ? out : undefined;
}
function newKey() {
  const bytes = new Uint8Array(16); crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}
const memoryAttempts = new Map<string, string>();
type AttemptStore = Pick<Storage, 'getItem' | 'setItem'>;
function store(): AttemptStore {
  try { const s = window.sessionStorage; s.setItem('hope-probe', '1'); s.removeItem('hope-probe'); return s; }
  catch { return { getItem: k => memoryAttempts.get(k) ?? null, setItem: (k, v) => { memoryAttempts.set(k, v); } }; }
}
/** Returns the persisted attempt for this campaign+amount, creating it once. Retries reuse the same payload and key. */
export function checkoutAttempt(slug: string, amount: number, s: AttemptStore = store()): CheckoutPayload {
  if (!isDonationAmount(amount) || !slug) throw new Error('Select a supported amount and campaign.');
  const id = `hope-checkout:${slug}:${amount}`;
  try {
    const existing = JSON.parse(s.getItem(id) ?? 'null') as CheckoutPayload | null;
    if (existing && existing.campaignSlug === slug && existing.amountCents === amount * 100 && typeof existing.idempotencyKey === 'string') return existing;
  } catch { /* Corrupt record: replace below. */ }
  let rawAttribution = '';
  try { rawAttribution = window.sessionStorage.getItem('hope-attribution') ?? ''; } catch { /* Attribution is optional. */ }
  const attribution = snapshotAttribution(rawAttribution);
  const payload: CheckoutPayload = { campaignSlug: slug, amountCents: amount * 100, idempotencyKey: newKey(), ...(attribution ? { attribution } : {}) };
  s.setItem(id, JSON.stringify(payload));
  return payload;
}
