import { useEffect, useState } from 'react';
const KEY = 'hh-favorites';
const EVT = 'hh-favorites-change';
let fallback: string[] = [];
export function normalizeFavorites(value: unknown): string[] { return Array.isArray(value) ? [...new Set(value.filter((x): x is string => typeof x === 'string' && x.length > 0))] : []; }
function read(): string[] { try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); fallback = normalizeFavorites(v); return fallback; } catch { return fallback; } }
export function toggleFavorite(list: string[], slug: string): string[] { const current = normalizeFavorites(list); return current.includes(slug) ? current.filter(s => s !== slug) : [...current, slug]; }
/** Favorites stay in this browser only; nothing is sent anywhere or counted publicly. */
export function useFavorites() {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => { const sync = () => setList(read()); sync(); window.addEventListener(EVT, sync); window.addEventListener('storage', sync); return () => { window.removeEventListener(EVT, sync); window.removeEventListener('storage', sync); }; }, []);
  function toggle(slug: string) { const next = toggleFavorite(read(), slug); fallback = next; try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* memory fallback when storage is unavailable */ } setList(next); window.dispatchEvent(new Event(EVT)); }
  return { favorites: list, toggle };
}
