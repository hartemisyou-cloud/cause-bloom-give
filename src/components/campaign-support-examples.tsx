import { initials } from '@/components/campaign-detail-sections';
import { campaignSupportExamples } from '@/lib/campaign-support-examples';

export function CampaignSupportExamples({ slug }: { slug: string }) {
  const examples = campaignSupportExamples(slug);
  if (!examples.length) return null;
  return <div className="support-examples" role="group" aria-label="Example support messages">
    <div className="support-list">{examples.map(example => <article className="support-word" key={example.id}>
      <div className="support-author"><span className="organizer-avatar" aria-hidden="true">{initials(example.name)}</span><div className="support-author-copy"><strong>{example.name}</strong><small className="support-message-meta"></small></div></div>
      <p>{example.message}</p>
    </article>)}</div>
  </div>;
}