import { describe, expect, it } from 'vitest';
import { getCampaign } from '@/lib/campaigns';
import { campaignActivity, donationHighlights } from '@/lib/campaign-social-proof';
import { parseCampaignStory } from '@/lib/campaign-story';

describe('Brittney campaign import', () => {
  it('keeps the GoFundMe goal and raised snapshot', () => {
    expect(getCampaign('brittney')).toMatchObject({ beneficiary: 'Brittney', goal: 55000, raised: 38989, category: 'health' });
  });
  it('has five photos, three inline in the story, and no surname', () => {
    const c = getCampaign('brittney')!;
    expect(c.gallery).toHaveLength(5);
    expect(parseCampaignStory(c.story).filter(b => b.kind === 'photo').map(b => b.photo)).toEqual(c.gallery.slice(2));
    expect(c.story).not.toContain('Salas');
  });
  it('retains the thirteen supplied donations and comments', () => {
    const a = campaignActivity(getCampaign('brittney')!);
    expect(a.donations).toHaveLength(13);
    expect(a.messages).toHaveLength(13);
    expect(a.donations.reduce((s, d) => s + d.amountCents, 0)).toBe(155000);
    expect(donationHighlights(a.donations).top?.name).toBe('William Foster');
  });
});
