'use client';
import { Dashboard } from '@/components/dashboard';
import { SiteHeader } from '@/components/layout/site-header';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'ko';
  return (
    <>
      <SiteHeader />
      <Dashboard lang={lang} />
    </>
  );
}
