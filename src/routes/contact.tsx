import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/contact')({head:()=>pageHead('Contact us','Contact Hope Human Foundation at support@hopehumanfoundation.org.','/contact'),component:ContactPage});
