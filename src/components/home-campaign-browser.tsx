import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/campaign-card';
import { TitleIcon } from '@/components/title-icon';
import { campaignPage } from '@/lib/home-campaigns';
import { campaigns as allCampaigns, categories, type Campaign } from '@/lib/campaigns';

export function CampaignPager({ current, pages, onChange, label }: { current: number; pages: number; onChange: (page: number) => void; label: string }) {
  return <nav className="home-campaign-pager" aria-label={label}>
    <Button variant="outline" size="icon" aria-label={`Previous ${label}`} disabled={current === 0} onClick={() => onChange(current - 1)}><ChevronLeft size={18}/></Button>
    <span role="status" aria-live="polite">{current + 1} / {pages}</span>
    <Button variant="outline" size="icon" aria-label={`Next ${label}`} disabled={current >= pages - 1} onClick={() => onChange(current + 1)}><ChevronRight size={18}/></Button>
  </nav>;
}

export function HomeCampaignBrowser({ campaigns }: { campaigns: Campaign[] }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const available = categories.filter(c => c.id === 'all' || campaigns.some(item => item.category === c.id));
  const filtered = campaigns.filter(c => (category === 'all' || c.category === category) && `${c.title} ${c.beneficiary} ${c.location}`.toLowerCase().includes(query.trim().toLowerCase()));
  const { items, current, pages } = campaignPage(filtered, page, 8);
  return <section className="section container featured-section" aria-labelledby="home-featured-title">
    <div className="section-heading"><div><div className="eyebrow">More stories. More ways to help.</div><h2 id="home-featured-title"><TitleIcon topic="Featured campaigns to support"/>Find the story that moves you</h2></div><Link className="plain-link" to="/campaigns">All {allCampaigns.length} campaigns <ArrowRight size={14}/></Link></div>
    <div className="home-discovery-toolbar"><div className="input-wrap"><Search size={18}/><input className="form-input" aria-label="Search featured campaigns" placeholder="Search campaigns…" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }}/></div><select className="form-input" aria-label="Featured campaign category" value={category} onChange={e => { setCategory(e.target.value); setPage(0); }}>{available.map(c => <option key={c.id} value={c.id}>{c.id === 'all' ? 'All categories' : c.name} ({c.id === 'all' ? campaigns.length : campaigns.filter(item => item.category === c.id).length})</option>)}</select></div>
    <p className="home-result-count" role="status">{filtered.length ? `${current * 8 + 1}–${current * 8 + items.length} of ${filtered.length} campaigns` : 'No campaigns found'}</p>
    <div className="campaign-grid four">{items.map(c => <CampaignCard key={c.slug} campaign={c}/>)}</div>
    {!items.length && <div className="empty-state"><Button variant="outline" onClick={() => { setCategory('all'); setQuery(''); setPage(0); }}>Clear filters</Button></div>}
    <CampaignPager current={current} pages={pages} onChange={setPage} label="featured campaigns"/>
  </section>;
}