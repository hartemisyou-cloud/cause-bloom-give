import { describe, expect, it } from 'vitest';
import { getCampaign, filterCampaigns } from '@/lib/campaigns';
import { campaignActivity, donationHighlights, recentDonationPresentation } from '@/lib/campaign-social-proof';

describe('Owner-supplied Livia campaign', () => {
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
      ['Test Donor 01', 25000, '2026-11-06'], ['Test Donor 02', 5000, '2026-11-06'],
      ['Test Donor 03', 3000, '2026-11-06'], ['Test Donor 04', 10000, '2026-11-05'],
      ['Test Donor 05', 2000, '2026-11-05'], ['Test Donor 06', 50000, '2026-11-05'],
      ['Test Donor 07', 5000, '2026-11-04'], ['Test Donor 08', 3000, '2026-11-04'],
      ['Test Donor 09', 25000, '2026-11-03'], ['Test Donor 10', 2000, '2026-11-03'],
      ['Test Donor 11', 10000, '2026-11-02'], ['Test Donor 12', 5000, '2026-11-02'],
      ['Test Donor 13', 3000, '2026-11-01'],
    ]);
    expect(activity.messages.every(m => activity.donations.some(d => d.id === m.donationId && d.name === m.name && d.confirmedAt === m.createdAt))).toBe(true);
    expect(activity.messages[0]?.message).toBe('Sending strength and love to this family. I hope this helps ease the burden of cancer treatment.');
    expect(recentDonationPresentation(activity)).toEqual({ illustrative: false, records: activity.donations });
    expect(donationHighlights(activity.donations).top?.name).toBe('Test Donor 06');
  });
});