import { TitleIcon } from '@/components/title-icon';
import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { ChevronRight, Share2, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/campaign-card';
import { CampaignGallery } from '@/components/campaign-gallery';
import { CampaignFunding } from '@/components/campaign-funding';
import { getCampaign, campaigns, type Campaign } from '@/lib/campaigns';
import { pageHead } from '@/lib/site';
import { useDonationBar } from '@/hooks/use-donation-bar';
import { CampaignStoryActions } from '@/components/campaign-story-actions';
import { CampaignStory } from '@/components/campaign-story';
import { storyDescription } from '@/lib/campaign-story';
import { OrganizerFooter, DonorOrganizerRail, CampaignTrustBand, CampaignSharingSection, CampaignActionDialog, campaignUrl, initials } from '@/components/campaign-detail-sections';
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
  const [allSupport, setAllSupport] = useState(false);
  const [action, setAction] = useState<'contact' | 'report' | 'all' | 'top' | 'instagram' | 'tiktok' | null>(null);
  const navigate = useNavigate();
  const donate = () => navigate({ to: '/donate', search: { slug: c.slug } });
  const related = campaigns.filter(v => v.category === c.category && v.slug !== c.slug).slice(0, 3);
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
  const actions = <div className="donation-actions"><Button variant="gold" className="gold-control" onClick={donate}><HandHeart aria-hidden="true" />Donate now</Button><Button variant="pill" onClick={share}><Share2 aria-hidden="true" />Share</Button></div>;
  return <div className="detail-page" ref={pageRef}>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight aria-hidden="true" size={12} /><Link to="/campaigns">Campaigns</Link><ChevronRight aria-hidden="true" size={12} /><span>{c.title}</span></nav>
    <div className="detail-layout">
      <div className="detail-main">
        <h1 className="detail-title"><TitleIcon category={c.category} />{c.title}</h1>
        <CampaignGallery campaign={c} onReadStory={readStory} />
        <div className="mobile-funding"><CampaignFunding campaign={c} />{actions}</div>
        <div className="organizer-row"><span className="organizer-avatar">{initials(c.organizer)}</span><div><strong>{c.organizer}</strong> is organizing this fundraiser.</div></div>
        <section className="story-section first-story" ref={storyRef} tabIndex={-1} aria-label="Campaign story">
          <CampaignStory story={c.story} expanded={expanded} />
          {c.story.length > 900 && <Button variant="link" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Read less' : 'Read more'}<ChevronRight aria-hidden="true" size={14} /></Button>}
          <details className="snapshot-note"><summary>Campaign information</summary><p>Source medical statements have not been independently verified. Beneficiary surnames are alternate display names; first names and story facts are retained.</p></details>
        </section>
        <CampaignStoryActions campaign={c} onShare={share} />
        <section className="story-section"><h2><TitleIcon topic="Words of support" />Words of support <span>({c.support.length})</span></h2>
          {(allSupport ? c.support : c.support.slice(0, 6)).map((w, i) => <div className="support-word" key={i}><div className="organizer-row"><span className="organizer-avatar">{initials(w.name)}</span><strong>{w.name}</strong></div><p>{w.message}</p></div>)}
          {!c.support.length && <p className="snapshot-note">No messages yet.</p>}
          {c.support.length > 6 && <Button variant="link" onClick={() => setAllSupport(!allSupport)}>{allSupport ? 'Show fewer messages' : `See all ${c.support.length} messages`}</Button>}
        </section>
        <OrganizerFooter campaign={c} onAction={setAction} />
        <div className="mobile-campaign-rail"><DonorOrganizerRail campaign={c} onAction={setAction} /></div>
      </div>
      <aside className="donation-panel" aria-label="Support this campaign"><CampaignFunding campaign={c} />{actions}<DonorOrganizerRail campaign={c} onAction={setAction} /><p className="panel-footnote">Your donation supports this campaign and its cause directly. Recipient verification and an eligible payout route are required before funds can be released; no approval or payment is confirmed here.</p></aside>
    </div>
    <CampaignTrustBand />
    <CampaignSharingSection campaign={c} onDonate={donate} onAction={setAction} onShare={share} />
    {shared && <p className="sharing-status detail-wide-container" role="status">{shared}</p>}
    <section className="section container detail-related"><div className="section-heading"><h2><TitleIcon topic="Related campaigns" />Related campaigns</h2><Link className="plain-link" to="/campaigns">See all campaigns <ChevronRight aria-hidden="true" size={14} /></Link></div><div className="campaign-grid">{related.map(v => <CampaignCard key={v.slug} campaign={v} />)}</div></section>
    <div className="mobile-donate" hidden={!showDonationBar}><CampaignFunding campaign={c} /><Button variant="gold" className="gold-control" onClick={donate}><HandHeart aria-hidden="true" />Donate now</Button></div>
    <CampaignActionDialog key={`${c.slug}-${action}`} campaign={c} action={action} onClose={() => setAction(null)} />
  </div>;
}
