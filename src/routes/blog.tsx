import { createFileRoute } from '@tanstack/react-router';
import { JournalPage } from '@/components/journal-page';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/blog')({head:()=>pageHead('Journal','Thoughtful guidance for choosing, sharing and supporting fundraising campaigns.','/blog'),component:JournalPage});
