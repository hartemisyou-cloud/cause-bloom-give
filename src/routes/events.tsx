import { createFileRoute } from '@tanstack/react-router';
import { EventsPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/events')({head:()=>pageHead('Events','Community events and gathering proposals for Hope Human Foundation.','/events'),component:EventsPage});
