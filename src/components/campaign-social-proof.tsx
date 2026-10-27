import { useState } from 'react';
import { Activity, ArrowLeft, ArrowRight, Clock3, Crown, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type CampaignActivity, type DonationPresentation, activityDate, donationMoney, donorName, donationPage, donationHighlights, recentDonationPresentation } from '@/lib/campaign-social-proof';
import { illustrativeDate } from '@/lib/campaign-donation-examples';

export function DonationEntry({ donation: d, top = false }: { donation: DonationPresentation; top?: boolean }) {
  const name = donorName(d);
  const illustrative = 'illustratedAt' in d;
  return <article className="proof-entry"><span className="proof-avatar" aria-hidden="true">{name.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase()}</span><div className="proof-person"><strong>{name}</strong><div className="proof-entry-meta">{d.amountVisible && <span className="proof-amount">{donationMoney(d.amountCents)}</span>}<span className="proof-meta-dot" aria-hidden="true">·</span>{top ? <span className="proof-top">{illustrative ? 'Top donation (example)' : 'Top donation'}</span> : !illustrative && <time dateTime={d.confirmedAt} title={d.confirmedAt}>{activityDate(d.confirmedAt)}</time>}</div>{illustrative && <small className="proof-example-label">Illustrative date: <time dateTime={d.illustratedAt}>{illustrativeDate(d.illustratedAt)}</time></small>}</div></article>;
}

export function ActivityEmpty({ status, messages = false }: { status: CampaignActivity['status']; messages?: boolean }) {
  if (status === 'loading') return <div className="proof-empty" role="status" aria-busy="true"><span className="proof-skeleton"/><span>Loading {messages ? 'messages' : 'donations'}…</span></div>;
  if (status === 'error') return <p className="proof-empty" role="alert">{messages ? 'Messages' : 'Donations'} could not be loaded. Please try again later.</p>;
  return <div className="proof-empty"><Heart aria-hidden="true"/><div><strong>{status === 'unavailable' ? 'No public donation records available' : 'No public donations yet'}</strong><p>{status === 'unavailable' ? 'Previous fundraising totals do not include individual donor details.' : 'Confirmed public contributions will appear here.'}</p></div></div>;
}

export function RecentDonations({ activity, heading = 'Recent donations', allowIllustrative = true }: { activity: CampaignActivity; heading?: string; allowIllustrative?: boolean }) {
  const [sort, setSort] = useState<'recent' | 'top'>('recent');
  const [page, setPage] = useState(1);
  const presentation = recentDonationPresentation(activity, allowIllustrative);
  const list = donationPage(presentation.records, sort, page);
  const top = donationPage(presentation.records, 'top', 1).items[0];
  const ready = activity.status === 'ready' || presentation.records.length > 0;
  return <section className="recent-donations" aria-label={heading}>
    <h3><Activity aria-hidden="true"/>{heading}</h3>
    {ready && list.items.length ? <div className="proof-list">{list.items.map(d => <DonationEntry key={d.id} donation={d} top={d.id === top?.id}/>)}</div> : ready && sort === 'top' && presentation.records.length ? <p className="proof-empty">No publicly shared donation amounts.</p> : <ActivityEmpty status={activity.status}/>}
    <div className="proof-filters" role="group" aria-label="Donation order"><Button variant={sort === 'recent' ? 'pill' : 'outline'} aria-pressed={sort === 'recent'} disabled={!ready || !presentation.records.length} onClick={() => { setSort('recent'); setPage(1); }}>See all</Button><Button variant={sort === 'top' ? 'pill' : 'outline'} aria-pressed={sort === 'top'} disabled={!ready || !presentation.records.length} onClick={() => { setSort('top'); setPage(1); }}><Crown aria-hidden="true"/>See top</Button></div>
    {list.pages > 1 && <div className="proof-pagination"><Button variant="outline" size="icon" aria-label="Previous donations page" disabled={list.page === 1} onClick={() => setPage(p => p - 1)}><ArrowLeft aria-hidden="true"/></Button><span role="status">{list.page} / {list.pages}</span><Button variant="outline" size="icon" aria-label="Next donations page" disabled={list.page === list.pages} onClick={() => setPage(p => p + 1)}><ArrowRight aria-hidden="true"/></Button></div>}
  </section>;
}

export function CampaignSocialProof({ activity }: { activity: CampaignActivity }) {
  const highlights = donationHighlights(activity.donations);
  return <section className="campaign-social-proof" aria-label="People coming together"><div className="proof-heading"><h2><Users aria-hidden="true"/>People coming together</h2>{activity.status === 'ready' && <span className="support-count" aria-label={`${activity.donations.length} public contributions`}>{activity.donations.length}</span>}</div>
    <div className="proof-highlights">{[{ label: 'Top donation', Icon: Crown, donation: highlights.top }, { label: 'Most recent', Icon: Clock3, donation: highlights.recent }].map(({ label, Icon, donation }) => <article className="proof-highlight" key={label}><span className="proof-highlight-icon"><Icon aria-hidden="true"/></span><div><small>{label}</small><strong>{donation ? donorName(donation) : 'Not available yet'}</strong>{donation && <time dateTime={donation.confirmedAt}>{activityDate(donation.confirmedAt)}</time>}</div>{donation?.amountVisible && <span className="proof-amount">{donationMoney(donation.amountCents)}</span>}</article>)}</div>
    <RecentDonations activity={activity} heading="Contribution history" allowIllustrative={false}/>
  </section>;
}