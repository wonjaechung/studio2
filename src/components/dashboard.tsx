

'use client';

import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Gamepad2, ShieldCheck, Trophy, History, Radio, BotMessageSquare, BookUser, Languages, Database, Users, Waves, Newspaper, Home } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { UserNav } from './user-nav';
import { VolatilityGauge } from './volatility-gauge';
import { Guide } from './guide';
import { LiquidationTracker } from './liquidation-tracker';
import { HyperliquidTracker } from './hyperliquid-tracker';
import { AISummarizer } from './ai-summarizer';
import { DatasetTables } from './dataset-tables';
import { TradingViewChart } from './trading-view-chart';
import { CommunityChat } from './community-chat';
import { NormalModeBoard } from './normal-mode-board';
import { RankedModeBoard } from './ranked-mode-board';
import { Leaderboard } from './leaderboard';
import { AuthModal } from './auth-modal';
import { HomePage } from './home-page';


const navItems = (lang: 'en' | 'ko') => [
  { name: lang === 'ko' ? '홈' : 'Home', icon: Home, view: 'home' },
  { name: lang === 'ko' ? '랭크 모드' : 'Ranked Mode', icon: Trophy, view: 'ranked' },
  { name: lang === 'ko' ? '일반 모드' : 'Normal Mode', icon: Gamepad2, view: 'normal' },
  { name: lang === 'ko' ? '게임 방법' : 'How to Play', icon: BookUser, view: 'guide' },
  { name: lang === 'ko' ? '리더보드' : 'Leaderboard', icon: ShieldCheck, view: 'leaderboard' },
  { name: lang === 'ko' ? '청산' : 'Liquidations', icon: Radio, view: 'liquidations' },
  { name: lang === 'ko' ? '고래 분석' : 'Whale Analysis', icon: Waves, view: 'hyperliquid' },
  { name: lang === 'ko' ? 'AI 분석' : 'AI Analysis', icon: BotMessageSquare, view: 'ai' },
  { name: lang === 'ko' ? '데이터셋' : 'Datasets', icon: Database, view: 'data' },
];

const content = {
  en: {
    title: 'The e-Sports League for Traders',
    subtitle: 'Where volatility is the start of the game.',
    settings: 'Settings',
    comingSoon: (view: string) => `${view} view coming soon.`
  },
  ko: {
    title: '트레이더를 위한 E-스포츠 리그',
    subtitle: '변동성이 게임의 시작이 되는 곳.',
    settings: '설정',
    comingSoon: (view: string) => `${view} 화면은 준비 중입니다.`
  }
}

export function Dashboard({ lang }: { lang: 'en' | 'ko' }) {
  const [activeView, setActiveView] = useState('home');
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'ko';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ko' : 'en';
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('lang', newLang);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
    
    toast({
        title: newLang === 'ko' ? '언어 변경' : 'Language Changed',
        description: newLang === 'ko' ? '이제 한국어로 표시됩니다.' : 'Now displaying in English.',
    });
  }


  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <HomePage lang={lang} />;
      case 'ranked':
        return <RankedModeBoard lang={lang} />;
      case 'normal':
        return <NormalModeBoard lang={lang} />;
      case 'guide':
        return <Guide lang={lang} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'liquidations':
        return <LiquidationTracker />;
      case 'hyperliquid':
        return <HyperliquidTracker />;
      case 'ai':
        return <AISummarizer />;
      case 'data':
        return <DatasetTables />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">{content[lang].comingSoon(navItems(lang).find(item => item.view === activeView)?.name || '')}</p>
          </div>
        );
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar className="hidden lg:flex flex-col">
          <SidebarHeader>
             <a href="#" className="flex items-center space-x-2">
                <svg width="40" height="40" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
                  <circle cx="23" cy="23" r="23" fill="hsl(228 12% 10%)"/>
                  <path d="M23 10C17.4772 10 13 14.4772 13 20C13 27.5 23 36 23 36C23 36 33 27.5 33 20C33 14.4772 28.5228 10 23 10ZM23 24C20.7909 24 19 22.2091 19 20C19 17.7909 20.7909 16 23 16C25.2091 16 27 17.7909 27 20C27 22.2091 25.2091 24 23 24Z" fill="#00A8C6"/>
                  <circle cx="23" cy="20" r="4" fill="hsl(228 12% 10%)"/>
                </svg>
                <span className="font-bold font-logo text-3xl tracking-wider">Coinmap</span>
            </a>
          </SidebarHeader>
          <SidebarContent className="flex-1">
            <SidebarMenu>
              {navItems(lang).map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                    size="lg"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-base">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter>
             <div className="flex items-center justify-center gap-2 p-2">
                <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                    <Languages className="w-6 h-6" />
                </Button>
                <UserNav />
             </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className={activeView === 'home' ? 'relative' : 'relative p-4 sm:p-6 lg:p-8'}>
             <div className={activeView === 'home' ? 'absolute top-4 right-4 z-50' : 'flex items-center justify-end mb-8'}>
                <SidebarTrigger className="lg:hidden" />
            </div>

            {activeView === 'home' ? (
              renderContent()
            ) : (
              <div className="space-y-12">
                {renderContent()}
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
