import { createFileRoute } from '@tanstack/react-router';
import { CommunityEventsPage } from '@/components/events-page';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/events')({head:()=>pageHead('Events','Community events and gathering proposals for Hope Human Foundation.','/events'),component:CommunityEventsPage});
