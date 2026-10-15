import { createFileRoute } from '@tanstack/react-router';
import { CategoryCausesPage } from '@/components/causes-page';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/causes')({head:()=>pageHead('Find your cause','Explore Hope Human causes for children and families, health, animals and disaster relief.','/causes'),component:CategoryCausesPage});
