import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { campaigns } from '@/lib/campaigns';
import { parseCampaignStory, storyDescription } from '@/lib/campaign-story';
import { CampaignStory } from '@/components/campaign-story';

describe('All campaign stories', () => {
  it('resolves all 20 inline markers in original order to exact optimized photos', () => {
    let count = 0;
    for (const campaign of campaigns) {
      const markers = [...campaign.story.matchAll(/IMAGE:([^|\n]+)\|([^\n]*)/g)];
      const photos = parseCampaignStory(campaign.story).filter(b => b.kind === 'photo');
      expect(photos.map(b => b.sourcePath)).toEqual(markers.map(m => m[1]));
      for (const [index, block] of photos.entries()) {
        expect(block.photo?.url).toMatch(/^\/__l5e\/assets-v1\//);
        expect(block.photo?.width).toBeGreaterThan(0);
        expect(block.photo?.height).toBeGreaterThan(0);
        expect(block.caption).toBe(markers[index]?.[2]);
      }
      count += photos.length;
    }
    expect(count).toBe(20);
  });
  it('renders every campaign without technical markers, preserving prose and surnames', () => {
    for (const campaign of campaigns) {
      const html = renderToStaticMarkup(<CampaignStory story={campaign.story} expanded />);
      expect(html).not.toMatch(/IMAGE:|uploads\/campaigns\//);
      expect(html).toContain('<p>');
      expect(storyDescription(campaign.story)).not.toMatch(/IMAGE:|[#*_`]/);
    }
  });
  it('renders Graceline’s nine photos and five meaningful headings', () => {
    const campaign = campaigns.find(c => c.slug === 'help-graceline-now');
    if (!campaign) throw new Error('Missing campaign');
    const html = renderToStaticMarkup(<CampaignStory story={campaign.story} expanded />);
    expect(html.match(/<img /g)).toHaveLength(9);
    expect(html.match(/<h2>/g)).toHaveLength(5);
    expect(html).toContain('Graceline Bennett');
    expect(html).toContain('The Agony of Relapse');
    expect(html.match(/loading="lazy"/g)).toHaveLength(9);
    expect(html.match(/<figcaption>/g)).toHaveLength(9);
  });
  it('handles actual markdown safely and never runs raw HTML', () => {
    const html = renderToStaticMarkup(<CampaignStory story={'## Heading\n\n**Important** and *emphasis*\n\n- One\n- Two\n\n<script>alert(1)</script>'} expanded />);
    expect(html).toContain('<h2>Heading</h2>');
    expect(html).toContain('<strong>Important</strong>');
    expect(html).toContain('<em>emphasis</em>');
    expect(html).toContain('<ul>');
    expect(html).not.toContain('<script>');
  });
});