import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { type Campaign, categoryName, shortMoney, percentage } from '@/lib/campaigns';
import { storyDescription } from '@/lib/campaign-story';

export function TrendingPanels({ campaigns }: { campaigns: Campaign[] }) {
  const [active, setActive] = useState(0);
  return <div className="trending-panels">{campaigns.map((c, i) => <article key={c.slug} className={`trending-panel ${active === i ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
    <img src={c.image.url} alt={c.title} width={c.image.width} height={c.image.height} loading="lazy" />
    <Button variant="ghost" className="panel-activate" aria-label={`Expand ${c.title}`} aria-expanded={active === i} onClick={() => setActive(i)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setActive((i + 1) % campaigns.length); } if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setActive((i + campaigns.length - 1) % campaigns.length); } }} />
    <span className="panel-category">{categoryName(c.category)}</span><div className="trending-panel-body"><h3><Link to="/campaign-detail" search={{ slug: c.slug }}>{c.title}</Link></h3><div className="panel-expanded"><p>{storyDescription(c.story).slice(0, 160)}</p><Progress campaign={c} /><div className="amount-row"><span><strong>{shortMoney(c.raised)}</strong> of {shortMoney(c.goal)}</span><span>{percentage(c)}% funded</span></div><small>Previous fundraising</small><Button asChild variant="gold" className="gold-control"><Link to="/donate" search={{ slug: c.slug }}>Donate now</Link></Button></div></div>
  </article>)}<Link to="/campaigns" className="trending-see-all"><span>See all campaigns</span><span className="see-all-arrow"><ArrowRight /></span></Link></div>;
}