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