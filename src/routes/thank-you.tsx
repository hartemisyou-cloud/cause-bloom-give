import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    const head = pageHead('Thank you', 'Confirmation page shown after a donation to a Hope Human Foundation campaign.', '/thank-you');
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
        <h1>Thank You for Your Donation!</h1>
        <p className="thank-you-sub">{amount === undefined ? 'Your gift has been received.' : `Your gift of ${usdLabel(amount)} has been received.`}</p>
        <p className="thank-you-body">Your support goes straight to the people and communities we serve. As a token of gratitude, your digital edition from Hope Human Books is on its way to your inbox.</p>
        <Button variant="outline" asChild className="thank-you-back"><Link to="/campaigns">Back to campaigns <ArrowLeft size={15} /></Link></Button>
      </div>
    </div>
  );
}
