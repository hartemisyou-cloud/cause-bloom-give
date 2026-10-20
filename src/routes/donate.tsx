import { TitleIcon } from '@/components/title-icon';
import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { getCampaign, categoryName, shortMoney } from '@/lib/campaigns';
import { pageHead, trackEvent } from '@/lib/site';
import { pixelDonationEvent } from '@/lib/meta-pixel';
import { bookPurchaseUrl, donationAmounts, parseDonationAmount, bookTitleByAmount, isDonationAmount } from '@/lib/checkout';
import { donationInformation } from '@/lib/donation-content';

export const Route = createFileRoute('/donate')({
  validateSearch: (s: Record<string, unknown>): { slug: string; amount?: number } => {
    const amount = parseDonationAmount(s['amount']);
    return { slug: typeof s['slug'] === 'string' ? s['slug'] : '', ...(amount !== undefined ? { amount } : {}) };
  },
  loaderDeps: ({ search }) => ({ slug: search.slug }),
  loader: ({ deps }) => { if (!deps.slug) throw redirect({ to: '/campaigns', search: { category: 'all' } }); const campaign = getCampaign(deps.slug); if (!campaign) throw notFound(); return campaign; },
  head: ({ loaderData }) => pageHead(loaderData ? `Choose an amount for ${loaderData.title}` : 'Choose your amount', 'Choose an amount and the corresponding ebook purchase at Hope Human Books supporting this campaign.', `/donate${loaderData ? `?slug=${loaderData.slug}` : ''}`),
  component: DonatePage,
});
function DonatePage() {
  const c = Route.useLoaderData();
  const search = Route.useSearch();
  const [amount, setAmount] = useState<number | null>(search.amount ?? null);
  const checkoutSent = useRef(false);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState('');
  const selectedTitle = isDonationAmount(amount) ? bookTitleByAmount[amount] : '';
  useEffect(() => { const restore = () => { checkoutSent.current = false; setOpening(false); }; window.addEventListener('pageshow', restore); return () => window.removeEventListener('pageshow', restore); }, []);
  function select(value: number) { if (checkoutSent.current) return; setAmount(value); try { pixelDonationEvent('AddToCart', value); } catch { /* Selection remains available without analytics. */ } }
  function proceed() {
    if (amount === null || checkoutSent.current) return;
    const url = bookPurchaseUrl(amount, { campaignSlug: c.slug, search: window.location.search });
    checkoutSent.current = true; setOpening(true); setError('');
    try { pixelDonationEvent('InitiateCheckout', amount); } catch { /* Optional analytics cannot block navigation. */ }
    trackEvent('checkout_navigation', { slug: c.slug, amount });
    try { window.location.replace(url); } catch { checkoutSent.current = false; setOpening(false); setError('The store could not be opened. Please try again.'); }
  }
  const summary = <><span className="donate-category">{categoryName(c.category)}</span><h1><TitleIcon category={c.category} />{c.title}</h1><Progress campaign={c} /><div className="amount-row"><strong>{shortMoney(c.raised)}</strong><span>of {shortMoney(c.goal)} goal</span></div><p className="donate-previous">Previous fundraising</p></>;
  return <div className="donate-page"><div className="donate-layout"><div className="donate-campaign-column"><article className="donate-campaign-card"><Link to="/campaign-detail" search={{ slug: c.slug }}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title} fetchPriority="high" /></Link><div className="donate-campaign-body">{summary}</div></article><details className="donate-info"><summary><ShieldCheck />Clear information before payment</summary><p>{donationInformation.approval}</p><p>{donationInformation.allocation}</p><p>{donationInformation.release}</p><Link to="/refund-cancellation-policy">Review payment and refund information <ArrowRight size={14} /></Link></details></div><section className="donate-selection" aria-label="Choose your support amount" aria-busy={opening}><div className="donate-mobile-campaign"><Button asChild variant="circle" size="icon" className="donate-close" aria-label="Return to campaign"><Link to="/campaign-detail" search={{slug:c.slug}}><X aria-hidden="true"/></Link></Button><Link to="/campaign-detail" search={{slug:c.slug}}><img src={c.image.url} width={c.image.width} height={c.image.height} alt={c.title}/></Link><div className="donate-campaign-body">{summary}</div></div><header><h2 id="donate-title"><TitleIcon topic="Choose your support amount" />Choose your support amount</h2><p>A little kindness goes a long way.</p></header><div className="donate-selection-body"><h2 className="donate-body-title"><TitleIcon topic="Choose your support amount"/>Choose your support amount</h2><p className="donate-body-intro">A little kindness goes a long way.</p><h3><TitleIcon topic="Select amount (USD)" />Select amount (USD)</h3><div className="donate-amount-grid">{donationAmounts.map(value => <Button variant="outline" className="donate-amount" key={value} type="button" disabled={opening} aria-pressed={amount === value} onClick={() => select(value)} aria-label={`US$ ${value}`}><span>US$ {value}</span>{value === 50 && <span className="suggested-badge">Suggested</span>}</Button>)}</div><div className="selected-purchase" aria-live="polite"><BookOpen size={20} aria-hidden="true"/>{amount !== null && <><strong>{selectedTitle}</strong><span>US$ {amount} · Ebook purchase</span></>}</div><div className="donate-checkout-actions"><Button type="button" variant="gold" className="gold-control checkout-continue" disabled={amount === null || opening} onClick={proceed}><span>{opening ? 'Opening Hope Human Books…' : amount !== null ? `Buy the ebook — US$ ${amount}` : 'Buy the ebook'}<ArrowRight size={18} /></span></Button><p className="donate-note">This takes you to Hope Human Books, where you'll complete a real purchase of the ebook above.</p><p className="secure-checkout"><Lock size={14} />Secure checkout at Hope Human Books</p><p className="checkout-description">No card details are collected here. Review the product, amount and purchase terms on the store before paying.</p><p className="checkout-description">Selecting an amount or continuing does not confirm a payment or a campaign allocation.</p>{error && <p className="checkout-error" role="alert">{error}</p>}</div></div></section></div></div>;
}
