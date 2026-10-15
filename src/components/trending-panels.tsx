import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/campaign-card';
import { type Campaign, categoryName, shortMoney, percentage } from '@/lib/campaigns';
import { storyDescription } from '@/lib/campaign-story';

export function TrendingPanels({ campaigns }: { campaigns: Campaign[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = campaigns.length;
  function move(e: React.KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i + n - 1) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next < 0) return;
    e.preventDefault(); setActive(next); refs.current[next]?.focus();
  }
  return <div className="trending-panels" role="group" aria-label="Trending campaigns">{campaigns.map((c, i) => <article key={c.slug} className={`trending-panel ${active === i ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)}>
    <img src={c.image.url} alt={c.title} width={c.image.width} height={c.image.height} loading="lazy" />
    <Button ref={el => { refs.current[i] = el; }} variant="ghost" className="panel-activate" tabIndex={active === i ? 0 : -1} aria-label={`Expand ${c.title}`} aria-expanded={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onKeyDown={e => move(e, i)}><ChevronDown/></Button>
    <span className="panel-category">{categoryName(c.category)}</span><div className="trending-panel-body"><h3><Link to="/campaign-detail" search={{ slug: c.slug }} tabIndex={active === i ? 0 : -1}>{c.title}</Link></h3><div className="panel-expanded" hidden={active !== i}><p>{storyDescription(c.story).slice(0, 160)}</p><Progress campaign={c} /><div className="amount-row"><span><strong>{shortMoney(c.raised)}</strong> of {shortMoney(c.goal)}</span><span>{percentage(c)}% funded</span></div><small>Previous fundraising</small><Link to="/campaign-detail" search={{ slug: c.slug }} className="panel-read-more">Read the story<span className="sr-only"> of {c.title}</span> <ArrowRight size={14}/></Link></div></div>
  </article>)}<Link to="/campaigns" className="trending-see-all"><span className="see-all-arrow"><ArrowRight /></span><span className="see-all-label">See all campaigns</span></Link></div>;
}
