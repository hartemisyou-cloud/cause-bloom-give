import { describe, expect, it } from 'vitest';
import records from '@/data/public-donations.json';
import campaigns from '@/data/campaigns.json';
import { campaignActivity, donationDate, recentDonationPresentation } from '@/lib/campaign-social-proof';

describe('Updated owner-supplied donation list', () => {
  it('covers every campaign with all 1711 supplied records', () => {
    expect(records).toHaveLength(1711);
    expect(new Set(records.map(record => record.campaignSlug))).toEqual(new Set(campaigns.map(campaign => campaign.slug)));
    expect(new Set(records.map(record => record.id)).size).toBe(1711);
  });

  it('keeps the explicitly identified Goyito lists separate', () => {
    const english = records.filter(record => record.campaignSlug === 'goyito');
    const alternate = records.filter(record => record.campaignSlug === 'goyito-es');
    expect(english).toHaveLength(14);
    expect(alternate).toHaveLength(11);
    expect(english[0]?.name).toBe('Elijah Morris');
    expect(alternate[0]?.name).toBe('Quinn Webster');
  });

  it('preserves supplied dates and amounts without inventing times', () => {
    expect(records.find(record => record.id === 'mateo-1')).toMatchObject({ name: 'Ariana Keller', amountCents: 5000, confirmedAt: '2026-11-03' });
    expect(records.find(record => record.id === 'mateo-3')?.confirmedAt).toBe('2026-11-02');
    expect(records.every(record => /^2026-(10|11)-\d{2}$/.test(record.confirmedAt))).toBe(true);
    expect(donationDate('2026-11-03')).toBe('Nov 3, 2026');
  });

  it('uses all supplied entries for both history and sidebar instead of generated fallback', () => {
    for (const campaign of campaigns) {
      const activity = campaignActivity(campaign);
      expect(activity.donations.length).toBe(records.filter(record => record.campaignSlug === campaign.slug).length);
      expect(recentDonationPresentation(activity)).toEqual({ illustrative: false, records: activity.donations });
    }
  });
});