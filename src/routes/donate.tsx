import { TitleIcon } from '@/components/title-icon';
import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ShieldCheck, ArrowRight, LockKeyhole, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { getCampaign, categoryName, shortMoney } from '@/lib/campaigns';
import { pageHead, trackEvent } from '@/lib/site';
import { pixelDonationEvent } from '@/lib/meta-pixel';
import { checkoutAttempt, checkoutStartAction, donationAmounts, parseDonationAmount } from '@/lib/checkout';
import { donationInformation } from '@/lib/donation-content';

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
  function select(value: number) {
    if (submittingRef.current) return;
    setAmount(value);
    try { pixelDonationEvent('AddToCart', value); } catch { /* Selection remains available without analytics. */ }
  }
  function proceed(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (amount === null || submittingRef.current || !formRef.current || !payloadRef.current) return;
    const payload = checkoutAttempt(c.slug, amount);
    payloadRef.current.value = JSON.stringify(payload);
    submittingRef.current = true;
    setSubmitting(true);
    try { pixelDonationEvent('InitiateCheckout', amount); } catch { /* Optional analytics cannot block navigation. */ }
    trackEvent('checkout_navigation', { slug: c.slug, amount });
    formRef.current.submit();
  }
  const summary = <><span className="donate-category">{categoryName(c.category)}</span><h1><TitleIcon category={c.category} />{c.title}</h1><Progress campaign={c} /><div className="amount-row"><strong>{shortMoney(c.raised)}</strong><span>of {shortMoney(c.goal)} goal</span></div><p className="donate-previous">Previous fundraising</p></>;
  return <div className="donate-page"><div className="donate-layout"><div className="donate-campaign-column"><article className="donate-campaign-card"><Link to="/campaign-detail" search={{ slug: c.slug }}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title} fetchPriority="high" /></Link><div className="donate-campaign-body">{summary}</div></article><details className="donate-info"><summary><ShieldCheck />Clear information before payment</summary><p>{donationInformation.approval}</p><p>{donationInformation.allocation}</p><p>{donationInformation.release}</p><Link to="/refund-cancellation-policy">Review payment and refund information <ArrowRight size={14} /></Link></details></div><section className="donate-selection" aria-label="Choose your support amount" aria-busy={submitting}><div className="donate-mobile-campaign"><Button asChild variant="circle" size="icon" className="donate-close" aria-label="Return to campaign"><Link to="/campaign-detail" search={{slug:c.slug}}><X aria-hidden="true"/></Link></Button><Link to="/campaign-detail" search={{slug:c.slug}}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title}/></Link><div className="donate-campaign-body">{summary}</div></div><header><h2 id="donate-title"><TitleIcon topic="Choose your support amount" />Choose your support amount</h2><p>A little kindness goes a long way.</p></header><div className="donate-selection-body"><h2 className="donate-body-title"><TitleIcon topic="Choose your support amount"/>Choose your support amount</h2><p className="donate-body-intro">A little kindness goes a long way.</p><h3><TitleIcon topic="Select amount (USD)" />Select amount (USD)</h3><form ref={formRef} method="post" action={checkoutStartAction} target="_top" onSubmit={proceed} aria-busy={submitting}><input ref={payloadRef} type="hidden" name="payload" defaultValue="" /><div className="donate-amount-grid">{donationAmounts.map(value => <Button variant="outline" className="donate-amount" key={value} type="button" disabled={submitting} aria-pressed={amount === value} onClick={() => select(value)} aria-label={`US$ ${value}`}><span>US$ {value}</span>{value === 50 && <span className="suggested-badge">Suggested</span>}</Button>)}</div><div className="donate-checkout-actions"><Button type="submit" variant="gold" className="gold-control checkout-continue" disabled={amount === null || submitting} aria-busy={submitting}><span>{submitting ? 'Opening secure checkout…' : amount !== null ? `Donate US$ ${amount}` : 'Donate'}{!submitting && <ArrowRight size={18} />}</span><small>Review at secure checkout</small></Button>{showError && <p className="checkout-error" role="alert">We couldn’t open secure checkout. Please try again.</p>}<p className="secure-checkout"><LockKeyhole size={14} />Secure checkout</p><p className="checkout-description">{donationInformation.purpose} {donationInformation.review}</p><p className="checkout-description">{donationInformation.availability}</p></div></form></div></section></div></div>;
}
