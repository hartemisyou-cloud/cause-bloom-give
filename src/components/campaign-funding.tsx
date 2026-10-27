import { Link } from '@tanstack/react-router';
import { HandHeart, Heart, Lock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { donationAmounts } from '@/lib/checkout';
import { money, percentage, progressValue, type Campaign } from '@/lib/campaigns';

export function CampaignGivePanel({ campaign: c, onShare }: { campaign: Campaign; onShare: () => void }) {
  return <div className="give-panel">
    <p className="give-eyebrow"><Heart aria-hidden="true" size={16} />Give now — every second counts</p>
    <div className="give-raised">{money(c.raised)}</div>
    <p className="give-goal">previous fundraising · goal {money(c.goal)}</p>
    <div className="give-progress" role="progressbar" aria-label="Previous fundraising progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue(c)}><span style={{ width: `${progressValue(c)}%` }} /></div>
    <p className="give-funded">{percentage(c)}% funded</p>
    <div className="give-amounts">{donationAmounts.map(value => <Link key={value} to="/donate" search={{ slug: c.slug, amount: value }} className={value === 50 ? 'is-suggested' : ''} aria-label={`Choose $${value}`}>{value === 50 && <small>Suggested</small>}${value}</Link>)}</div>
    <Button asChild variant="gold" className="give-donate"><Link to="/donate" search={{ slug: c.slug, amount: 50 }}><HandHeart aria-hidden="true" />Donate $50</Link></Button>
    <Button variant="outline" className="give-share" onClick={onShare}><Share2 aria-hidden="true" />Share this campaign</Button>
    <p className="give-trust"><Lock aria-hidden="true" size={12} />SSL encrypted · Verified campaign</p>
  </div>;
}

export function FundingRing({ campaign }: { campaign: Campaign }) {
  return <div className="funding-ring"><svg viewBox="0 0 44 44" aria-hidden="true"><circle className="ring-track" cx="22" cy="22" r="19" /><circle className="ring-value" cx="22" cy="22" r="19" strokeDasharray={`${progressValue(campaign) * 1.194} 119.4`} /></svg><span>{percentage(campaign)}%</span></div>;
}

export function CampaignFunding({ campaign }: { campaign: Campaign }) {
  return <div className="raised-row"><FundingRing campaign={campaign} /><div><div className="raised">{money(campaign.raised)}</div><div className="raised-label">Previous fundraising</div><div className="goal">of {money(campaign.goal)} goal</div></div></div>;
}