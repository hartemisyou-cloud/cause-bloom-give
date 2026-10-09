import { createFileRoute } from '@tanstack/react-router';
import { HelpPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/help-center')({head:()=>pageHead('Help Center','Answers about Hope Human campaigns, proposals, historical funding and payment availability.','/help-center'),component:HelpPage});
