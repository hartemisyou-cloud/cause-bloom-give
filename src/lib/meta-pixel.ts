/**
 * Meta Pixel (browser). Loads only when VITE_META_PIXEL_ID is set AND the visitor
 * allowed optional analytics/advertising measurement. Purchase is never sent from
 * the browser — it is reported exclusively by the Conversions API on the store side.
 */
type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[]; push: Fbq; loaded: boolean; version: string };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

export const metaPixelId = ((import.meta.env['VITE_META_PIXEL_ID'] as string | undefined)?.trim()) || '1456212949742348';
let initialized = false;
/** Visitors whose browser time zone is in Europe (EEA/UK/CH) are not measured: those regions require prior opt-in and the site shows no consent prompt. */
function consentRegion(): boolean {
  try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; return tz.startsWith('Europe/') || ['Atlantic/Reykjavik','Atlantic/Canary','Atlantic/Madeira','Atlantic/Azores'].includes(tz); } catch { return false; }
}
/** No consent prompt: measurement is on by default; an explicit Decline on the privacy page is still honored. */
function consented(): boolean {
  let choice: string | null = null;
  try { choice = localStorage.getItem('hope-analytics-consent'); } catch { /* storage blocked */ }
  if (choice === 'no') return false;
  return !consentRegion();
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

export function pixelPageView() { ensurePixel()?.('track', 'PageView'); }

/** Donation funnel event; contents id is donation-<USD>. Sent only when consent allows the Pixel. */
export function pixelDonationEvent(event: 'AddToCart' | 'InitiateCheckout', amount: number) {
  try { ensurePixel()?.('track', event, { contents: [{ id: `donation-${amount}`, quantity: 1 }], value: amount, currency: 'USD', num_items: 1 }); } catch { /* never block giving */ }
}

/** Called when the visitor changes their preference on the privacy page. */
export function pixelConsentChanged(accepted: boolean) {
  if (accepted) { const f = ensurePixel(); if (f) { f('consent', 'grant'); f('track', 'PageView'); } }
  else window.fbq?.('consent', 'revoke');
}
