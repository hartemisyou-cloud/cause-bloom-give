import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { ChevronRight, HandHeart, MapPin, CalendarDays, BadgeCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignRelated } from '@/components/campaign-related';
import { CampaignSupport } from '@/components/campaign-support';
import { CampaignGallery } from '@/components/campaign-gallery';
import { CampaignFunding, CampaignGivePanel } from '@/components/campaign-funding';
import { getCampaign, categoryName, type Campaign } from '@/lib/campaigns';
import { pageHead } from '@/lib/site';
import { useDonationBar } from '@/hooks/use-donation-bar';
import { CampaignStoryActions } from '@/components/campaign-story-actions';
import { CampaignSocialProof, RecentDonations } from '@/components/campaign-social-proof';
import { campaignActivity } from '@/lib/campaign-social-proof';
import { CampaignStory } from '@/components/campaign-story';
import { storyDescription } from '@/lib/campaign-story';
import { OrganizerFooter, CampaignTrustBand, CampaignSharingSection, CampaignActionDialog, campaignUrl, initials } from '@/components/campaign-detail-sections';
export const Route=createFileRoute('/campaign-detail')({validateSearch:(s:Record<string,unknown>)=>({slug:typeof s['slug']==='string'?s['slug']:''}),loaderDeps:({search})=>({slug:search.slug}),loader:({deps})=>{const c=getCampaign(deps['slug']);if(!c)throw notFound();return c;},head:({loaderData})=>loaderData?pageHead(loaderData.title,storyDescription(loaderData.story),`/campaign-detail?slug=${loaderData.slug}`):{...pageHead('Campaign not found','The requested Hope Human Foundation campaign is unavailable.','/campaign-detail'),meta:[...pageHead('Campaign not found','The requested Hope Human Foundation campaign is unavailable.','/campaign-detail').meta,{name:'robots',content:'noindex'}]},component:CampaignDetail});
function CampaignDetail() {
  const c = Route.useLoaderData();
  return <CampaignDetailContent key={c.slug} campaign={c} />;
}

function CampaignDetailContent({ campaign: c }: { campaign: Campaign }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const showDonationBar = useDonationBar(pageRef, c.slug, '.campaign-sharing-section, .detail-related');
  const [expanded, setExpanded] = useState(false);
  const [shared, setShared] = useState('');
  const [action, setAction] = useState<'contact' | 'report' | 'all' | 'top' | 'instagram' | 'tiktok' | null>(null);
  const navigate = useNavigate();
  const activity = campaignActivity(c);
  const donate = () => navigate({ to: '/donate', search: { slug: c.slug } });
  function readStory() {
    setExpanded(true);
    requestAnimationFrame(() => {
      storyRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      storyRef.current?.focus({ preventScroll: true });
    });
  }
  async function share() {
    const url = campaignUrl(c);
    try {
      if (navigator.share) await navigator.share({ title: c.title, url });
      else { await navigator.clipboard.writeText(url); setShared('Campaign link copied.'); }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShared('Copy the page address to share this campaign.');
    }
  }
  return <div className="detail-page" ref={pageRef}>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight aria-hidden="true" size={12} /><Link to="/campaigns">Campaigns</Link><ChevronRight aria-hidden="true" size={12} /><span>{c.title}</span></nav>
    <div className="detail-layout">
      <div className="detail-main">
        <CampaignGallery campaign={c} onReadStory={readStory} />
        <div className="detail-chips"><span className="chip-category">{categoryName(c.category)}</span><span className="chip-verified"><BadgeCheck aria-hidden="true" size={13} />Verified campaign</span>{c.urgent && <span className="chip-urgent"><Zap aria-hidden="true" size={13} />Urgent</span>}</div>
        <h1 className="detail-title">{c.title}</h1>
        <p className="detail-meta">{c.location && <span><MapPin aria-hidden="true" size={14} />{c.location}</span>}{c.createdAt && <span><CalendarDays aria-hidden="true" size={14} />Created {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>}</p>
        <div className="mobile-funding"><CampaignGivePanel campaign={c} onShare={share} /></div>
        <div className="organizer-row"><span className="organizer-avatar">{initials(c.organizer)}</span><div className="organizer-copy"><small>Organized by</small><strong>{c.organizer}</strong>{c.location && <span>{c.location}</span>}</div>{c.beneficiary && <div className="organizer-beneficiary"><strong>Beneficiary</strong><span>{c.beneficiary}</span></div>}</div>
        <section className="story-section first-story" ref={storyRef} tabIndex={-1} aria-label="Campaign story">
          <h2 className="story-title">Their story — in their own words</h2>
          <CampaignStory story={c.story} expanded={expanded} />
          {c.story.length > 900 && <Button variant="link" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Read less' : 'Read more'}<ChevronRight aria-hidden="true" size={14} /></Button>}
          <details className="snapshot-note"><summary>Campaign information</summary><p>Source medical statements have not been independently verified. Beneficiary surnames are alternate display names; first names and story facts are retained.</p></details>
        </section>
        <CampaignStoryActions campaign={c} onShare={share} />
        <div className="mobile-recent-donations"><RecentDonations activity={activity}/></div>
        <CampaignSocialProof activity={activity} />
        <CampaignSupport campaign={c} activity={activity} />
        <OrganizerFooter campaign={c} onAction={setAction} />
      </div>
      <aside className="donation-panel" aria-label="Support this campaign"><CampaignGivePanel campaign={c} onShare={share} /><RecentDonations activity={activity}/><div className="proof-organizer"><span className="organizer-avatar" aria-hidden="true">{initials(c.organizer)}</span><div><strong>{c.organizer}</strong><small>Campaign organizer</small></div><Button variant="outline" onClick={() => setAction('contact')}>Contact</Button></div></aside>
    </div>
    <CampaignTrustBand />
    <CampaignSharingSection campaign={c} onDonate={donate} onAction={setAction} onShare={share} />
    {shared && <p className="sharing-status detail-wide-container" role="status">{shared}</p>}
    <CampaignRelated campaign={c} />
    <div className="mobile-donate" hidden={!showDonationBar}><CampaignFunding campaign={c} /><Button variant="gold" className="gold-control" onClick={donate}><HandHeart aria-hidden="true" />Donate now</Button></div>
    <CampaignActionDialog key={`${c.slug}-${action}`} campaign={c} action={action} onClose={() => setAction(null)} />
  </div>;
}
