export type ActivityStatus = 'ready' | 'unavailable' | 'loading' | 'error';
export type PublicDonation = {
  id: string; campaignSlug: string; status: 'confirmed' | 'pending' | 'refunded';
  eligible: boolean; public: boolean; name: string; anonymous: boolean;
  amountVisible: boolean; amountCents: number; confirmedAt: string;
};
export type PublicSupportMessage = {
  id: string; campaignSlug: string; public: boolean; name: string; anonymous: boolean;
  message: string; createdAt?: string; donationId?: string;
};
export type CampaignActivity = {
  status: ActivityStatus; donations: readonly PublicDonation[];
  messages: readonly PublicSupportMessage[];
};
export const DONATION_PAGE_SIZE = 5;
export function publicDonations(records: readonly PublicDonation[], slug: string) {
  const seen = new Set<string>();
  return records.filter(d => {
    if (d.campaignSlug !== slug || d.status !== 'confirmed' || !d.eligible || !d.public || !d.id || seen.has(d.id) || !Number.isSafeInteger(d.amountCents) || d.amountCents <= 0 || !Number.isFinite(Date.parse(d.confirmedAt))) return false;
    seen.add(d.id); return true;
  }).sort((a, b) => Date.parse(b.confirmedAt) - Date.parse(a.confirmedAt) || a.id.localeCompare(b.id));
}
export function publicMessages(records: readonly PublicSupportMessage[], slug: string) {
  const seen = new Set<string>();
  return records.filter(m => {
    if (m.campaignSlug !== slug || !m.public || !m.message.trim() || !m.id || seen.has(m.id)) return false;
    seen.add(m.id); return true;
  }).sort((a, b) => (Date.parse(b.createdAt ?? '') || 0) - (Date.parse(a.createdAt ?? '') || 0));
}
export function donationPage(records: readonly PublicDonation[], sort: 'recent' | 'top', page: number) {
  const ordered = sort === 'top' ? records.filter(d => d.amountVisible).slice().sort((a, b) => b.amountCents - a.amountCents || Date.parse(b.confirmedAt) - Date.parse(a.confirmedAt)) : records.slice();
  const pages = Math.max(1, Math.ceil(ordered.length / DONATION_PAGE_SIZE));
  const current = Math.min(pages, Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1));
  return { items: ordered.slice((current - 1) * DONATION_PAGE_SIZE, current * DONATION_PAGE_SIZE), page: current, pages, total: ordered.length };
}
export function donationHighlights(records: readonly PublicDonation[]) {
  return { recent: records[0], top: donationPage(records, 'top', 1).items[0] };
}
export function donorName(d: { anonymous: boolean; name: string }) { return d.anonymous || !d.name.trim() ? 'Anonymous' : d.name; }
export function donationMoney(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
}
export function activityDate(value: string, now = Date.now()) {
  const date = Date.parse(value);
  if (!Number.isFinite(date)) return '';
  const minutes = Math.max(0, Math.floor((now - date) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (minutes < 1440) { const hours = Math.floor(minutes / 60); return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`; }
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
// Static campaign records provide support prose only; historical totals never become donor entries.
export function campaignActivity(campaign: { slug?: string; support: readonly { name: string; message: string }[] }): CampaignActivity {
  const slug = campaign.slug ?? '';
  const seen = new Set<string>();
  const messages = campaign.support.flatMap((m, index) => {
    const key = `${m.name}\n${m.message}`;
    if (seen.has(key) || !m.message.trim()) return [];
    seen.add(key);
    return [{ ...m, id: `source-support-${index}`, campaignSlug: slug, public: true, anonymous: !m.name.trim() || m.name === 'Anonymous' }];
  });
  return { status: 'unavailable', donations: [], messages };
}