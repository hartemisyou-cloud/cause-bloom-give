import { createFileRoute } from '@tanstack/react-router';
import { StartPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/start-family')({head:()=>pageHead('Campaign proposal for family','Prepare a family campaign proposal for Hope Human. Email submission only; no automatic publication.','/start-family'),component:()=> <StartPage kind="family"/>});
