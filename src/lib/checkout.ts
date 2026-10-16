export const donationAmounts = [20, 30, 50, 100, 250, 500] as const;
/** Purchase route on the Hope Human bookstore; secure checkout opens from there. */
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
/** Destination for a selected amount; the foundation site only redirects, never calls a payment provider. */
export function bookPurchaseUrl(amount: number): string {
  if (!isDonationAmount(amount)) throw new Error('Select a supported amount.');
  return `${bookPurchaseBase}/${bookSlugByAmount[amount]}`;
}
