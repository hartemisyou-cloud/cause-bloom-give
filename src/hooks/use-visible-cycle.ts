import { useEffect, useRef, useState } from 'react';

/** Illustrative cycling stops outside the viewport and for reduced motion. */
export function useVisibleCycle(count: number, delay = 4500) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    function sync() {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
      if (visible && !motion.matches && !document.hidden) {
        timer = setInterval(() => setStep(value => (value + 1) % count), delay);
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    }, { threshold: 0.15 });
    observer.observe(element);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      if (timer !== undefined) clearInterval(timer);
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [count, delay]);
  return { ref, step, setStep };
}