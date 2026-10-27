import { Link } from '@tanstack/react-router';
import { HandHeart, HandCoins, Sprout, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleIcon } from '@/components/title-icon';

const steps = [
  { Icon: HandHeart, title: 'Find a cause', text: 'Browse campaigns and pick the one that moves you.' },
  { Icon: HandCoins, title: 'Choose your gift', text: 'Choose a donation amount that feels right for you.' },
  { Icon: Sprout, title: 'Make an impact', text: 'Review your selected amount at secure checkout.' },
];

export function HomeProcess() {
  return <section className="home-process-band" aria-labelledby="home-process-title"><div className="container">
    <div className="home-centered-heading"><div className="eyebrow">How it works</div><h2 id="home-process-title"><TitleIcon topic="Donate in 3 simple steps"/>Donate in 3 simple steps</h2><p>From finding a cause to making a meaningful difference.</p></div>
    <ol className="home-process-grid">{steps.map(({ Icon, title, text }, index) => <li key={title}><div className="home-process-icon"><Icon size={28} aria-hidden="true"/><span>{String(index + 1).padStart(2, '0')}</span></div><h3><TitleIcon topic={title}/>{title}</h3><p>{text}</p></li>)}</ol>
  </div></section>;
}

export function HomeClosingCallout() {
  return <section className="home-closing-band"><div className="container"><div><h2><TitleIcon topic="Every brighter future begins with you."/>Every brighter future begins with you.</h2><p>Every act of kindness is a new beginning for someone who needs it.</p></div><Button asChild variant="gold" className="gold-control"><Link to="/campaigns">Find a campaign <ArrowRight size={18}/></Link></Button></div></section>;
}