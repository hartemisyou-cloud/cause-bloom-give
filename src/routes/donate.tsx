import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { LockKeyhole, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { getCampaign, categoryName, shortMoney, money } from '@/lib/campaigns';
import { pageHead, trackEvent } from '@/lib/site';
import { checkoutUrl, donationAmounts } from '@/lib/checkout';

export const Route = createFileRoute('/donate')({
  validateSearch: (s: Record<string, unknown>) => ({ slug: typeof s['slug'] === 'string' ? s['slug'] : '' }),
  loaderDeps: ({ search }) => ({ slug: search.slug }),
  loader: ({ deps }) => { if (!deps.slug) throw redirect({ to: '/campaigns', search: { category: 'all' } }); const campaign = getCampaign(deps.slug); if (!campaign) throw notFound(); return campaign; },
  head: ({ loaderData }) => pageHead(loaderData ? `Choose an amount for ${loaderData.title}` : 'Choose your amount', 'Select an amount and review the digital book, title and total at secure checkout before paying.', `/donate${loaderData ? `?slug=${loaderData.slug}` : ''}`),
  component: DonatePage,
});
function DonatePage() {
  const c = Route.useLoaderData();
  const [amount, setAmount] = useState<number | null>(null);
  function proceed() {
    if (amount === null) return;
    let attribution = '';
    try { attribution = sessionStorage.getItem('hope-attribution') ?? ''; } catch { /* Checkout works without optional browser storage. */ }
    trackEvent('checkout_navigation', { slug: c.slug, amount });
    window.location.assign(checkoutUrl(amount, c.slug, attribution));
  }
  const summary = <><span className="donate-category">{categoryName(c.category)}</span><h1>{c.title}</h1><Progress campaign={c} /><div className="amount-row"><strong>{shortMoney(c.raised)}</strong><span>of {shortMoney(c.goal)} goal</span></div><p className="donate-previous">Previous fundraising</p></>;
  return <div className="donate-page"><div className="donate-layout"><div className="donate-campaign-column"><article className="donate-campaign-card"><Link to="/campaign-detail" search={{ slug: c.slug }}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title} fetchPriority="high" /></Link><div className="donate-campaign-body">{summary}</div></article><details className="donate-info"><summary><ShieldCheck />Clear information before payment</summary><p>Continue to the existing secure checkout to review the digital book, title and total before payment. This selection does not make a payment or guarantee funds go directly to a beneficiary.</p><Link to="/refund-cancellation-policy">Review payment and refund information <ArrowRight size={14} /></Link></details></div><section className="donate-selection" aria-label="Choose your donation"><div className="donate-mobile-campaign"><Link to="/campaign-detail" search={{slug:c.slug}}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title}/></Link><div className="donate-campaign-body">{summary}</div></div><header><h2 id="donate-title">Choose your donation</h2><p>A little kindness goes a long way.</p></header><div className="donate-selection-body"><h3>Select amount (USD)</h3><div className="donate-amount-grid">{donationAmounts.map(value => <Button variant="outline" className="donate-amount" key={value} aria-pressed={amount === value} onClick={() => setAmount(value)}>{money(value)}{value === 100 && <span className="suggested-badge">Suggested</span>}</Button>)}</div><Button variant="gold" className="gold-control checkout-continue" disabled={amount === null} onClick={proceed}><span>Continue{amount !== null ? ` with ${money(amount)}` : ''}<ArrowRight size={18} /></span><small>Review at secure checkout</small></Button><p className="secure-checkout"><LockKeyhole size={14} />Secure checkout</p><p className="checkout-description">You’ll review a digital book, its title and the total before paying. No card details are collected on this page.</p></div></section></div></div>;
}
