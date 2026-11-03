import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { initials } from '@/components/campaign-detail-sections';
import { visibleSupport } from '@/lib/campaign-activity';
import { campaignSupportExamples } from '@/lib/campaign-support-examples';

export function CampaignSupportExamples({ slug }: { slug: string }) {
  const [page, setPage] = useState(1);
  const examples = campaignSupportExamples(slug);
  if (!examples.length) return null;
  const visible = visibleSupport(examples, page);
  return <div className="support-examples" role="group" aria-label="Example support messages">
    <div className="support-list">{visible.map(example => <article className="support-word" key={example.id}>
      <div className="support-author"><span className="organizer-avatar" aria-hidden="true">{initials(example.name)}</span><div className="support-author-copy"><strong>{example.name}</strong><small className="support-message-meta"></small></div></div>
      <p>{example.message}</p>
    </article>)}</div>
    <div className="support-pagination">
      {visible.length < examples.length && <Button variant="outline" onClick={() => setPage(value => value + 1)}><ChevronDown aria-hidden="true" />More examples</Button>}
      {page > 1 && <Button variant="ghost" onClick={() => setPage(1)}><ChevronUp aria-hidden="true" />Fewer examples</Button>}
    </div>
  </div>;
}