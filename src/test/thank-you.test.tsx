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
    const { container } = await renderAt('/thank-you?amount=20');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Thank You for Your Support!');
    expect(screen.getByText('Thank you for choosing to support a campaign with $20.00.')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bebooks?\b|\be-books?\b|\bbooks?\b|\bdownloads?\b|hopehumanbooks|digital edition/i);
    expect(screen.getByRole('link', { name: /Back to campaigns/i })).toHaveAttribute('href', '/campaigns');
  });

  it('shows the generic message when ?amount is absent', async () => {
    await renderAt('/thank-you');
    expect(screen.getByText('Thank you for caring about these campaigns.')).toBeInTheDocument();
    expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument();
  });

  it('renders no payment form and no provider markup', async () => {
    const { container } = await renderAt('/thank-you?amount=30');
    expect(container.querySelector('form')).toBeNull();
    expect(container.innerHTML).not.toMatch(new RegExp(['str'+'ipe','type="submit"','name="card"'].join('|'),'i'));
  });
  it('does not treat an amount query parameter as a confirmed payment', async()=>{
    const {container}=await renderAt('/thank-you?amount=500');
    expect(container.textContent).not.toMatch(/has been received|payment successful/i);
    expect(container.textContent).toContain('This page does not confirm a payment.');
  });
});
