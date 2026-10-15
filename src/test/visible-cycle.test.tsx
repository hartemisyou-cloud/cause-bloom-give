import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useVisibleCycle } from '@/hooks/use-visible-cycle';

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it('cycles only while visible and stops on cleanup', () => {
  vi.useFakeTimers();
  let update: IntersectionObserverCallback | undefined;
  const disconnect = vi.fn();
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { update = callback; }
    observe() {}
    disconnect = disconnect;
  });
  function Demo() { const { ref, step } = useVisibleCycle(3); return <section ref={ref}>{step}</section>; }
  const result = render(<Demo/>);
  act(() => vi.advanceTimersByTime(9000));
  expect(screen.getByText('0')).toBeInTheDocument();
  act(() => update?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
  act(() => vi.advanceTimersByTime(4500));
  expect(screen.getByText('1')).toBeInTheDocument();
  act(() => update?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
  act(() => vi.advanceTimersByTime(9000));
  expect(screen.getByText('1')).toBeInTheDocument();
  result.unmount();
  expect(disconnect).toHaveBeenCalled();
  expect(vi.getTimerCount()).toBe(0);
});