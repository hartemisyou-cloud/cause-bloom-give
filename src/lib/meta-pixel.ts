/**
 * Meta Pixel (browser). Loads only when VITE_META_PIXEL_ID is set AND the visitor
 * allowed optional analytics/advertising measurement. Purchase is never sent from
 * the browser — it is reported exclusively by the Conversions API on the store side.
 */
type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[]; push: Fbq; loaded: boolean; version: string };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

export const metaPixelId = ((import.meta.env['VITE_META_PIXEL_ID'] as string | undefined)?.trim()) || '1456212949742348';
let initialized = false;
/** Regions where advertising measurement needs prior opt-in (EEA, UK, Switzerland). */
const consentRegions = new Set('AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH'.split(' '));
let regionNeedsConsent: boolean | null = null;
function timezoneNeedsConsent(): boolean {
  try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; return tz.startsWith('Europe/') || tz === 'Atlantic/Reykjavik' || tz === 'Atlantic/Canary' || tz === 'Atlantic/Madeira' || tz === 'Atlantic/Azores'; } catch { return true; }
}
async function resolveRegion(): Promise<boolean> {
  if (regionNeedsConsent !== null) return regionNeedsConsent;
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 2000);
    const r = await fetch('/cdn-cgi/trace', { signal: ctrl.signal }); clearTimeout(t);
    const loc = r.ok ? /loc=([A-Z0-9]{2})/.exec(await r.text())?.[1] : undefined;
    regionNeedsConsent = !loc || loc === 'XX' || loc === 'T1' ? timezoneNeedsConsent() : consentRegions.has(loc);
  } catch { regionNeedsConsent = timezoneNeedsConsent(); }
  return regionNeedsConsent;
}
/** Explicit refusal always blocks; opt-in is required only in consent regions. */
function consented(): boolean {
  let choice: string | null = null;
  try { choice = localStorage.getItem('hope-analytics-consent'); } catch { /* storage blocked */ }
  if (choice === 'no') return false;
  if (choice === 'yes') return true;
  return regionNeedsConsent === false;
}

function ensurePixel(): Fbq | null {
  if (typeof window === 'undefined' || !metaPixelId || !consented()) return null;
  if (!window.fbq) {
    const n = function (...args: unknown[]) { if (n.callMethod) n.callMethod.apply(n, args); else n.queue.push(args); } as Fbq;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    window.fbq = n; if (!window._fbq) window._fbq = n;
    const s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
  }
  if (!initialized) { window.fbq('init', metaPixelId); initialized = true; }
  return window.fbq;
}

export function pixelPageView() { if (typeof window === 'undefined') return; void resolveRegion().then(() => ensurePixel()?.('track', 'PageView')); }

export function pixelTrack(event: 'ViewContent' | 'InitiateCheckout', params: { value: number; currency: 'USD'; content_ids: string[] }) {
  try { ensurePixel()?.('track', event, { ...params, content_type: 'product' }); } catch { /* never block giving */ }
}

/** Called when the visitor changes their preference on the privacy page. */
export function pixelConsentChanged(accepted: boolean) {
  if (accepted) { const f = ensurePixel(); if (f) { f('consent', 'grant'); f('track', 'PageView'); } }
  else window.fbq?.('consent', 'revoke');
}
