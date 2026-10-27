import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CampaignSupport } from '@/components/campaign-support';
import { campaigns } from '@/lib/campaigns';

afterEach(cleanup);
describe('Campaign support with isolated test records', () => {
  it.each([10, 30, 100])('reads all %i test messages through pagination and collapses again', count => {
    const base = campaigns[0];
    if (!base) throw new Error('Campaign fixture missing');
    const support = Array.from({ length: count }, (_, index) => ({ name: `TEST ${index + 1}`, message: `TEST DATA message ${index + 1}` }));
    render(<CampaignSupport campaign={{ ...base, support }} />);
    expect(screen.getByText('TEST DATA message 6')).toBeVisible();
    expect(screen.queryByText('TEST DATA message 7')).toBeNull();
    while (screen.queryByRole('button', { name: 'Load more' })) fireEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(screen.getByText(`TEST DATA message ${count}`)).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Show fewer' }));
    expect(screen.queryByText('TEST DATA message 7')).toBeNull();
    expect(base.support).not.toEqual(support);
  });
});