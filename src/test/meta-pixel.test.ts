import { beforeEach, describe, expect, it, vi } from 'vitest';
describe('Meta Pixel donation events', () => {
  beforeEach(() => { vi.resetModules(); localStorage.clear(); delete window.fbq; delete window._fbq; });
  it('sends nothing without accepted consent', async () => {
    const { pixelDonationEvent } = await import('@/lib/meta-pixel');
    pixelDonationEvent('AddToCart', 30);
    expect(window.fbq).toBeUndefined();
  });
  it('queues AddToCart with numeric USD value after consent', async () => {
    localStorage.setItem('hope-analytics-consent', 'yes');
    const { pixelDonationEvent } = await import('@/lib/meta-pixel');
    pixelDonationEvent('AddToCart', 30);
    expect((window.fbq as unknown as { queue: unknown[][] }).queue).toContainEqual(['track', 'AddToCart', { contents: [{ id: 'donation-30', quantity: 1 }], value: 30, currency: 'USD', num_items: 1 }]);
  });
});
