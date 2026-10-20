import { useEffect, useState, type RefObject } from 'react';

/** Only show the floating action when every primary donation control is offscreen. */
export function useDonationBar(ref: RefObject<HTMLElement | null>, campaignSlug: string) {
 const [show, setShow] = useState(false);
 useEffect(() => {
  setShow(false);
  const controls = ref.current?.querySelectorAll<HTMLElement>('.donation-actions');
  if (!controls?.length || typeof IntersectionObserver === 'undefined') return;
  const visible = new Map<Element, boolean>();
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) visible.set(entry.target, entry.isIntersecting);
   setShow([...controls].every(control => visible.get(control) === false));
  });
  controls.forEach(control => observer.observe(control));
  return () => observer.disconnect();
 }, [ref, campaignSlug]);
 return show;
}