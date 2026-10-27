import { TitleIcon } from '@/components/title-icon';
import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Flag, ShieldCheck, Heart, Star, Instagram, MoreHorizontal, Copy, Mail, Send, HandHeart, CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { type Campaign, categoryName, money, percentage } from '@/lib/campaigns';

export function initials(name: string) { return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase(); }
export function campaignUrl(c: Campaign) {
  const origin = import.meta.env['VITE_SITE_URL']?.replace(/\/$/, '') || 'https://hopehumanfoundation.org';
  return `${origin}/campaign-detail?slug=${encodeURIComponent(c.slug)}`;
}
export function campaignMonth(c: { createdAt: string | null }) {
  if (!c.createdAt) return 'date unavailable';
  const date = new Date(c.createdAt);
  if (Number.isNaN(date.getTime())) return 'date unavailable';
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
type Action = 'contact' | 'report' | 'all' | 'top' | 'instagram' | 'tiktok' | null;

export function CampaignActionDialog({ campaign: c, action, onClose }: { campaign: Campaign; action: Action; onClose: () => void }) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [prepared, setPrepared] = useState('');
  const isEmail = action === 'contact' || action === 'report';
  const isSocial = action === 'instagram' || action === 'tiktok';
  const title = action === 'contact' ? `Contact about this fundraiser` : action === 'report' ? 'Report fundraiser' : action === 'top' ? 'Top donations' : action === 'all' ? 'All donations' : `Share on ${action === 'instagram' ? 'Instagram' : 'TikTok'}`;
  const emailHref = () => `mailto:support@hopehumanfoundation.org?subject=${encodeURIComponent(`${action === 'report' ? 'Fundraiser report' : 'Organizer contact request'}: ${c.title}`)}&body=${encodeURIComponent(`Campaign: ${campaignUrl(c)}\nOrganizer: ${c.organizer}\n\n${message.trim()}`)}`;
  return <Dialog open={action !== null} onOpenChange={v => { if (!v) onClose(); }}><DialogContent className="campaign-action-dialog" onOpenAutoFocus={() => { if (document.activeElement instanceof HTMLElement) returnFocus.current = document.activeElement; }} onCloseAutoFocus={event => { event.preventDefault(); returnFocus.current?.focus(); }}><DialogTitle>{title}</DialogTitle><DialogDescription>{isEmail ? `Your email will go to Hope Human Foundation support about ${c.organizer}'s campaign.` : isSocial ? 'Copy the campaign link, then add it to your post, story or profile in the app.' : 'Individual donor records and donation amounts are not available for this campaign.'}</DialogDescription>
    {isEmail && <form onSubmit={e => { e.preventDefault(); if (message.trim().length < 10) { setError('Please write at least 10 characters so support can help.'); return; } setError(''); setPrepared(emailHref()); }}><label htmlFor="campaign-message">{action === 'report' ? 'What would you like to report?' : 'Your message'}</label><textarea id="campaign-message" className="form-input" rows={5} value={message} onChange={e => { setMessage(e.target.value); setPrepared(''); }} required minLength={10} />{error && <p role="alert" className="form-error">{error}</p>}<p className="action-note">Nothing is sent automatically; include your reply address in your email.</p><Button variant="pill" type="submit"><Mail />Prepare email</Button>{prepared && <Button variant="outline" asChild><a href={prepared}><Mail />Open email app</a></Button>}</form>}
    {isSocial && <><Button variant="pill" onClick={async () => { try { await navigator.clipboard.writeText(campaignUrl(c)); setCopied(true); } catch { setError('Copy the campaign link below.'); } }}><Copy />Copy campaign link</Button><input aria-label="Campaign sharing link" className="form-input" readOnly value={action ? campaignUrl(c) : ''} onFocus={e => e.target.select()} />{copied && <p role="status">Link copied. No post has been published.</p>}{error && <p role="status">{error}</p>}</>}
    {!isEmail && !isSocial && <div className="donor-dialog-empty"><Heart /><h3><TitleIcon topic="No donor records available" />No donor records available</h3><p>Words of support remain available on the campaign page. Previous fundraising totals do not establish individual donation records.</p></div>}
  </DialogContent></Dialog>;
}

export function OrganizerFooter({ campaign: c, onAction }: { campaign: Campaign; onAction: (action: Action) => void }) {
  return <section className="campaign-organizer-footer" aria-label="Organizer and campaign information"><h2><TitleIcon topic="Organizer & beneficiary" />Organizer & beneficiary</h2><div className="footer-organizer"><span className="organizer-avatar">{initials(c.organizer)}</span><div><strong>{c.organizer}</strong><small>Organizer · {c.location}</small></div></div><Button className="mobile-organizer-contact" variant="outline" onClick={() => onAction('contact')}><Mail aria-hidden="true" />Contact</Button><div className="footer-beneficiary">Beneficiary: <strong>{c.beneficiary}</strong></div><div className="campaign-created">Created · {campaignMonth(c)} <span>·</span> <Link to="/campaigns" search={{ category: c.category }}>{categoryName(c.category)}</Link></div><Link to="/guarantee" className="campaign-shield-badge"><ShieldCheck />Giving with transparency</Link><div className="campaign-report"><Button variant="ghost" onClick={() => onAction('report')}><Flag />Report fundraiser</Button><p>Campaign stories are provided by their creators and do not represent the opinion or endorsement of Hope Human Foundation.</p></div></section>;
}

export function DonorOrganizerRail({ campaign: c, onAction }: { campaign: Campaign; onAction: (action: Action) => void }) {
  return <><section className="donor-records" aria-label="Donations"><h3><TitleIcon topic="Donations" />Donations</h3><div className="donor-empty"><span className="donor-empty-icon"><Heart /></span><div><strong>No donor records available</strong><p>Individual names and amounts are not available.</p></div></div><div className="donor-view-actions"><Button variant="pill" onClick={() => onAction('all')}>See all</Button><Button variant="outline" onClick={() => onAction('top')}><Star />See top</Button></div></section><section className="rail-organizer" aria-label="Contact organizer"><div className="footer-organizer"><span className="organizer-avatar">{initials(c.organizer)}</span><div><strong>{c.organizer}</strong><small>Campaign created {campaignMonth(c)}</small></div></div><Button variant="outline" onClick={() => onAction('contact')}><Mail aria-hidden="true"/>Contact</Button></section></>;
}

export function CampaignTrustBand() {
  return <section className="campaign-trust-band"><div className="detail-wide-container"><h2><TitleIcon topic="Your trusted, powerful and easy place to get help" />Your trusted, powerful and easy place to get help</h2><div className="campaign-trust-grid"><div><Send aria-hidden="true" strokeWidth={1.8} /><div><h3><TitleIcon topic="Easy" />Easy</h3><p>Find and share the causes<br className="desktop-copy-break" /> that matter to you.</p></div></div><div><HandHeart aria-hidden="true" strokeWidth={1.8} /><div><h3><TitleIcon topic="Powerful" />Powerful</h3><p>Help people and important<br className="desktop-copy-break" /> causes reach more people.</p></div></div><div><CircleHelp aria-hidden="true" strokeWidth={1.8} /><div><h3><TitleIcon topic="Trusted" />Trusted</h3><p>Learn about giving through<br className="desktop-copy-break" /> <Link to="/guarantee">Hope Human Foundation.</Link></p></div></div></div></div></section>;
}

function SocialMark({ type }: { type: string }) {
  if (type === 'instagram') return <Instagram />;
  if (type === 'more') return <MoreHorizontal />;
  if (type === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 22v-9h3l.5-3.5h-3.5V7.2c0-1 .3-1.7 1.8-1.7H18V2.4c-.3 0-1.3-.1-2.5-.1-2.6 0-4.4 1.6-4.4 4.5v2.7H8V13h3.1v9z" /></svg>;
  if (type === 'tiktok') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15 2h3c.2 2.3 1.5 3.8 4 4.1v3.1a9 9 0 0 1-4-1.2v7a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 3 2.8V2z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.3.8-1.7 1.4-2.4 1.2-3.2-.8-6.1-3.3-7.4-6.2-.6-1.4-.1-2.8.5-3.2.4-.2.9-.2 1.1.2l1 2c.2.4-.4 1-.7 1.3.9 1.7 2.1 2.7 3.8 3.4.3-.4 1-1.4 1.4-1.2l2.4 1.1c.5.2.5.8.3 1.4Z" /></svg>;
}

export function CampaignSharingSection({ campaign: c, onDonate, onAction, onShare }: { campaign: Campaign; onDonate: () => void; onAction: (action: Action) => void; onShare: () => void }) {
  function social(type: string) {
    const url = campaignUrl(c);
    if (type === 'facebook' || type === 'whatsapp') window.open(type === 'facebook' ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` : `https://wa.me/?text=${encodeURIComponent(`${c.title}\n${url}`)}`, '_blank', 'noopener,noreferrer');
    else if (type === 'instagram' || type === 'tiktok') onAction(type);
    else onShare();
  }
  return <section className="campaign-sharing-section"><div className="detail-wide-container sharing-layout"><div className="sharing-copy"><h2><TitleIcon topic="Sharing helps more than  you think" />Sharing helps more than<br className="sharing-heading-break" /> you think</h2><p>Every share can help this fundraiser reach more people and bring attention to a cause that matters.</p><div className="campaign-social-buttons">{['facebook', 'instagram', 'tiktok', 'whatsapp', 'more'].map(type => <Button key={type} variant="circle" size="icon" className={`social-circle social-${type}`} aria-label={type === 'more' ? 'More sharing options' : `Share on ${type === 'tiktok' ? 'TikTok' : type[0]?.toUpperCase() + type.slice(1)}`} onClick={() => social(type)}><SocialMark type={type} /></Button>)}</div></div><div className="sharing-card-composition" aria-label="Campaign sharing preview">{['left', 'right', 'center'].map(position => <div className={`sharing-art-card sharing-art-${position}`} key={position} aria-hidden={position !== 'center' || undefined}><img src={c.image.url} alt={position === 'center' ? c.title : ''} width={c.image.width} height={c.image.height} loading="lazy" /><div className="sharing-art-body"><h3><TitleIcon category={c.category} />{c.title}</h3><div className="sharing-art-organizer"><span>{initials(c.organizer)}</span> by {c.organizer}</div><div className="sharing-art-funding"><div><strong>{money(c.raised)}</strong><small>Previous fundraising</small></div><div className="sharing-art-ring"><svg viewBox="0 0 44 44" aria-hidden="true"><circle className="ring-track" cx="22" cy="22" r="19"/><circle className="ring-value" cx="22" cy="22" r="19" strokeDasharray={`${Math.min(percentage(c),100)*1.194} 119.4`}/></svg><b>{percentage(c)}%</b></div></div><div className="sharing-art-goal">Goal: {money(c.goal)}</div>{position === 'center' ? <Button variant="gold" onClick={onDonate}>Donate now!</Button> : <span className="sharing-art-donate">Donate now!</span>}</div></div>)}</div></div></section>;
}