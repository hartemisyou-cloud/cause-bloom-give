import records from '@/data/campaigns.json';
export type Campaign = (typeof records)[number];
export const campaigns = records;
export const categories = [{id:'all',name:'All campaigns',count:54},{id:'children',name:'Children & Family',count:11},{id:'animals',name:'Animals & Pets',count:1},{id:'disaster',name:'Disaster Relief',count:0},{id:'health',name:'Health',count:42}];
export const categoryName = (id:string) => categories.find(c=>c.id===id)?.name ?? 'Health';
export const money = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
export const shortMoney = (value:number) => value >= 1000000 ? `$${(value/1000000).toFixed(1)}m` : value >= 1000 ? `$${Math.round(value/1000)}k` : money(value);
export const percentage = (c:Campaign) => Math.round(c.raised/c.goal*100);
export function filterCampaigns({query='',category='all',statuses=[] as string[],sort='funded'}={}) {
 const list=campaigns.filter(c=>(category==='all'||c.category===category)&&(!query||`${c.title} ${c.organizer} ${c.beneficiary} ${c.story}`.toLowerCase().includes(query.toLowerCase()))&&(!statuses.length||statuses.some(s=>s==='urgent'?c.urgent:s==='funded'?c.raised>=c.goal:c.active&&c.raised<c.goal)));
 return list.sort((a,b)=>sort==='least'?a.raised-b.raised:sort==='newest'?b.createdAt.localeCompare(a.createdAt):sort==='goal'?a.goal-b.goal:b.raised-a.raised);
}
export const getCampaign = (slug:string) => campaigns.find(c=>c.slug===slug);
