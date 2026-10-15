import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/about')({head:()=>pageHead('About Hope Human','Learn about Hope Human Foundation’s purpose and campaign stories and transparent giving information.','/about'),component:AboutPage});
