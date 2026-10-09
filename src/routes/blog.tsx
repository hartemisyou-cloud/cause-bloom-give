import { createFileRoute } from '@tanstack/react-router';
import { BlogPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/blog')({head:()=>pageHead('Journal','Thoughtful guidance for choosing, sharing and supporting fundraising campaigns.','/blog'),component:BlogPage});
