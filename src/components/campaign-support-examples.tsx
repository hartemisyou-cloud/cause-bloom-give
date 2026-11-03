import { initials } from '@/components/campaign-detail-sections';
import { campaignSupportExamples } from '@/lib/campaign-support-examples';

export function CampaignSupportExamples({ slug }: { slug: string }) {
  const examples = campaignSupportExamples(slug);
  if (!examples.length) return null;
  return <div className="support-examples" role="group" aria-label="Example support messages">
    <h3 className="support-example-heading">Example support messages <span className="support-count" aria-label={`${examples.length} example messages`}>{examples.length}</span></h3>
    <p className="support-message-meta">Fictional names and messages, not submitted support.</p>
    <div className="support-list">{examples.map(example => <article className="support-word" key={example.id}>
      <div className="support-author"><span className="organizer-avatar" aria-hidden="true">{initials(example.name)}</span><div className="support-author-copy"><strong>{example.name}</strong><small className="support-message-meta">Example message</small></div></div>
      <p>{example.message}</p>
    </article>)}</div>
  </div>;
}