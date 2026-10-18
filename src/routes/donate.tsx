import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { getCampaign, categoryName, shortMoney, money } from '@/lib/campaigns';
import { pageHead, trackEvent } from '@/lib/site';
import { bookPurchaseUrl, donationAmounts, parseDonationAmount } from '@/lib/checkout';
import { donationInformation } from '@/lib/donation-content';

export const Route = createFileRoute('/donate')({
  validateSearch: (s: Record<string, unknown>): { slug: string; amount?: number } => {
    const amount = parseDonationAmount(s['amount']);
    return { slug: typeof s['slug'] === 'string' ? s['slug'] : '', ...(amount !== undefined ? { amount } : {}) };
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
  const pixelParams = (v: number) => ({ value: v, currency: 'USD' as const, content_ids: isDonationAmount(v) ? [bookSlugByAmount[v]] : [] });
  function select(value: number) { setAmount(value); pixelTrack('ViewContent', pixelParams(value)); }
  function proceed() {
    if (amount === null) return;
    trackEvent('checkout_navigation', { slug: c.slug, amount });
    pixelTrack('InitiateCheckout', pixelParams(amount));
    window.location.replace(bookPurchaseUrl(amount, { campaignSlug: c.slug, fbclid: currentFbclid() }));
  }
  const summary = <><span className="donate-category">{categoryName(c.category)}</span><h1>{c.title}</h1><Progress campaign={c} /><div className="amount-row"><strong>{shortMoney(c.raised)}</strong><span>of {shortMoney(c.goal)} goal</span></div><p className="donate-previous">Previous fundraising</p></>;
  return <div className="donate-page"><div className="donate-layout"><div className="donate-campaign-column"><article className="donate-campaign-card"><Link to="/campaign-detail" search={{ slug: c.slug }}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title} fetchPriority="high" /></Link><div className="donate-campaign-body">{summary}</div></article><details className="donate-info"><summary><ShieldCheck />Clear information before payment</summary><p>{donationInformation.approval}</p><p>{donationInformation.allocation}</p><p>{donationInformation.release}</p><Link to="/refund-cancellation-policy">Review payment and refund information <ArrowRight size={14} /></Link></details></div><section className="donate-selection" aria-label="Choose your donation"><div className="donate-mobile-campaign"><Link to="/campaign-detail" search={{slug:c.slug}}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title}/></Link><div className="donate-campaign-body">{summary}</div></div><header><h2 id="donate-title">Choose your donation</h2><p>A little kindness goes a long way.</p></header><div className="donate-selection-body"><h3>Select amount (USD)</h3><div className="donate-amount-grid">{donationAmounts.map(value => <Button variant="outline" className="donate-amount" key={value} type="button" aria-pressed={amount === value} onClick={() => setAmount(value)} aria-label={`US$ ${value}`}><span>US$ {value}</span>{value === 100 && <span className="suggested-badge">Suggested</span>}</Button>)}</div><Button type="button" variant="gold" className="gold-control checkout-continue" disabled={amount === null} onClick={proceed}><span>{amount !== null ? `Donate US$ ${amount}` : 'Donate'}<ArrowRight size={18} /></span></Button><p className="donate-note">Your donation is processed securely.</p><p className="secure-checkout"><Lock size={14} />Secure checkout</p><p className="checkout-description">{donationInformation.purpose} {donationInformation.review}</p><p className="checkout-description">{donationInformation.availability}</p></div></section></div></div>;
}
