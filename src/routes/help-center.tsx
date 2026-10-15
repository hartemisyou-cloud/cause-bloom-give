import { createFileRoute } from '@tanstack/react-router';
import { HelpPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/help-center')({head:()=>pageHead('Help Center','Answers about donation approval, fees, creator allocation, receipts and refund requests.','/help-center'),component:HelpPage});
