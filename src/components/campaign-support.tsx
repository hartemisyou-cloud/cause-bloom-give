import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleIcon } from '@/components/title-icon';
import { initials } from '@/components/campaign-detail-sections';
import { visibleSupport } from '@/lib/campaign-activity';
import { campaignActivity, publicMessages, publicDonations, donorName, donationMoney, activityDate, type CampaignActivity } from '@/lib/campaign-social-proof';

export function CampaignSupport({ campaign, activity = campaignActivity(campaign) }: { campaign: { slug?: string; support: readonly { name: string; message: string }[] }; activity?: CampaignActivity }) {
  const [page, setPage] = useState(1);
  const all = publicMessages(activity.messages, campaign.slug ?? '');
  const messages = visibleSupport(all, page);
  const donations = publicDonations(activity.donations, campaign.slug ?? '');
  return <section className="story-section campaign-support" aria-labelledby="campaign-support-title">
    <h2 id="campaign-support-title"><TitleIcon topic="Words of support" />Words of support {activity.status !== 'loading' && activity.status !== 'error' && <span className="support-count">{all.length}</span>}</h2>
    {activity.status === 'loading' ? <p role="status" aria-busy="true" className="support-empty">Loading messages…</p> : activity.status === 'error' ? <p role="alert" className="support-empty">Messages could not be loaded. Please try again later.</p> : !all.length ? <p className="support-empty">No messages yet.</p> : <>
      <div className="support-list">{messages.map(message => {
        const name = donorName(message);
        const donation = donations.find(d => d.id === message.donationId);
        return <article className="support-word" key={message.id}><div className="support-author"><span className="organizer-avatar" aria-hidden="true">{initials(name)}</span><div className="support-author-copy"><strong>{name}</strong><div className="support-message-meta">{donation?.amountVisible && <span>{donationMoney(donation.amountCents)}</span>}{message.createdAt && <time dateTime={message.createdAt}>{activityDate(message.createdAt)}</time>}</div></div></div><p>{message.message}</p></article>;
      })}</div>
      <div className="support-pagination">{messages.length < all.length && <Button variant="outline" onClick={() => setPage(value => value + 1)}><ChevronDown aria-hidden="true" />Load more</Button>}{page > 1 && <Button variant="ghost" onClick={() => setPage(1)}><ChevronUp aria-hidden="true" />Show fewer</Button>}</div>
      <p className="support-page-status" role="status">Showing {messages.length} of {all.length}</p>
    </>}
  </section>;
}