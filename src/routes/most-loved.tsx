import { createFileRoute } from '@tanstack/react-router';
import { MostLovedPage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/most-loved')({head:()=>pageHead('Most Loved','Discover campaigns with the highest imported historical funding totals.','/most-loved'),component:MostLovedPage});
