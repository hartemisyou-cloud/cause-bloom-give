import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { campaigns } from '@/lib/campaigns';
import { campaignSupportExamples } from '@/lib/campaign-support-examples';
import { campaignActivity, publicDonations } from '@/lib/campaign-social-proof';
import { CampaignSupport } from '@/components/campaign-support';

afterEach(cleanup);
describe('Identified support examples', () => {
  it('adds separate examples to every campaign without changing source support or counts', () => {
    for (const campaign of campaigns) {
      const before = JSON.stringify(campaign);
      const activity = campaignActivity(campaign);
      const examples = campaignSupportExamples(campaign.slug);
      expect(examples).toHaveLength(8);
      expect(new Set(examples.map(example => example.id)).size).toBe(8);
      expect(new Set(examples.map(example => example.message)).size).toBe(8);
      expect(activity.messages.some(message => examples.some(example => example.id === message.id))).toBe(false);
      expect(activity.donations.some(donation => examples.some(example => example.id === donation.id))).toBe(false);
      expect(publicDonations(activity.donations, campaign.slug)).toEqual(activity.donations);
      expect(JSON.stringify(campaign)).toBe(before);
    }
  });
  it('uses stable campaign-specific records without payment claims, amounts or dates', () => {
    expect(campaignSupportExamples('help-emma')).toEqual(campaignSupportExamples('help-emma'));
    expect(campaignSupportExamples('help-emma')).not.toEqual(campaignSupportExamples('help-jazlyn'));
    expect(campaignSupportExamples('')).toEqual([]);
    for (const campaign of campaigns) for (const example of campaignSupportExamples(campaign.slug)) {
      expect(example.message).not.toMatch(/donated|my donation|payment|treatment|cure|\$/i);
      expect(example).not.toHaveProperty('createdAt');
      expect(example).not.toHaveProperty('amountCents');
    }
  });
  it('does not render generated examples alongside the exported comments', () => {
    const campaign = campaigns[0];
    if (!campaign) throw new Error('Missing campaign');
    const activity = campaignActivity(campaign);
    render(<CampaignSupport campaign={campaign} activity={activity} />);
    expect(screen.queryByRole('group', { name: 'Example support messages' })).toBeNull();
    expect(screen.queryByLabelText('8 example messages')).toBeNull();
    expect(screen.getAllByRole('article')).toHaveLength(Math.min(activity.messages.length, 6));
    if (activity.messages.length) expect(screen.getByLabelText(`${activity.messages.length} submitted support messages`)).toHaveTextContent(String(activity.messages.length));
  });
  it.each(['loading', 'error'] as const)('does not replace %s states with examples', status => {
    const campaign = campaigns[0];
    if (!campaign) throw new Error('Missing campaign');
    render(<CampaignSupport campaign={campaign} activity={{ status, donations: [], messages: [] }} />);
    expect(screen.queryByRole('group', { name: 'Example support messages' })).toBeNull();
  });
});