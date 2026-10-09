import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/refund-cancellation-policy')({head:()=>pageHead('Refund & Cancellation Policy','Refund & Cancellation Policy for the Hope Human Foundation review website.','/refund-cancellation-policy'),component:()=> <PolicyPage kind="refund"/>});
