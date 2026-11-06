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
    render(<CampaignSupport campaign={{ ...base, slug: 'pagination-test', support }} />);
    expect(screen.getByText('TEST DATA message 6')).toBeVisible();
    expect(screen.queryByText('TEST DATA message 7')).toBeNull();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    while (screen.queryByRole('button', { name: 'Load more' })) fireEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(screen.getByText(`TEST DATA message ${count}`)).toBeVisible();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Show fewer' }));
    expect(screen.queryByText('TEST DATA message 7')).toBeNull();
    expect(base.support).not.toEqual(support);
  });
  it.each([0, 3, 6])('does not offer expansion when all %i source messages are already visible', count => {
    const support = Array.from({ length: count }, (_, index) => ({ name: `TEST ${index}`, message: `Message ${index}` }));
    render(<CampaignSupport campaign={{ slug: 'pagination-test', support }} />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryAllByRole('article')).toHaveLength(count);
  });
  it('renders only exported comments for every campaign', () => {
    for (const campaign of campaigns.filter(c => c.slug !== 'jaterria')) {
      const { container, unmount } = render(<CampaignSupport campaign={campaign} />);
      const words = container.querySelectorAll('.support-word');
      expect(words.length).toBeGreaterThan(0);
      expect(container.querySelector('.support-examples')).toBeNull();
      expect(container.textContent).not.toContain('Example support messages');
      unmount();
    }
  });
});