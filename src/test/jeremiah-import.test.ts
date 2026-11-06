import { describe, expect, it } from 'vitest';
import { getCampaign, filterCampaigns } from '@/lib/campaigns';
import { campaignActivity, donationHighlights, recentDonationPresentation } from '@/lib/campaign-social-proof';
import { parseCampaignStory } from '@/lib/campaign-story';

describe('Jeremiah campaign import', () => {
  it('preserves the owner-corrected fundraising and goal separately from the supplied donations', () => {
    expect(getCampaign('jeremiah')).toMatchObject({ beneficiary: 'Jeremiah', organizer: 'Jj Chiles and Niecy Rickerson', goal: 130000, raised: 12435, sourceGoal: 130000, sourceRaised: 12435, snapshotDate: '2026-11-06' });
  });
  it('includes four original photos and two hospital/recovery story photos', () => {
    const campaign = getCampaign('jeremiah');
    if (!campaign) throw new Error('Jeremiah missing');
    expect(campaign.gallery).toHaveLength(4);
    expect(campaign.image).toEqual(campaign.gallery[0]);
    expect(parseCampaignStory(campaign.story).filter(b => b.kind === 'photo').map(b => b.photo)).toEqual(campaign.gallery.slice(2));
    expect(campaign.story).toContain('**he graduated from high school in June 2024.**');
    expect(filterCampaigns({ query: 'Jeremiah', category: 'health' }).map(c => c.slug)).toContain('jeremiah');
  });
  it('retains all thirteen names, cent amounts and original calendar dates', () => {
    const campaign = getCampaign('jeremiah');
    if (!campaign) throw new Error('Jeremiah missing');
    const activity = campaignActivity(campaign);
    expect(activity.donations.map(d => [d.name, d.amountCents, d.confirmedAt])).toEqual([
      ['Amanda Reynolds', 25000, '2026-11-06'], ['Brandon Mitchell', 5000, '2026-11-06'],
      ['Sophia Bennett', 10000, '2026-11-06'], ['Nathan Brooks', 3000, '2026-11-06'],
      ['Olivia Harrison', 2000, '2026-11-05'], ['Christopher Wilson', 50000, '2026-11-05'],
      ['Emily Parker', 5000, '2026-11-05'], ['Matthew Collins', 10000, '2026-11-04'],
      ['Rachel Thompson', 3000, '2026-11-04'], ['Daniel Foster', 25000, '2026-11-03'],
      ['Jessica Morgan', 2000, '2026-11-03'], ['William Anderson', 5000, '2026-11-02'],
      ['Lauren Edwards', 10000, '2026-11-01'],
    ]);
    expect(activity.messages).toHaveLength(13);
    expect(activity.messages[0]?.message).toBe('Jeremiah, your determination to walk again is incredible. Wishing you strength through every step of your recovery.');
    expect(activity.messages[12]?.message).toBe('Jeremiah, I hope your story reaches many more people who can help you continue receiving care.');
    expect(activity.messages.every(m => activity.donations.some(d => d.id === m.donationId && d.name === m.name && d.confirmedAt === m.createdAt))).toBe(true);
    expect(donationHighlights(activity.donations).top?.name).toBe('Christopher Wilson');
    expect(recentDonationPresentation(activity)).toEqual({ illustrative: false, records: activity.donations });
  });
});