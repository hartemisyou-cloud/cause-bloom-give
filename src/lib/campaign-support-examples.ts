// Presentation-only support examples; never public activity or payment evidence.
export type SupportExample = { id: string; name: string; message: string };

const names = ['Alex Morgan', 'Jamie Reed', 'Taylor Brooks', 'Jordan Ellis', 'Casey Rivera', 'Sam Parker', 'Robin Hayes', 'Cameron Lane', 'Avery Quinn', 'Drew Bennett', 'Morgan Lee', 'Riley Davis'];
const messages = [
  'Sending you and everyone close to you strength and kindness. I hope you feel supported through each step ahead.',
  'Your story deserves to be heard. Wishing you encouragement, comfort and brighter days ahead.',
  'Thinking of you with warmth and care. May you find moments of peace and people who stand beside you.',
  'No one should have to face a difficult chapter alone. Sending heartfelt support to everyone involved.',
  'I hope this campaign reaches people who can offer a helping hand. Wishing you strength for the road ahead.',
  'Keeping you in my thoughts and wishing you hope, patience and kindness each day.',
  'Behind every campaign is a story that matters. Sending encouragement and sincere wishes for better days.',
  'May the care of those around you bring a little comfort. You deserve compassion and support.',
  'Sending a message of solidarity. I hope you feel heard and surrounded by kindness.',
  'Wishing everyone involved courage and a strong circle of support. Your story matters.',
  'Hoping the days ahead bring moments of relief and renewed hope. Sending warm thoughts your way.',
  'A little kindness can mean so much during a difficult time. Wishing you care, comfort and encouragement.',
];

export function campaignSupportExamples(slug: string): readonly SupportExample[] {
  if (!slug.trim()) return [];
  let seed = 0;
  for (const character of slug) seed = (Math.imul(seed, 31) + character.charCodeAt(0)) >>> 0;
  return Array.from({ length: 8 }, (_, index) => ({
    id: `support-example-${slug}-${index}`,
    name: names[(seed + index) % names.length] ?? 'Alex Morgan',
    message: messages[(seed + index * 5) % messages.length] ?? '',
  }));
}