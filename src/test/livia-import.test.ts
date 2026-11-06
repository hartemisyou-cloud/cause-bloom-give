import { describe, expect, it } from 'vitest';
import { getCampaign, filterCampaigns } from '@/lib/campaigns';
import { campaignActivity, donationHighlights, recentDonationPresentation } from '@/lib/campaign-social-proof';
import { parseCampaignStory } from '@/lib/campaign-story';

describe('Owner-supplied Livia campaign', () => {
  it('includes all five uploaded photos and places the three hospital photos within the story', () => {
    const campaign = getCampaign('livia');
    if (!campaign) throw new Error('Livia campaign missing');
    expect(campaign.gallery).toHaveLength(5);
    expect(campaign.image).toEqual(campaign.gallery[0]);
    const photos = parseCampaignStory(campaign.story).filter(block => block.kind === 'photo');
    expect(campaign.image.url).toContain('livia-hospital-chemotherapy.webp');
    expect(photos.map(block => block.photo)).toEqual([campaign.gallery[0], ...campaign.gallery.slice(3)]);
    expect(photos.map(block => block.sourcePath)).toEqual([
      'uploads/campaigns/livia/livia-hospital-chemotherapy.webp',
      'uploads/campaigns/livia/livia-hospital-care.webp',
      'uploads/campaigns/livia/livia-hospital-infusion.webp',
    ]);
  });
  it('retains Livia as beneficiary and David as organizer', () => {
    expect(getCampaign('livia')).toMatchObject({ beneficiary: 'Livia', organizer: 'David', category: 'health' });
  });
  it('preserves the owner-reported USD 68,000 goal', () => {
    expect(getCampaign('livia')?.goal).toBe(68000);
    expect(getCampaign('livia')?.sourceGoal).toBe(68000);
  });
  it('preserves USD 4,943 previous fundraising without inventing individual records', () => {
    const campaign = getCampaign('livia');
    if (!campaign) throw new Error('Livia campaign missing');
    expect(campaign.raised).toBe(4943);
    expect(campaign.sourceRaised).toBe(4943);
    expect(campaignActivity(campaign).donations).toHaveLength(13);
    expect(campaignActivity(campaign).messages).toHaveLength(13);
  });
  it('makes Livia discoverable through the health filter', () => {
    expect(filterCampaigns({ query: 'Livia', category: 'health' }).map(c => c.slug)).toContain('livia');
  });
  it('retains all thirteen owner-supplied names, amounts and calendar dates', () => {
    const campaign = getCampaign('livia');
    if (!campaign) throw new Error('Livia campaign missing');
    const activity = campaignActivity(campaign);
    expect(activity.donations.map(d => [d.name, d.amountCents, d.confirmedAt])).toEqual([
      ['Emily Carter', 25000, '2026-11-06'], ['James Anderson', 5000, '2026-11-06'],
      ['Olivia Bennett', 3000, '2026-11-06'], ['Michael Thompson', 10000, '2026-11-05'],
      ['Sarah Mitchell', 2000, '2026-11-05'], ['William Parker', 50000, '2026-11-05'],
      ['Jessica Morgan', 5000, '2026-11-04'], ['Daniel Brooks', 3000, '2026-11-04'],
      ['Charlotte Evans', 25000, '2026-11-03'], ['Benjamin Foster', 2000, '2026-11-03'],
      ['Rachel Sullivan', 10000, '2026-11-02'], ['Christopher Hayes', 5000, '2026-11-02'],
      ['Lauren Phillips', 3000, '2026-11-01'],
    ]);
    expect(activity.messages.every(m => activity.donations.some(d => d.id === m.donationId && d.name === m.name && d.confirmedAt === m.createdAt))).toBe(true);
    expect(activity.messages[0]?.message).toBe('Sending strength and love to this family. I hope this helps ease the burden of cancer treatment.');
    expect(recentDonationPresentation(activity)).toEqual({ illustrative: false, records: activity.donations });
    expect(donationHighlights(activity.donations).top?.name).toBe('William Parker');
  });
});