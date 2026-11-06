import { describe, expect, it } from 'vitest';
import { getCampaign, filterCampaigns } from '@/lib/campaigns';
import { campaignActivity } from '@/lib/campaign-social-proof';

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
    expect(campaignActivity(campaign).donations).toEqual([]);
    expect(campaignActivity(campaign).messages).toEqual([]);
  });
  it('makes Livia discoverable through the health filter', () => {
    expect(filterCampaigns({ query: 'Livia', category: 'health' }).map(c => c.slug)).toContain('livia');
  });
});