import { TitleIcon } from '@/components/title-icon';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, Share2, Copy, Handshake, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Campaign } from '@/lib/campaigns';
export function CampaignStoryActions({campaign:c,onShare}:{campaign:Campaign;onShare:()=>void}){
 const [reaction,setReaction]=useState<string|null>(null);
 return <div className="story-actions"><div className="story-reactions"><span>React</span>{[{label:'Love',Icon:Heart},{label:'Support',Icon:Handshake},{label:'Hope',Icon:Sprout}].map(r=><Button key={r.label} variant="outline" size="icon" aria-label={`React with ${r.label}`} aria-pressed={reaction===r.label} onClick={()=>setReaction(reaction===r.label?null:r.label)}><r.Icon aria-hidden="true" strokeWidth={1.8} /></Button>)}</div><div className="story-action-buttons"><Button variant="outline" asChild><Link to="/donate" search={{slug:c.slug}}><Heart/>Donate</Link></Button><Button variant="outline" onClick={onShare}><Share2/>Share</Button></div><section className="story-share-block"><h2><TitleIcon topic="Sharing helps more than you think" />Sharing helps more than you think</h2><p>Help this story reach people who care.</p><Link to="/campaign-detail" search={{slug:c.slug}} className="share-preview"><img src={c.thumbnail.url} width={c.thumbnail.width} height={c.thumbnail.height} alt={c.title} loading="lazy"/><span><strong>{c.title}</strong><small>Organized by {c.organizer}</small></span></Link><Button variant="circle" size="icon" aria-label="Copy or share campaign link" onClick={onShare}><Copy/></Button></section></div>;
}