import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import artwork from '@/data/support-artwork.json';
const articles = [
  {title:'How to choose a campaign thoughtfully',topic:'Fundraising Tips',photo:5,text:'Start with the story. Look for who needs help, what the stated goal covers, and how the organizer is connected to the beneficiary. Medical claims have not been independently verified by Hope Human.'},
  {title:'Sharing a story with dignity',topic:'Stories',photo:6,text:'Share the campaign link rather than republishing personal details without permission. Avoid adding urgency or medical claims that the organizer has not stated.'},
  {title:'A gift should be an informed choice',topic:'Fundraising Tips',photo:1,text:'Review the campaign, donation amount and payment terms at secure checkout. Fundraising approval and payment-provider eligibility are required before donations can be received; recipient verification is required before funds are released. Choosing an amount does not complete a payment; funds are held pending approved release.'},
  {title:'People behind every campaign',topic:'Stories',photo:2,text:'A person is more than a diagnosis or a difficult moment. Read the full story and treat personal information with care and respect.'},
  {title:'Understanding a fundraising goal',topic:'Fundraising Tips',photo:0,text:'Compare the stated goal with the needs described. Previous fundraising totals do not establish what a beneficiary needs today.'},
];
export function JournalPage() {
  const [topic,setTopic]=useState('All');
  const list=articles.filter(a=>topic==='All'||a.topic===topic);
  const lead=artwork[6];
  return <>
    <header className="journal-header">
      <div className="journal-header-inner">
        <div className="page-tag">The Hope Human journal</div>
        <h1>Stories that move<br/>people to act.</h1>
        <p>Real stories, fundraising tips, and community insights — everything you need to make a difference.</p>
      </div>
    </header>
    <div className="journal-tabs">{['All','Stories','Fundraising Tips'].map(t=><Button variant="ghost" key={t} aria-pressed={topic===t} onClick={()=>setTopic(t)}>{t}</Button>)}</div>
    <div className="journal-layout">
      <div>
        <article className="journal-lead">{lead&&<img src={lead.url} alt={lead.alt} width={lead.width} height={lead.height}/>}<div><h2>{articles[0]?.title}</h2><p>{articles[0]?.text}</p><Link to="/campaigns" className="plain-link">Read the campaign stories →</Link></div></article>
        <h2 className="journal-label">Latest articles</h2>
        <div className="journal-articles">{list.map(a=>{const image=artwork[a.photo];return <article className="journal-item" key={a.title}>{image&&<img src={image.url} alt={image.alt} width={image.width} height={image.height} loading="lazy"/>}<div><span className="journal-topic">{a.topic}</span><h2>{a.title}</h2><p>{a.text}</p></div></article>;})}</div>
      </div>
      <aside className="journal-topics"><h2>Browse topics</h2>{['All','Stories','Fundraising Tips'].map(t=><Button variant="outline" key={t} aria-pressed={topic===t} onClick={()=>setTopic(t)}>{t}</Button>)}</aside>
    </div>
    <section className="reference-cta"><div className="container"><h2>Ready to start your own story?</h2><Button variant="gold" asChild className="gold-control"><Link to="/start-yourself">Start a campaign →</Link></Button></div></section>
  </>;
}
