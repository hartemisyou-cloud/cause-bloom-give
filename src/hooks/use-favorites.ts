import { useEffect, useState } from 'react';
const KEY = 'hh-favorites';
const EVT = 'hh-favorites-change';
function read(): string[] { try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; } }
/** Favorites stay in this browser only; nothing is sent anywhere or counted publicly. */
export function useFavorites() {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => { const sync = () => setList(read()); sync(); window.addEventListener(EVT, sync); window.addEventListener('storage', sync); return () => { window.removeEventListener(EVT, sync); window.removeEventListener('storage', sync); }; }, []);
  function toggle(slug: string) { const cur = read(); const next = cur.includes(slug) ? cur.filter(s => s !== slug) : [...cur, slug]; try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ } setList(next); window.dispatchEvent(new Event(EVT)); }
  return { favorites: list, toggle };
}
