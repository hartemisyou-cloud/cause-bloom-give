import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDonationBar } from '@/hooks/use-donation-bar';

afterEach(()=>{cleanup();vi.unstubAllGlobals();});
describe('Floating donation visibility',()=>{
 it('shows only when every primary control is offscreen and hides when one returns',()=>{
  let notify: IntersectionObserverCallback = ()=>{};
  const disconnect=vi.fn();
  vi.stubGlobal('IntersectionObserver',class { constructor(callback: IntersectionObserverCallback){notify=callback;} observe(){} disconnect=disconnect; });
  const root=document.createElement('div');root.innerHTML='<div class="donation-actions"></div><div class="donation-actions"></div>';
  const controls=[...root.children];
  const ref={current:root};
  const hook=renderHook(()=>useDonationBar(ref,'mateo'));
  const send=(flags:boolean[])=>act(()=>notify(controls.map((target,i)=>({target,isIntersecting:flags[i]} as IntersectionObserverEntry)),{} as IntersectionObserver));
  expect(hook.result.current).toBe(false);send([true,false]);expect(hook.result.current).toBe(false);send([false,false]);expect(hook.result.current).toBe(true);send([false,true]);expect(hook.result.current).toBe(false);hook.unmount();expect(disconnect).toHaveBeenCalledOnce();
 });
});