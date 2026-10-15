import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/refund-cancellation-policy')({head:()=>pageHead('Refund & Cancellation Policy','How to request review of a confirmed donation, cancellation or refund.','/refund-cancellation-policy'),component:()=> <PolicyPage kind="refund"/>});
