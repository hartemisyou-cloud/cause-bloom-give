import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { CampaignSocialProof, RecentDonations } from '../src/components/campaign-social-proof';
import { CampaignSupport } from '../src/components/campaign-support';
import { publicDonations, publicMessages, type CampaignActivity, type PublicDonation } from '../src/lib/campaign-social-proof';
import '../src/styles.css';
function Demo() {
 const [count, setCount] = useState(5);
 const [status, setStatus] = useState<CampaignActivity['status']>('ready');
 const [funding, setFunding] = useState<'partial' | 'funded'>('partial');
 const now = new Date().toISOString();
 const records: PublicDonation[] = Array.from({ length: count }, (_, i) => ({ id: `test-${i}`, campaignSlug: 'test-only', status: 'confirmed', eligible: true, public: true, name: `TEST Supporter ${i + 1}`, anonymous: i % 3 === 0, amountVisible: i % 4 !== 0, amountCents: (i + 1) * 2000, confirmedAt: new Date(Date.parse(now) - i * 3600000).toISOString() }));
 const activity: CampaignActivity = { status, donations: publicDonations(records, 'test-only'), messages: publicMessages(records.map((d, i) => ({ id: `message-${i}`, campaignSlug: 'test-only', public: true, name: d.name, anonymous: d.anonymous, donationId: d.id, createdAt: d.confirmedAt, message: i % 2 ? 'TEST DATA — A short message of support.' : 'TEST DATA — This is an isolated layout test, not a real donation or testimony. '.repeat(8) })), 'test-only') };
 return <main className="detail-page activity-demo"><header className="activity-demo-banner"><h1>TEST DATA — development only</h1><p>No real donors, payments, public metrics or analytics. Funding scenario: {funding === 'partial' ? 'partially funded' : 'goal reached'}.</p><div className="activity-demo-controls">{[0,1,5,50].map(n=><Button key={n} variant="outline" aria-pressed={n===count} onClick={()=>setCount(n)}>{n} donors</Button>)}{(['ready','loading','error'] as const).map(s=><Button key={s} variant="outline" aria-pressed={s===status} onClick={()=>setStatus(s)}>{s}</Button>)}<Button variant="outline" onClick={()=>setFunding(funding==='partial'?'funded':'partial')}>Toggle funding scenario</Button></div></header><div className="activity-demo-columns"><div><CampaignSocialProof key={`${count}-${status}`} activity={activity}/><CampaignSupport key={`${count}-${status}-messages`} campaign={{slug:'test-only',support:[]}} activity={activity}/></div><aside><p>{funding==='partial'?'$5,000 / $10,000 — TEST':'$10,000 / $10,000 — TEST'}</p><RecentDonations key={`${count}-${status}`} activity={activity}/></aside></div></main>;
}
// Independent Vite entry: never linked from visitor routes, no root shell or Pixel.
if (import.meta.env.DEV) { const element = document.getElementById('demo'); if (element) createRoot(element).render(<Demo/>); }
