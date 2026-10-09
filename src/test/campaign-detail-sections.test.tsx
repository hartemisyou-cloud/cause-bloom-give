import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { campaigns } from '@/lib/campaigns';
import { campaignMonth, campaignUrl, CampaignSharingSection, DonorOrganizerRail } from '@/components/campaign-detail-sections';

describe('Screenshot-matched campaign detail sections', () => {
  const campaign = campaigns.find(c => c.slug === 'help-graceline-now');
  it('uses genuine creation metadata and contains unavailable dates safely', () => {
    if (!campaign) throw new Error('Fixture missing');
    expect(campaignMonth(campaign)).toBe('August 2026');
    expect(campaignMonth({ ...campaign, createdAt: null })).toBe('date unavailable');
    expect(campaignMonth({ ...campaign, createdAt: 'invalid' })).toBe('date unavailable');
  });
  it('shares the clean campaign URL, without browser tracking parameters', () => {
    if (!campaign) throw new Error('Fixture missing');
    expect(campaignUrl(campaign)).toMatch(/\/campaign-detail\?slug=help-graceline-now$/);
    expect(campaignUrl(campaign)).not.toContain('utm_');
  });
  it('binds all three preview photos and the organizer to the current campaign', () => {
    if (!campaign) throw new Error('Fixture missing');
    const html = renderToStaticMarkup(<CampaignSharingSection campaign={campaign} onDonate={() => {}} onAction={() => {}} onShare={() => {}} />);
    expect(html.split(`src="${campaign.image.url}"`).length - 1).toBe(3);
    expect(html).toContain(campaign.organizer);
    expect(html).toContain('Previous fundraising');
    expect(html).not.toContain('each share can inspire $50');
    expect(html).toContain('Share on Instagram');
    expect(html).toContain('Share on TikTok');
  });
  it('does not turn support messages into fabricated donor records or recent activity', () => {
    if (!campaign) throw new Error('Fixture missing');
    const html = renderToStaticMarkup(<DonorOrganizerRail campaign={campaign} onAction={() => {}} />);
    expect(html).toContain('No donor records available');
    expect(html).toContain('See all');
    expect(html).toContain('See top');
    expect(html).toContain('Contact');
    expect(html).not.toContain('minutes ago');
    expect(html).not.toContain('Active since');
    for (const support of campaign.support) expect(html).not.toContain(support.name);
  });
});