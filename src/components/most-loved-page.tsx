import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/campaign-card';
import { campaigns, shortMoney } from '@/lib/campaigns';

export function MostLovedPage() {
  const ranked = [...campaigns].sort((a, b) => b.raised - a.raised);
  const raised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  return <><section className="loved-hero"><div className="loved-intro"><div className="eyebrow">Most Loved</div><h1>Campaigns that move hearts &amp;<br/>change lives</h1><p>Discover the campaigns with the most previous fundraising, and find a story that moves you.</p><div className="loved-stats"><div><strong>{shortMoney(raised)}</strong><span>Previous fundraising</span></div><div><strong>{campaigns.length}</strong><span>Campaign stories</span></div></div></div></section><section className="loved-top"><div className="loved-band-heading"><div><div className="eyebrow">Most Loved</div><h2>Top 3 campaigns</h2><p>Ranked by previous fundraising, not live activity.</p></div><Button asChild variant="outline"><Link to="/campaigns">See all <ArrowRight size={14}/></Link></Button></div><div className="campaign-grid">{ranked.slice(0, 3).map((campaign, index) => <div className="loved-ranked" key={campaign.slug}><span className="loved-rank">{index + 1}</span><CampaignCard campaign={campaign}/></div>)}</div></section><section className="section container"><div className="section-heading"><h2>More stories to support</h2></div><div className="campaign-grid">{ranked.slice(3, 12).map(campaign => <CampaignCard key={campaign.slug} campaign={campaign}/>)}</div></section></>;
}