import { act, renderHook, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { normalizeFavorites, toggleFavorite, useFavorites } from '@/hooks/use-favorites';

afterEach(()=>{cleanup();vi.restoreAllMocks();localStorage.clear();});
describe('Device-local favorites',()=>{
 it('adds exactly one favorite and removes exactly one without duplicates',()=>{expect(toggleFavorite([], 'mateo')).toEqual(['mateo']);expect(toggleFavorite(['mateo','mateo'],'mateo')).toEqual([]);expect(toggleFavorite(['graceline'],'mateo')).toEqual(['graceline','mateo']);});
 it('rejects invalid stored values and duplicate entries',()=>{expect(normalizeFavorites(['mateo','mateo',3,null,''])).toEqual(['mateo']);expect(normalizeFavorites({mateo:true})).toEqual([]);});
 it('persists selection in this browser and synchronizes separate controls',()=>{localStorage.clear();const a=renderHook(useFavorites);const b=renderHook(useFavorites);act(()=>a.result.current.toggle('mateo'));expect(b.result.current.favorites).toEqual(['mateo']);expect(JSON.parse(localStorage.getItem('hh-favorites')??'[]')).toEqual(['mateo']);act(()=>b.result.current.toggle('mateo'));expect(a.result.current.favorites).toEqual([]);});
 it('still toggles with browser storage blocked',()=>{localStorage.clear();const hook=renderHook(useFavorites);vi.spyOn(Storage.prototype,'getItem').mockImplementation(()=>{throw new Error('blocked');});vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('blocked');});act(()=>hook.result.current.toggle('mateo'));expect(hook.result.current.favorites).toEqual(['mateo']);act(()=>hook.result.current.toggle('mateo'));expect(hook.result.current.favorites).toEqual([]);});
});