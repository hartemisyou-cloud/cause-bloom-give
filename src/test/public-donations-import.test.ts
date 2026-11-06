import { describe, expect, it } from 'vitest';
import records from '@/data/public-donations.json';
import campaigns from '@/data/campaigns.json';
import { campaignActivity, donationDate, recentDonationPresentation } from '@/lib/campaign-social-proof';

describe('Updated owner-supplied donation list', () => {
  it('covers the original 147 campaigns with all 2119 replacement donation/comment pairs', () => {
    expect(records).toHaveLength(2119);
    expect(new Set(records.map(record => record.campaignSlug))).toEqual(new Set(campaigns.filter(c => c.slug !== 'livia').map(campaign => campaign.slug)));
    expect(new Set(records.map(record => record.id)).size).toBe(2119);
    expect(records.every(record => record.comment.trim().length > 0)).toBe(true);
  });

  it('keeps the explicitly identified Goyito lists separate', () => {
    const english = records.filter(record => record.campaignSlug === 'goyito');
    const alternate = records.filter(record => record.campaignSlug === 'goyito-es');
    expect(english).toHaveLength(16);
    expect(alternate).toHaveLength(13);
    expect(english[0]?.name).toBe('Lara Marshall');
    expect(alternate[0]?.name).toBe('Tara Scott');
  });

  it('preserves supplied dates and amounts without inventing times', () => {
    expect(records.find(record => record.id === 'mateo-1')).toMatchObject({ name: 'Seth Holland', amountCents: 25000, confirmedAt: '2026-11-02', comment: "This is a cause worth showing up for. Wishing success in securing Mateo's stage-four cancer treatment." });
    expect(records.find(record => record.id === 'mateo-3')?.confirmedAt).toBe('2026-11-02');
    expect(records.every(record => /^2026-(10|11)-\d{2}$/.test(record.confirmedAt))).toBe(true);
    expect(donationDate('2026-11-03')).toBe('Nov 3, 2026');
  });

  it('uses all supplied entries for both history and sidebar instead of generated fallback', () => {
    for (const campaign of campaigns.filter(c => c.slug !== 'livia')) {
      const activity = campaignActivity(campaign);
      expect(activity.donations.length).toBe(records.filter(record => record.campaignSlug === campaign.slug).length);
      expect(activity.messages.length).toBe(activity.donations.length);
      for (const message of activity.messages) {
        const supplied = records.find(record => record.id === message.donationId);
        expect(supplied).toBeDefined();
        expect(message).toMatchObject({ campaignSlug: supplied?.campaignSlug, name: supplied?.name, message: supplied?.comment, createdAt: supplied?.confirmedAt });
      }
      expect(recentDonationPresentation(activity)).toEqual({ illustrative: false, records: activity.donations });
    }
  });
});