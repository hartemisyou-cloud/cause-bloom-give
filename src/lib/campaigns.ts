import records from '@/data/campaigns.json';
export type Campaign = (typeof records)[number];
export const campaigns = records;
const categoryDefinitions = [{id:'children',name:'Children & Family'},{id:'animals',name:'Animals & Pets'},{id:'disaster',name:'Disaster Relief'},{id:'health',name:'Health'},{id:'education',name:'Education'},{id:'community',name:'Community'},{id:'environment',name:'Environment'},{id:'emergency',name:'Emergency'},{id:'housing',name:'Housing'}];
export const categories = [{id:'all',name:'All campaigns',count:campaigns.length}, ...categoryDefinitions.map(c => ({...c,count:campaigns.filter(record => record.category === c.id).length}))];
export const categoryName = (id:string) => categories.find(c=>c.id===id)?.name ?? 'Health';
export const money = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
export const shortMoney = (value:number) => value >= 1000000 ? `$${(value/1000000).toFixed(1)}m` : value >= 1000 ? `$${(value/1000).toFixed(1).replace(/\.0$/, '')}k` : money(value);
export function percentage(c: { raised: number; goal: number }) {
 if (!Number.isFinite(c.raised) || !Number.isFinite(c.goal) || c.goal <= 0 || c.raised < 0) return 0;
 const result = Math.round(c.raised / c.goal * 100);
 return Number.isFinite(result) ? result : 0;
}
export const progressValue = (c: { raised: number; goal: number }) => Math.max(0, Math.min(100, percentage(c)));
export function campaignStatus(c: { raised: number; goal: number; urgent: boolean }) {
 if (Number.isFinite(c.goal) && c.goal > 0 && Number.isFinite(c.raised) && c.raised >= c.goal) return 'funded';
 return c.urgent ? 'urgent' : 'active';
}
export function filterCampaigns({query='',category='all',statuses=[] as string[],sort='funded'}={}) {
  const list=campaigns.filter(c=>(category==='all'||c.category===category)&&(!query||`${c.title} ${c.organizer} ${c.beneficiary} ${c.story}`.toLowerCase().includes(query.toLowerCase()))&&(!statuses.length||statuses.some(s=>s===campaignStatus(c)&&(s!=='active'||c.active))));
 return list.sort((a,b)=>sort==='least'?a.raised-b.raised:sort==='newest'?(b.createdAt??'').localeCompare(a.createdAt??''):sort==='goal'?a.goal-b.goal:b.raised-a.raised);
}
export const getCampaign = (slug:string) => campaigns.find(c=>c.slug===slug);
