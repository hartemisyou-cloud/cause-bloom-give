import { createFileRoute } from '@tanstack/react-router';
import { StartPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/start-business')({head:()=>pageHead('Campaign proposal for business','Prepare a business campaign proposal for Hope Human. Email submission only; no automatic publication.','/start-business'),component:()=> <StartPage kind="business"/>});
