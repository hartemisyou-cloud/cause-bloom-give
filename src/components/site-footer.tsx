import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Heart } from 'lucide-react';
import logo from '@/assets/hope-human-logo.png.asset.json';

const foundation = [{ to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact Us' }, { to: '/blog', label: 'Our Journal' }, { to: '/events', label: 'Events' }] as const;
const policies = [{ to: '/privacy-policy', label: 'Privacy Policy' }, { to: '/terms-of-use', label: 'Terms of Use' }, { to: '/refund-cancellation-policy', label: 'Refund & Cancellation' }] as const;

export function SiteFooter() {
  return <footer className="site-footer">
    <img className="footer-watermark" src={logo.url} alt="" aria-hidden="true" loading="lazy" width="1920" height="640" />
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" aria-label="Hope Human Foundation home"><img src={logo.url} alt="Hope Human Foundation" width="1920" height="640" loading="lazy" /></Link>
          <p>Connecting compassionate people with causes that matter. Together, we can bring hope to someone’s tomorrow.</p>
        </div>
        <div className="footer-values"><Heart size={19} aria-hidden="true" /><span>Made for a kinder world</span></div>
      </div>
      <nav className="footer-grid" aria-label="Footer navigation">
        <div className="footer-column"><h3>Make a difference</h3><Link to="/campaigns">Explore Campaigns</Link><Link to="/causes">Explore Causes</Link><Link to="/start-yourself">Start a Campaign</Link><Link to="/most-loved">Most Loved</Link></div>
        <div className="footer-column"><h3>Foundation</h3>{foundation.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}</div>
        <div className="footer-column"><h3>Here to help</h3><Link to="/help-center">Help Center</Link><Link to="/contact">Contact Us</Link><Link to="/guarantee">Giving with confidence</Link><a href="mailto:support@hopehumanfoundation.org">Email Support <ArrowUpRight size={13} aria-hidden="true" /></a></div>
        <div className="footer-column"><h3>Policies</h3>{policies.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}</div>
      </nav>
      <div className="footer-bottom"><span>© 2026 Hope Human Foundation. All rights reserved.</span><span className="footer-institution">Hope Human Foundation</span><div className="footer-legal">{policies.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}</div></div>
    </div>
  </footer>;
}