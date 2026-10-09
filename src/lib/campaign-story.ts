import artwork from '@/data/story-artwork.json';

export type StoryPhoto = { url: string; width: number; height: number };
export type StoryBlock = { kind: 'text'; markdown: string } | { kind: 'photo'; sourcePath: string; caption: string; photo: StoryPhoto | undefined };
const photos: Record<string, StoryPhoto> = artwork;
// These are existing standalone story labels, not generated summaries or new facts.
const headings = new Set([
  'The Agony of Relapse', 'A Grief We Cannot Fully Mourn', 'A Fleeting Victory',
  'Back to the Starting Line', 'We Urgently Need Your Help', 'About Her Name',
  'How Her Fight Began', 'When the Cancer Returned', 'Her New Dream: Independence',
  'How Your Support Helps', 'Who Is Arielle?', 'Why Your Help Matters',
  'Full Transparency — Monthly Costs', 'Campaign Updates', 'How Your Donation Helps:',
  'Help Erica Continue Her Medical Journey', '💪 Goyito — He crawls every day just to survive and care for his mother',
  '💔 His reality', '⚠️ A daily risk no human being should have to face', '🕯️ Why this matters',
  'A call for help', 'A message from Goyito', 'Your impact',
]);

export function parseCampaignStory(story: string): StoryBlock[] {
  const blocks: StoryBlock[] = [];
  for (const part of story.split(/(IMAGE:[^\r\n]+)/g)) {
    if (part.startsWith('IMAGE:')) {
      const [sourcePath = '', ...caption] = part.slice(6).split('|');
      blocks.push({ kind: 'photo', sourcePath, caption: caption.join('|').trim(), photo: photos[sourcePath] });
    } else {
      for (const paragraph of part.split(/\n\s*\n/)) {
        const text = paragraph.trim();
        if (text) blocks.push({ kind: 'text', markdown: headings.has(text) ? `## ${text}` : text });
      }
    }
  }
  return blocks;
}

export function storyDescription(story: string): string {
  const first = parseCampaignStory(story).find(block => block.kind === 'text');
  return first?.kind === 'text' ? first.markdown.replace(/[#*_`]/g, '').slice(0, 160) : '';
}