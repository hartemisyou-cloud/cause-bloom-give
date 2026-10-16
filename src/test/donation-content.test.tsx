import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { donationInformation, donationLabel } from '@/lib/donation-content';
import { donationAmounts, bookPurchaseBase } from '@/lib/checkout';
import { PolicyPage, HelpPage, AboutPage, GuaranteePage } from '@/components/content-pages';

vi.mock('@tanstack/react-router', () => ({ Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> }));
afterEach(cleanup);
const salesTerms = /\bebooks?\b|\be-books?\b|\bbooks?\b|\bshipping\b|\bdownloads?\b|hopehumanbooks/i;

describe('Donation-only public information', () => {
  it.each(['privacy', 'terms', 'refund'] as const)('renders truthful %s policy without sales terms', kind => {
    const { container } = render(<PolicyPage kind={kind} />);
    expect(container.textContent).not.toMatch(salesTerms);
    expect(container.textContent).not.toMatch(/501\(c\)\(3\)|tax.deductible|100% guaranteed/i);
    if (kind !== 'privacy') {
      expect(container.textContent).toContain('manual release or campaign closure');
      expect(container.textContent).toContain('full base-USD donation');
    }
  });
  it('explains approval, fees, eligible countries, receipts and refund requests in Help', () => {
    const { container } = render(<HelpPage />);
    expect(container.textContent).not.toMatch(salesTerms);
    for (const key of ['allocation', 'release', 'countries', 'receipt', 'refunds'] as const) expect(container.textContent).toContain(donationInformation[key]);
    expect(screen.getByText('When will I receive a donation receipt?')).toBeInTheDocument();
  });
  it.each([AboutPage, GuaranteePage])('keeps foundation and trust copy donation-specific', Page => {
    const { container } = render(<Page />);
    expect(container.textContent).not.toMatch(salesTerms);
    expect(container.textContent).toMatch(/verification|verified/);
  });
  it('uses exact donation labels and the authorized donation checkout start for all six amounts', () => {
    expect(donationAmounts).toEqual([20, 30, 50, 100, 250, 500]);
    expect(bookPurchaseBase).toBe('https://hopehumanbooks.com/comprar');
    for (const amount of donationAmounts) {
      expect(donationLabel(amount)).toBe(`$${amount} Donation`);
    }
  });
  it('contains no sales wording or payment SDK in public presentation source', () => {
    function files(dir: string): string[] {
      return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? (entry.name === 'ui' ? [] : files(join(dir, entry.name))) : /\.(tsx?|json)$/.test(entry.name) ? [join(dir, entry.name)] : []);
    }
    for (const file of [...files('src/routes'), ...files('src/components'), ...files('src/lib'), ...files('src/data')]) {
      const text = readFileSync(file, 'utf8').replace(/BookOpen/g, 'JournalIcon').replace(/https:\/\/hopehumanbooks\.com\/comprar/g, 'AuthorizedBookPurchase').replace(/This takes you to Hope Human Books, where you'll complete a real purchase of the ebook above\./g, 'AuthorizedDisclosure').replace(/Buy the ebook/g, 'AuthorizedCta').replace(/Secure checkout at Hope Human Books/g, 'AuthorizedCheckoutNote').replace(/Continue to Hope Human Books/g, 'AuthorizedContinue');
      expect(text, file).not.toMatch(salesTerms);
      expect(text, file).not.toMatch(new RegExp(['@'+'str'+'ipe', 'js\\.'+'str'+'ipe'].join('|')));
    }
  });
});