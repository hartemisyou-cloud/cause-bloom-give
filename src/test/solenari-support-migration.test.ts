import { describe, expect, it } from 'vitest';
import audit from '../../outputs/campaign-social-proof/solenari-support-comparison.json';
import { campaigns, getCampaign } from '@/lib/campaigns';
import { campaignActivity, publicMessages } from '@/lib/campaign-social-proof';

describe('Campaign-specific Solenari support preservation', () => {
  it('preserves all eight Emma messages on help-emma, not help-emma-eb', () => {
    const emma = getCampaign('help-emma');
    const source = audit.campaigns.find(c => c.slug === 'help-emma');
    if (!emma || !source) throw new Error('Emma source mapping missing');
    expect(emma.support).toHaveLength(8);
    expect(emma.support).toEqual(source.sourceMessages);
    expect(getCampaign('help-emma-eb')?.support).toEqual([]);
  });

  it('preserves every source campaign association, author and message count', () => {
    expect(audit.campaigns).toHaveLength(54);
    expect(audit.campaigns.reduce((sum, c) => sum + c.sourceMessages.length, 0)).toBe(237);
    for (const source of audit.campaigns) {
      const campaign = campaigns.find(c => c.slug === source.slug);
      if (!campaign) throw new Error(`Missing campaign ${source.slug}`);
      expect(campaign.support).toEqual(source.displayMessages);
      expect(campaign.support.map(m => m.name)).toEqual(source.sourceMessages.map(m => m.name));
      if (source.verbatim) expect(campaign.support).toEqual(source.sourceMessages);
      const activity = campaignActivity(campaign);
      expect(publicMessages(activity.messages, campaign.slug)).toHaveLength(source.sourceMessages.length);
      expect(publicMessages(activity.messages, `${campaign.slug}-other`)).toEqual([]);
    }
  });

  it('does not turn source prose into confirmed donations or invented dates', () => {
    for (const campaign of campaigns) {
      const activity = campaignActivity(campaign);
      expect(activity.donations).toEqual([]);
      for (const message of activity.messages) {
        expect(message).not.toHaveProperty('createdAt');
        expect(message).not.toHaveProperty('donationId');
      }
    }
  });
});