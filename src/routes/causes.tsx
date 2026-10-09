import { createFileRoute } from '@tanstack/react-router';
import { CausesPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/causes')({head:()=>pageHead('Find your cause','Explore Hope Human causes for children and families, health, animals and disaster relief.','/causes'),component:CausesPage});
