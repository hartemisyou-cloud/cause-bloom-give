import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { LockKeyhole, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { getCampaign, categoryName, shortMoney, money } from '@/lib/campaigns';
import { pageHead, trackEvent } from '@/lib/site';
import { checkoutAttempt, checkoutStartAction, donationAmounts, parseDonationAmount } from '@/lib/checkout';
import { donationInformation, donationLabel } from '@/lib/donation-content';

export const Route = createFileRoute('/donate')({
  validateSearch: (s: Record<string, unknown>): { slug: string; amount?: number; checkout_error?: 'unavailable' } => {
    const amount = parseDonationAmount(s['amount']);
    return { slug: typeof s['slug'] === 'string' ? s['slug'] : '', ...(amount !== undefined ? { amount } : {}), ...(s['checkout_error'] === 'unavailable' ? { checkout_error: 'unavailable' as const } : {}) };
  },
  loaderDeps: ({ search }) => ({ slug: search.slug }),
  loader: ({ deps }) => { if (!deps.slug) throw redirect({ to: '/campaigns', search: { category: 'all' } }); const campaign = getCampaign(deps.slug); if (!campaign) throw notFound(); return campaign; },
  head: ({ loaderData }) => pageHead(loaderData ? `Choose an amount for ${loaderData.title}` : 'Choose your amount', 'Choose a donation supporting the selected campaign and review the amount and payment terms at secure checkout.', `/donate${loaderData ? `?slug=${loaderData.slug}` : ''}`),
  component: DonatePage,
});
function DonatePage() {
  const c = Route.useLoaderData();
  const search = Route.useSearch();
  const [amount, setAmount] = useState<number | null>(search.amount ?? null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const payloadRef = useRef<HTMLInputElement>(null);
  const showError = search.checkout_error === 'unavailable' && !submitting;
  useEffect(() => {
    const reset = () => { submittingRef.current = false; setSubmitting(false); };
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);
  function proceed(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (amount === null || submittingRef.current || !formRef.current || !payloadRef.current) return;
    const payload = checkoutAttempt(c.slug, amount);
    payloadRef.current.value = JSON.stringify(payload);
    submittingRef.current = true;
    setSubmitting(true);
    trackEvent('checkout_navigation', { slug: c.slug, amount });
    formRef.current.submit();
  }
  const summary = <><span className="donate-category">{categoryName(c.category)}</span><h1>{c.title}</h1><Progress campaign={c} /><div className="amount-row"><strong>{shortMoney(c.raised)}</strong><span>of {shortMoney(c.goal)} goal</span></div><p className="donate-previous">Previous fundraising</p></>;
  return <div className="donate-page"><div className="donate-layout"><div className="donate-campaign-column"><article className="donate-campaign-card"><Link to="/campaign-detail" search={{ slug: c.slug }}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title} fetchPriority="high" /></Link><div className="donate-campaign-body">{summary}</div></article><details className="donate-info"><summary><ShieldCheck />Clear information before payment</summary><p>{donationInformation.approval}</p><p>{donationInformation.allocation}</p><p>{donationInformation.release}</p><Link to="/refund-cancellation-policy">Review payment and refund information <ArrowRight size={14} /></Link></details></div><section className="donate-selection" aria-label="Choose your donation"><div className="donate-mobile-campaign"><Link to="/campaign-detail" search={{slug:c.slug}}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title}/></Link><div className="donate-campaign-body">{summary}</div></div><header><h2 id="donate-title">Choose your donation</h2><p>A little kindness goes a long way.</p></header><div className="donate-selection-body"><h3>Select amount (USD)</h3><form ref={formRef} method="post" action={checkoutStartAction} onSubmit={proceed} aria-busy={submitting}><input ref={payloadRef} type="hidden" name="payload" defaultValue="" /><div className="donate-amount-grid">{donationAmounts.map(value => <Button variant="outline" className="donate-amount" key={value} type="button" disabled={submitting} aria-pressed={amount === value} onClick={() => setAmount(value)} aria-label={donationLabel(value)}><span>{money(value)}<small className="donate-amount-label">Donation</small></span>{value === 100 && <span className="suggested-badge">Suggested</span>}</Button>)}</div><Button type="submit" variant="gold" className="gold-control checkout-continue" disabled={amount === null || submitting} aria-busy={submitting}><span>{submitting ? 'Opening secure checkout…' : amount !== null ? `Donate ${money(amount)}` : 'Donate'}{!submitting && <ArrowRight size={18} />}</span><small>Review at secure checkout</small></Button>{showError && <p className="checkout-error" role="alert">We couldn’t open secure checkout. Please try again.</p>}</form><p className="secure-checkout"><LockKeyhole size={14} />Secure checkout</p><p className="checkout-description">{donationInformation.purpose} {donationInformation.review}</p><p className="checkout-description">{donationInformation.availability}</p></div></section></div></div>;
}
