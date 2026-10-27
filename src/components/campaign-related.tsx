import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleIcon } from '@/components/title-icon';
import { Progress } from '@/components/campaign-card';
import { campaigns, categories, categoryName, shortMoney, type Campaign } from '@/lib/campaigns';

export function CampaignRelated({ campaign }: { campaign: Campaign }) {
  const [category, setCategory] = useState(campaign.category);
  const rail = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });
  const related = campaigns.filter(record => record.slug !== campaign.slug && (category === 'all' || record.category === category));
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    element.scrollLeft = 0;
    function update() {
      if (!element) return;
      setBounds({ start: element.scrollLeft < 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); element.removeEventListener('scroll', update); };
  }, [category, campaign.slug]);
  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * 292, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section className="detail-related" aria-labelledby="related-title"><div className="related-inner">
    <div className="related-heading"><h2 id="related-title"><TitleIcon topic="Related campaigns" />More ways to make a difference. Find fundraisers inspired by what matters to you.</h2><Link className="plain-link" to="/campaigns">See all campaigns<ChevronRight aria-hidden="true" /></Link></div>
    <div className="related-toolbar"><label className="related-filter"><TitleIcon topic="Explore causes" /><select aria-label="Related campaign category" value={category} onChange={event => setCategory(event.target.value)}>{categories.filter(item => item.count > 0).map(item => <option value={item.id} key={item.id}>{item.id === 'all' ? 'All causes' : item.name}</option>)}</select></label><div className="related-navigation"><Button variant="circle" size="icon" aria-label="Previous related campaigns" disabled={bounds.start} onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></Button><Button variant="circle" size="icon" aria-label="Next related campaigns" disabled={bounds.end} onClick={() => move(1)}><ChevronRight aria-hidden="true" /></Button></div></div>
    <div className="related-rail" ref={rail} tabIndex={0} aria-label="Related campaigns" onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
      {related.map(record => <article className="related-card" key={record.slug}><Link to="/campaign-detail" search={{ slug: record.slug }} className="related-image" tabIndex={-1} aria-label={record.title}><img src={record.thumbnail.url} alt={record.title} width={record.thumbnail.width} height={record.thumbnail.height} loading="lazy" decoding="async" /><span><TitleIcon category={record.category} />{categoryName(record.category)}</span></Link><div className="related-card-body"><p className="related-organizer">By {record.organizer}</p><h3><Link to="/campaign-detail" search={{ slug: record.slug }}>{record.title}</Link></h3><Progress campaign={record} /><strong>{shortMoney(record.raised)} raised</strong><small>Previous fundraising</small></div></article>)}
      {!related.length && <p className="related-empty">No other campaigns in this category.</p>}
    </div>
  </div></section>;
}