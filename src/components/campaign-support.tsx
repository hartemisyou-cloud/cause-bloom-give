import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleIcon } from '@/components/title-icon';
import { initials } from '@/components/campaign-detail-sections';
import { visibleSupport } from '@/lib/campaign-activity';
import { type Campaign } from '@/lib/campaigns';

export function CampaignSupport({ campaign }: { campaign: Campaign }) {
  const [page, setPage] = useState(1);
  const messages = visibleSupport(campaign.support, page);
  return <section className="story-section campaign-support" aria-labelledby="campaign-support-title">
    <h2 id="campaign-support-title"><TitleIcon topic="Words of support" />Words of support <span className="support-count">{campaign.support.length}</span></h2>
    {!campaign.support.length ? <p className="support-empty">No messages yet.</p> : <>
      <div className="support-list">{messages.map((message, index) => <article className="support-word" key={`${index}-${message.name}`}><div className="support-author"><span className="organizer-avatar" aria-hidden="true">{initials(message.name)}</span><strong>{message.name}</strong></div><p>{message.message}</p></article>)}</div>
      <div className="support-pagination">{messages.length < campaign.support.length && <Button variant="outline" onClick={() => setPage(value => value + 1)}><ChevronDown aria-hidden="true" />Load more</Button>}{page > 1 && <Button variant="ghost" onClick={() => setPage(1)}><ChevronUp aria-hidden="true" />Show fewer</Button>}</div>
      <p className="support-page-status" role="status">Showing {messages.length} of {campaign.support.length}</p>
    </>}
  </section>;
}