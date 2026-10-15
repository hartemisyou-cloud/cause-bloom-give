import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/terms-of-use')({head:()=>pageHead('Terms of Use','Donation terms covering campaign approval, creator allocation and held-fund release.','/terms-of-use'),component:()=> <PolicyPage kind="terms"/>});
