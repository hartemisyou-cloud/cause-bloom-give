import { money, percentage, progressValue, type Campaign } from '@/lib/campaigns';

export function FundingRing({ campaign }: { campaign: Campaign }) {
  return <div className="funding-ring"><svg viewBox="0 0 44 44" aria-hidden="true"><circle className="ring-track" cx="22" cy="22" r="19" /><circle className="ring-value" cx="22" cy="22" r="19" strokeDasharray={`${progressValue(campaign) * 1.194} 119.4`} /></svg><span>{percentage(campaign)}%</span></div>;
}

export function CampaignFunding({ campaign }: { campaign: Campaign }) {
  return <div className="raised-row"><FundingRing campaign={campaign} /><div><div className="raised">{money(campaign.raised)}</div><div className="raised-label">Previous fundraising</div><div className="goal">of {money(campaign.goal)} goal</div></div></div>;
}