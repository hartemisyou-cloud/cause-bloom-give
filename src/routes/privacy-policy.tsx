import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/privacy-policy')({head:()=>pageHead('Privacy Policy','Privacy information for campaign stories, proposals and donation checkout.','/privacy-policy'),component:()=> <PolicyPage kind="privacy"/>});
