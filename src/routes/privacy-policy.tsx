import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/privacy-policy')({head:()=>pageHead('Privacy Policy','Privacy Policy for the Hope Human Foundation review website.','/privacy-policy'),component:()=> <PolicyPage kind="privacy"/>});
