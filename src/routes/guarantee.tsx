import { createFileRoute } from '@tanstack/react-router';
import { GuaranteePage } from '@/components/content-pages';
import { pageHead } from '@/lib/site';
export const Route=createFileRoute('/guarantee')({head:()=>pageHead('Giving with confidence','Understand what Hope Human does and does not claim about campaign information and donations.','/guarantee'),component:GuaranteePage});
