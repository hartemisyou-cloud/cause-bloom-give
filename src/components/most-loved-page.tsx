import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/campaign-card';
import { campaigns, categories, shortMoney } from '@/lib/campaigns';
import { useFavorites } from '@/hooks/use-favorites';

export function MostLovedPage() {
  const ranked = useMemo(() => [...campaigns].sort((a, b) => b.raised - a.raised), []);
  const raised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const { favorites } = useFavorites();
  const q = query.trim().toLowerCase();
  const list = ranked.map((c, i) => ({ c, rank: i + 1 })).filter(({ c }) =>
    (category === 'all' || (category === 'saved' ? favorites.includes(c.slug) : c.category === category)) &&
    (!q || c.title.toLowerCase().includes(q)));
  const chips = [...categories.map(c => ({ id: c.id, name: c.id === 'all' ? 'All' : c.name })), { id: 'saved', name: `Your favorites (${favorites.length})` }];
  return <>
    <section className="loved-hero"><div className="loved-intro"><div className="eyebrow">Most Loved</div><h1>Campaigns that move hearts &amp;<br/>inspire generosity</h1><p>These are the campaigns people have supported the most so far. Find a story that moves you.</p>
      <div className="loved-stats"><div><strong>{shortMoney(raised)}</strong><span>Previous fundraising</span></div><div><strong>{campaigns.length}</strong><span>Campaign stories</span></div></div></div></section>
    <section className="loved-top"><div className="loved-band-heading"><div><div className="eyebrow">Most Loved</div><h2>Top 3 campaigns</h2><p>Ranked by each campaign’s previous fundraising total.</p></div><Button asChild variant="outline"><Link to="/campaigns">See all <ArrowRight size={14}/></Link></Button></div>
      <div className="campaign-grid">{ranked.slice(0, 3).map((c, i) => <div className="loved-ranked" key={c.slug}><span className="loved-rank">{i + 1}</span><CampaignCard campaign={c}/></div>)}</div></section>
    <section className="section container"><div className="section-heading"><h2>All campaigns, ranked</h2></div>
      <div className="loved-tools"><div className="input-wrap"><Search/><input className="form-input" placeholder="Search campaigns…" aria-label="Search ranked campaigns" value={query} onChange={e => setQuery(e.target.value)}/></div></div>
      <div className="loved-chips" role="group" aria-label="Filter by category">{chips.map(ch => <button type="button" key={ch.id} aria-pressed={category === ch.id} onClick={() => setCategory(ch.id)}>{ch.name}</button>)}</div>
      <p className="result-count" role="status">Showing {list.length} campaigns</p>
      <div className="campaign-grid loved-grid">{list.map(({ c, rank }) => <div className="loved-ranked" key={c.slug}><span className="loved-rank">{rank}</span><CampaignCard campaign={c}/></div>)}</div>
      {!list.length && <div className="empty-state"><h2>No campaigns found</h2><p>{category === 'saved' ? 'Tap the heart on any campaign to save it here. Favorites stay on this device.' : 'Try another search or category.'}</p></div>}
    </section></>;
}
