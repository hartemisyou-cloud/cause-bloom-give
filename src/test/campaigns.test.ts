import {describe,it,expect} from 'vitest';
import {campaigns,filterCampaigns,categories,getCampaign,percentage,progressValue,campaignStatus} from '@/lib/campaigns';
import audit from '@/data/surname-audit.json';
describe('Campaign import',()=>{
 it('contains exactly 55 unique source slugs and all category counts',()=>{expect(campaigns).toHaveLength(55);expect(new Set(campaigns.map(c=>c.slug)).size).toBe(55);for(const cat of categories.slice(1))expect(campaigns.filter(c=>c.category===cat.id)).toHaveLength(cat.count);});
 it('retains full stories, galleries and snapshot disclosure data',()=>{for(const c of campaigns){expect(c.story.length).toBeGreaterThan(400);expect(c.gallery.length).toBeGreaterThan(0);expect(c.snapshotDate).toBe('2026-10-05');expect(c.image.url).toMatch(/^\/__l5e\/assets-v1\//);expect(c.goal).toBeGreaterThan(0);expect(getCampaign(c.slug)?.title).toBe(c.title);}});
 it('searches, filters and sorts without mutating source order',()=>{expect(filterCampaigns({query:'Teddy'}).some(c=>c.slug==='help-teddy')).toBe(true);expect(filterCampaigns({category:'health'})).toHaveLength(42);expect(filterCampaigns({category:'disaster'})).toHaveLength(0);expect(filterCampaigns({query:'zzzz-no-match'})).toHaveLength(0);for(const sort of ['funded','least','goal','newest']){const list=filterCampaigns({sort});expect(list).toHaveLength(55);if(sort==='funded')expect(list.every((c,i)=>!i||c.raised<=(list[i-1]?.raised??Infinity))).toBe(true);if(sort==='least')expect(list.every((c,i)=>!i||c.raised>=(list[i-1]?.raised??0))).toBe(true);if(sort==='goal')expect(list.every((c,i)=>!i||c.goal>=(list[i-1]?.goal??0))).toBe(true);}expect(campaigns[0]?.slug).toBe('mateo');});
 it('does not retain replaced beneficiary full names in display fields',()=>{for(const a of audit){const c=getCampaign(a.slug);expect(c).toBeDefined();if(!c)continue;const display=[c.title,c.story,c.organizer,c.beneficiary].join(' ');expect(display).not.toContain(a.originalFullName);expect(a.displayFullName.split(' ')[0]).toBe(a.originalFullName.split(' ')[0]);}});
 it('has no provider credentials, operational endpoints or untranslated story boilerplate',()=>{for(const c of campaigns){expect(JSON.stringify(c)).not.toMatch(/(?:s)tripe_account_id|https?:\/\/|Mi nombre es|Que Dios|Soy Lucía|Ayuda a /);}});
});

describe('Crowdfunding progress and status',()=>{
 it('rounds raised/goal percentage',()=>{expect(percentage({raised:6655,goal:10000})).toBe(67);});
 it('caps only visual progress at 100 while preserving overfunding',()=>{const c={raised:125000,goal:100000};expect(percentage(c)).toBe(125);expect(progressValue(c)).toBe(100);expect(c.raised).toBe(125000);});
 it.each([0,-1,NaN,Infinity])('handles invalid goal %s without division errors',goal=>{expect(percentage({raised:20,goal})).toBe(0);});
 it.each([-1,NaN,Infinity])('handles invalid raised %s without negative progress',raised=>{expect(progressValue({raised,goal:100})).toBe(0);});
 it('classifies a goal-reaching campaign as funded even when urgent',()=>{expect(campaignStatus({raised:100,goal:100,urgent:true})).toBe('funded');expect(campaignStatus({raised:101,goal:100,urgent:false})).toBe('funded');});
 it('does not mark zero goals as funded',()=>{expect(campaignStatus({raised:0,goal:0,urgent:false})).toBe('active');});
 it('uses the explicit urgency flag only below a valid goal',()=>{expect(campaignStatus({raised:99,goal:100,urgent:true})).toBe('urgent');expect(campaignStatus({raised:99,goal:100,urgent:false})).toBe('active');});
 it('registers all nine categories without inventing campaign records',()=>{expect(categories.slice(1).map(c=>c.name)).toEqual(['Children & Family','Animals & Pets','Disaster Relief','Health','Education','Community','Environment','Emergency','Housing']);expect(categories.reduce((sum,c)=>sum+(c.id==='all'?0:c.count),0)).toBe(55);});
});
