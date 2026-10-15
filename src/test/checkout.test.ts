import { describe, expect, it } from 'vitest';
import { donationAmounts, checkoutStartAction } from '@/lib/checkout';
describe('Authorized donation checkout start', () => {
  it('points to the Books donation start endpoint', () => {
    expect(checkoutStartAction).toBe('https://hopehumanbooks.com/donations/start');
    for (const amount of donationAmounts) expect(donationAmounts).toContain(amount);
  });
});
