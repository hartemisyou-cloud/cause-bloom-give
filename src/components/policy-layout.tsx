import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { List, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PolicyLayout({ children, kind }: { children: ReactNode; kind: string }) {
  const content = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  useEffect(() => {
    const headings = Array.from(content.current?.querySelectorAll('h2') ?? []);
    setSections(headings.map((heading, index) => {
      const id = `policy-${kind}-${index + 1}`;
      heading.id = id;
      return { id, title: heading.textContent ?? '' };
    }));
  }, [kind]);
  return <div className="policy-reference-layout"><aside className="policy-contents"><details open><summary><List size={18} aria-hidden="true"/>Contents</summary><nav aria-label="Policy contents">{sections.map((section, index) => <a key={section.id} href={`#${section.id}`}>{index + 1}. {section.title}</a>)}</nav></details><div className="policy-crosslinks"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-of-use">Terms of Use</Link><Link to="/refund-cancellation-policy">Refund &amp; Cancellation</Link></div></aside><div className="container content-page policy-content" ref={content}>{children}<Button variant="outline" size="icon" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp size={18}/></Button></div></div>;
}