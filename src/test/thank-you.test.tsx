import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { routeTree } from '@/routeTree.gen';
import { thankYouAmount, usdLabel } from '@/routes/thank-you';

async function renderAt(url: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [url] }),
    context: { queryClient: new QueryClient() },
    defaultPreload: false,
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

describe('Thank you page', () => {
  it('formats a query amount as a US dollar label with cents', () => {
    expect(usdLabel(20)).toBe('$20.00');
    expect(usdLabel(250)).toBe('$250.00');
    expect(thankYouAmount('30')).toBe(30);
    expect(thankYouAmount('"50"')).toBe(50);
  });

  it('ignores a missing or non-numeric amount', () => {
    expect(thankYouAmount(undefined)).toBeUndefined();
    expect(thankYouAmount('abc')).toBeUndefined();
    expect(thankYouAmount(0)).toBeUndefined();
    expect(thankYouAmount(-20)).toBeUndefined();
  });

  it('names the gift amount when ?amount is present', async () => {
    await renderAt('/thank-you?amount=20');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Thank You for Your Donation!');
    expect(screen.getByText('Your gift of $20.00 has been received.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Your support goes straight to the people and communities we serve. As a token of gratitude, your digital edition from Hope Human Books is on its way to your inbox.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to campaigns/i })).toHaveAttribute('href', '/campaigns');
  });

  it('shows the generic message when ?amount is absent', async () => {
    await renderAt('/thank-you');
    expect(screen.getByText('Your gift has been received.')).toBeInTheDocument();
    expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument();
  });

  it('renders no payment form and no provider markup', async () => {
    const { container } = await renderAt('/thank-you?amount=30');
    expect(container.querySelector('form')).toBeNull();
    expect(container.innerHTML).not.toMatch(new RegExp(['str'+'ipe','checkout','card','payment'].join('|'),'i'));
  });
});
