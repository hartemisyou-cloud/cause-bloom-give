import { campaigns, type Campaign } from '@/lib/campaigns';

/** Round-robin genuine categories so smaller collections remain discoverable. */
export function diversifyCampaigns(source: Campaign[]): Campaign[] {
  const groups = new Map<string, Campaign[]>();
  for (const campaign of source) {
    const group = groups.get(campaign.category) ?? [];
    group.push(campaign);
    groups.set(campaign.category, group);
  }
  const result: Campaign[] = [];
  const largest = Math.max(0, ...Array.from(groups.values(), group => group.length));
  for (let index = 0; index < largest; index++) {
    for (const group of groups.values()) {
      const campaign = group[index];
      if (campaign) result.push(campaign);
    }
  }
  return result;
}

export function homepageCollections(source: Campaign[] = campaigns) {
  const ordered = diversifyCampaigns(source);
  // Keep the only animal campaign in the always-visible discovery section.
  const hero = ordered.filter(c => c.category !== 'animals').slice(0, 3);
  const heroSlugs = new Set(hero.map(c => c.slug));
  const remaining = ordered.filter(c => !heroSlugs.has(c.slug));
  return { hero, trending: remaining.slice(0, 18), featured: remaining.slice(18) };
}

export function campaignPage(source: Campaign[], page: number, size: number) {
  const pages = Math.max(1, Math.ceil(source.length / size));
  const current = Math.max(0, Math.min(page, pages - 1));
  return { items: source.slice(current * size, (current + 1) * size), pages, current };
}