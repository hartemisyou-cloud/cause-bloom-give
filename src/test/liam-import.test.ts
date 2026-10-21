import { describe, expect, it } from 'vitest';
import { filterCampaigns, getCampaign, percentage } from '@/lib/campaigns';
import { homepageCollections } from '@/lib/home-campaigns';
import { parseCampaignStory } from '@/lib/campaign-story';

const slug = 'help-jazlyns-baby-boy-fight-cystic-fibrosis';
describe('Authorized Liam campaign migration', () => {
  it('preserves the source funding snapshot, creation date and category', () => {
    const campaign = getCampaign(slug);
    expect(campaign).toMatchObject({ raised: 4298, goal: 7500, sourceRaised: 4298, sourceGoal: 7500, snapshotDate: '2026-10-21', createdAt: '2026-06-03', category: 'children', urgent: true });
    if (!campaign) throw new Error('Missing imported campaign');
    expect(percentage(campaign)).toBe(57);
  });
  it('retains four gallery photos and the second and third photos inline in source order', () => {
    const campaign = getCampaign(slug);
    if (!campaign) throw new Error('Missing imported campaign');
    expect(campaign.gallery).toHaveLength(4);
    expect(parseCampaignStory(campaign.story).filter(block => block.kind === 'photo').map(block => block.photo)).toEqual([campaign.gallery[1], campaign.gallery[2]]);
    expect(campaign.support).toEqual([]);
  });
  it('is reachable through directory search and exactly once on the homepage', () => {
    expect(filterCampaigns({ query: 'Liam', category: 'children' }).map(campaign => campaign.slug)).toContain(slug);
    const { hero, trending, featured } = homepageCollections();
    expect([...hero, ...trending, ...featured].filter(campaign => campaign.slug === slug)).toHaveLength(1);
  });
});