import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/terms-of-use')({head:()=>pageHead('Terms of Use','Terms of Use for the Hope Human Foundation review website.','/terms-of-use'),component:()=> <PolicyPage kind="terms"/>});
