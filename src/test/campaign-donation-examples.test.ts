import { describe, expect, it } from 'vitest';
import { campaigns } from '@/lib/campaigns';
import { campaignDonationExamples } from '@/lib/campaign-donation-examples';
import { campaignActivity, publicDonations, recentDonationPresentation, donationPage, type PublicDonation } from '@/lib/campaign-social-proof';

const real: PublicDonation = { id: 'confirmed-1', campaignSlug: 'future-campaign', status: 'confirmed', eligible: true, public: true, name: 'Actual donor', anonymous: false, amountVisible: true, amountCents: 2050, confirmedAt: '2026-10-25T12:00:00Z' };

describe('Global illustrative donation fallback', () => {
  it('provides 5–10 campaign-bound examples for every current campaign', () => {
    for (const campaign of campaigns) {
      const activity = campaignActivity(campaign);
      const view = recentDonationPresentation(activity);
      expect(view.illustrative).toBe(true);
      expect(view.records.length).toBeGreaterThanOrEqual(5);
      expect(view.records.length).toBeLessThanOrEqual(10);
      expect(view.records.every(d => d.campaignSlug === campaign.slug && 'kind' in d && d.kind === 'illustrative')).toBe(true);
      expect(new Set(view.records.map(d => d.id)).size).toBe(view.records.length);
    }
  });
  it('automatically covers new campaigns without a transaction or seed write', () => {
    const view = recentDonationPresentation(campaignActivity({ slug: 'future-campaign', support: [] }));
    expect(view.illustrative).toBe(true);
    expect(view.records.length).toBeGreaterThanOrEqual(5);
  });
  it('keeps names, amounts and absolute illustrative dates stable across repeated loads', () => {
    const first = campaignDonationExamples('help-emma');
    expect(campaignDonationExamples('help-emma')).toEqual(first);
    expect(campaignDonationExamples('help-jazzy')).not.toEqual(first);
    expect(first.every(d => Number.isSafeInteger(d.amountCents) && d.amountCents > 0 && Number.isFinite(Date.parse(d.illustratedAt)))).toBe(true);
    expect(new Set(first.map(d => d.name)).size).toBe(first.length);
  });
  it('replaces examples with even one eligible confirmed public record, without mixing', () => {
    const view = recentDonationPresentation({ campaignSlug: real.campaignSlug, status: 'ready', donations: [real], messages: [] });
    expect(view.illustrative).toBe(false);
    expect(view.records).toEqual([real]);
  });
  it('rejects private, pending and other-campaign records before selecting fallback', () => {
    const view = recentDonationPresentation({ campaignSlug: real.campaignSlug, status: 'ready', donations: [{ ...real, public: false }, { ...real, id: 'pending', status: 'pending' }, { ...real, id: 'other', campaignSlug: 'other' }], messages: [] });
    expect(view.illustrative).toBe(true);
    expect(view.records.some(d => d.id === real.id)).toBe(false);
  });
  it('never inserts examples into authentic donations, public counts or support messages', () => {
    const activity = campaignActivity({ slug: 'future-campaign', support: [] });
    recentDonationPresentation(activity);
    expect(publicDonations(activity.donations, 'future-campaign')).toEqual([]);
    expect(activity.donations.length).toBe(0);
    expect(activity.messages).toEqual([]);
    expect(recentDonationPresentation(activity, false).records).toEqual([]);
  });
  it('preserves loading and error states without inventing history', () => {
    for (const status of ['loading', 'error'] as const) {
      expect(recentDonationPresentation({ campaignSlug: 'future-campaign', status, donations: [], messages: [] })).toEqual({ illustrative: false, records: [] });
    }
  });
  it('paginates all illustrative entries once and orders top examples by amount', () => {
    const examples = campaignDonationExamples('future-campaign');
    const entries = [1, 2].flatMap(page => donationPage(examples, 'recent', page).items);
    if (examples.length > 5) expect(entries.map(d => d.id)).toEqual(examples.map(d => d.id));
    expect(donationPage(examples, 'top', 1).items[0]?.amountCents).toBe(Math.max(...examples.map(d => d.amountCents)));
  });
});