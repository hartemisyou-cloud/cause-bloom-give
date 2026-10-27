import { useEffect, useState, type RefObject } from 'react';

/** Only show the floating action when every primary donation control is offscreen. */
export function useDonationBar(ref: RefObject<HTMLElement | null>, campaignSlug: string, hideNearSelector?: string) {
 const [show, setShow] = useState(false);
 useEffect(() => {
  setShow(false);
  const controls = ref.current?.querySelectorAll<HTMLElement>('.donation-actions');
  if (!controls?.length || typeof IntersectionObserver === 'undefined') return;
  const hideNear = hideNearSelector ? [...(ref.current?.querySelectorAll<HTMLElement>(hideNearSelector) ?? [])] : [];
  const visible = new Map<Element, boolean>();
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) visible.set(entry.target, entry.isIntersecting);
   setShow([...controls].every(control => visible.get(control) === false) && !hideNear.some(section => visible.get(section) === true));
  });
  controls.forEach(control => observer.observe(control));
  hideNear.forEach(section => observer.observe(section));
  return () => observer.disconnect();
 }, [ref, campaignSlug, hideNearSelector]);
 return show;
}