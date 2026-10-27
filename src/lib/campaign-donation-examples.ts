// Presentation-only examples: never transactions, funding, support messages or analytics.
export type IllustrativeDonation = {
  kind: 'illustrative'; id: string; campaignSlug: string; name: string;
  anonymous: false; amountVisible: true; amountCents: number; illustratedAt: string;
};

const FIRST_NAMES = ['Avery', 'Jordan', 'Casey', 'Morgan', 'Riley', 'Taylor', 'Quinn', 'Alex', 'Jamie', 'Skyler', 'Cameron', 'Reese', 'Parker', 'Rowan', 'Drew', 'Finley'];
const LAST_NAMES = ['Meadow', 'Brook', 'Vale', 'Willow', 'Stone', 'Reed', 'Harbor', 'Birch', 'Lane', 'Field', 'Grove', 'Lake', 'Hill', 'Dale', 'Marsh', 'Cove'];
const AMOUNTS_CENTS = [2000, 3000, 5000, 10000, 25000, 50000];

export function campaignDonationExamples(slug: string): readonly IllustrativeDonation[] {
  if (!slug.trim()) return [];
  let seed = 2166136261;
  for (const character of slug) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619) >>> 0;
  const count = 5 + seed % 6;
  return Array.from({ length: count }, (_, index) => ({
    kind: 'illustrative' as const, id: `illustrative:${slug}:${index}`, campaignSlug: slug,
    name: `${FIRST_NAMES[(seed + index * 3) % FIRST_NAMES.length]} ${LAST_NAMES[(Math.floor(seed / 16) + index * 5) % LAST_NAMES.length]}`,
    anonymous: false as const, amountVisible: true as const,
    amountCents: AMOUNTS_CENTS[(seed + index) % AMOUNTS_CENTS.length] ?? 2000,
    // Fixed illustrative dates, not a rolling claim of recent payment activity.
    illustratedAt: new Date(Date.UTC(2026, 0, 20) - (seed % 72 + index * 13) * 3600000).toISOString(),
  }));
}

export function illustrativeDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}