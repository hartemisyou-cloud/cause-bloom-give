export const siteName='Hope Human Foundation';
export function pageHead(title:string,description:string,path:string) {
 const domain=import.meta.env['VITE_SITE_URL']?.replace(/\/$/,'');
 const url=domain?`${domain}${path}`:path;
 return {meta:[{title:`${title} — ${siteName}`},{name:'description',content:description},{property:'og:title',content:`${title} — ${siteName}`},{property:'og:description',content:description},{property:'og:type',content:'website'},{property:'og:url',content:url},{name:'twitter:card',content:'summary_large_image'}],links:[{rel:'canonical',href:url}]};
}
const attributionKeys=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'];
export function preserveAttribution(){
 const url=new URL(window.location.href);const saved=new URLSearchParams(sessionStorage.getItem('hope-attribution')??'');
 attributionKeys.forEach(key=>{const value=url.searchParams.get(key);if(value)saved.set(key,value);else if(saved.has(key))url.searchParams.set(key,saved.get(key)??'');});
 sessionStorage.setItem('hope-attribution',saved.toString());if(url.href!==window.location.href)window.history.replaceState(window.history.state,'',url);
}
export function analyticsConsent(accepted:boolean){localStorage.setItem('hope-analytics-consent',accepted?'yes':'no');}
export function trackEvent(name:string,detail:Record<string,string|number>={}){
 try {
  if(localStorage.getItem('hope-analytics-consent')!=='yes')return;
  window.dispatchEvent(new CustomEvent('hope:analytics',{detail:{name,...detail,attribution:sessionStorage.getItem('hope-attribution')??''}}));
 } catch { /* Optional analytics must not interrupt giving when storage is blocked. */ }
}
