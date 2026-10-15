import { createFileRoute } from '@tanstack/react-router';
import { MostLovedPage } from '@/components/most-loved-page';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/most-loved')({head:()=>pageHead('Most Loved','Discover campaigns with the highest previous fundraising totals.','/most-loved'),component:MostLovedPage});
