import { describe, expect, it } from 'vitest';
import { campaigns } from '@/lib/campaigns';
import { campaignPage, diversifyCampaigns, homepageCollections } from '@/lib/home-campaigns';

describe('Homepage campaign discovery', () => {
  it('makes all 55 real campaigns reachable without duplicates across collections', () => {
    const { hero, trending, featured } = homepageCollections();
    const all = [...hero, ...trending, ...featured];
    expect(all).toHaveLength(55);
    expect(new Set(all.map(c => c.slug)).size).toBe(55);
    expect(all.map(c => c.slug).sort()).toEqual(campaigns.map(c => c.slug).sort());
  });
  it('includes all three populated categories in the first trending group', () => {
    expect(new Set(homepageCollections().trending.slice(0, 6).map(c => c.category))).toEqual(new Set(['health', 'children', 'animals']));
  });
  it('reorders discovery without changing original records or order', () => {
    const before = JSON.stringify(campaigns);
    diversifyCampaigns(campaigns);
    expect(JSON.stringify(campaigns)).toBe(before);
  });
  it('reaches every featured campaign through eight-item pages, including the final partial page', () => {
    const { featured } = homepageCollections();
    const collected = Array.from({ length: campaignPage(featured, 0, 8).pages }, (_, page) => campaignPage(featured, page, 8).items).flat();
    expect(collected.map(c => c.slug)).toEqual(featured.map(c => c.slug));
    expect(campaignPage(featured, 999, 8).current).toBe(4);
    expect(campaignPage([], 3, 8)).toEqual({ items: [], pages: 1, current: 0 });
  });
});