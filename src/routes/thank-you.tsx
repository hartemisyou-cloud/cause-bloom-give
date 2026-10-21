import { createFileRoute } from '@tanstack/react-router';
import { CircleCheck } from 'lucide-react';
import { pageHead } from '@/lib/site';

/** Reads ?amount as a plain USD number; TanStack can hand numeric search values back as quoted strings. */
export function thankYouAmount(raw: unknown): number | undefined {
  const n = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw.replace(/^"|"$/g, '')) : NaN;
  return Number.isFinite(n) && n > 0 ? n : undefined;
}
/** US dollar label with cents, e.g. 20 → "$20.00". */
export function usdLabel(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export const Route = createFileRoute('/thank-you')({
  validateSearch: (s: Record<string, unknown>): { amount?: number } => {
    const amount = thankYouAmount(s['amount']);
    return amount === undefined ? {} : { amount };
  },
  head: () => {
    const head = pageHead('Thank you', 'A message of gratitude and donation confirmation from Hope Human Foundation.', '/thank-you');
    return { ...head, meta: [...head.meta, { name: 'robots', content: 'noindex' }] };
  },
  component: ThankYouPage,
});

function ThankYouPage() {
  const { amount } = Route.useSearch();
  return (
    <div className="thank-you-page">
      <div className="container thank-you-inner">
        <span className="thank-you-mark" aria-hidden="true"><CircleCheck size={34} /></span>
        <div className="eyebrow">With gratitude</div>
        <h1>Thank You for Your Support!</h1>
        <p className="thank-you-sub">
          {amount === undefined
            ? 'Your donation has been confirmed.'
            : `Your donation of ${usdLabel(amount)} has been confirmed.`}
        </p>
        <p className="thank-you-body">
          Your generosity helps the families behind our campaigns move forward. Every gift is handled with care,
          transparency, and gratitude on behalf of the people it supports.
        </p>
        <p className="thank-you-signature">With appreciation — the Hope Human Foundation</p>
      </div>
    </div>
  );
}
