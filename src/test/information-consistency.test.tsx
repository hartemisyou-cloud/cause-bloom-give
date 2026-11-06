import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { campaigns, categories, distinctCampaigns, historicalCampaignSummary } from '@/lib/campaigns';
import { normalizedActivity, type PublicDonation } from '@/lib/campaign-social-proof';
import { CampaignSupport } from '@/components/campaign-support';
import { CampaignSocialProof, DonationEntry } from '@/components/campaign-social-proof';

afterEach(cleanup);
const donor: PublicDonation = {id:'valid',campaignSlug:'test',status:'confirmed',eligible:true,public:true,name:'Test donor',anonymous:false,amountVisible:true,amountCents:50000,confirmedAt:'2026-11-03'};
describe('Information consistency', () => {
 it('does not invent support when no messages are supplied', () => {
  render(<CampaignSupport campaign={{slug:'no-owner-list-test',support:[]}} />);
  expect(screen.queryByLabelText('0 submitted support messages')).toBeNull();
  expect(screen.queryAllByRole('article')).toHaveLength(0);
 });
 it.each([3,8])('counts only the %i supplied messages', count => {
  render(<CampaignSupport campaign={{slug:'test',support:Array.from({length:count},(_,i)=>({name:`Author ${i}`,message:`Support ${i}`}))}} />);
  expect(screen.getByLabelText(`${count} submitted support messages`)).toHaveTextContent(String(count));
  expect(screen.queryAllByRole('article')).toHaveLength(Math.min(count, 6));
 });
 it('removes the exact $48,750 duplicate snapshot from aggregates while preserving 151 URLs', () => {
  expect(campaigns).toHaveLength(151);
  expect(distinctCampaigns()).toHaveLength(150);
  expect(campaigns.reduce((sum,c)=>sum+Math.round(c.raised*100),0)-historicalCampaignSummary().raisedCents).toBe(4875000);
  expect(historicalCampaignSummary().count).toBe(149);
 });
 it('derives the nine categories including three disaster and twelve previously hidden records', () => {
  expect(categories.filter(c=>c.id!=='all')).toHaveLength(9);
  expect(categories.find(c=>c.id==='disaster')?.count).toBe(3);
  expect(categories.filter(c=>['education','community','environment','emergency','housing'].includes(c.id)).reduce((sum,c)=>sum+c.count,0)).toBe(12);
 });
 it('uses only two eligible sorted donations for highlights, counts and history', () => {
  const recent={...donor,id:'recent',name:'Newest donor',amountCents:2000,confirmedAt:'2026-11-04'};
  const activity={campaignSlug:'test',status:'ready' as const,messages:[],donations:[donor,{...donor,id:'pending',status:'pending' as const},{...donor,id:'private',public:false},{...donor,id:'other',campaignSlug:'other'},donor,recent]};
  expect(normalizedActivity(activity).donations.map(d=>d.id)).toEqual(['recent','valid']);
  render(<CampaignSocialProof activity={activity} />);
  expect(screen.getByLabelText('2 public contributions')).toHaveTextContent('2');
  expect(screen.getAllByText('Newest donor')).toHaveLength(2);
 });
 it('preserves the November 3 calendar date on the $500 top donation row', () => {
  render(<DonationEntry donation={donor} top />);
  expect(document.querySelector('time')?.getAttribute('datetime')).toBe('2026-11-03');
  expect(screen.getByText('$500')).toBeVisible();
 });
 it.each(['loading','error'] as const)('does not show stale highlights during %s', status => {
  expect(normalizedActivity({campaignSlug:'test',status,messages:[],donations:[donor]}).donations).toEqual([]);
 });
});