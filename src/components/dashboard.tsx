
'use client';

import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter } from '@/components/ui/sidebar';
import { Gamepad2, ShieldCheck, Trophy, History, Radio, BotMessageSquare, BookUser, Languages, Database, GanttChartSquare, Users, Waves } from 'lucide-react';
import { useState } from 'react';
import { Guide } from './guide';
import { LiquidationTracker } from './liquidation-tracker';
import { HyperliquidTracker } from './hyperliquid-tracker';
import { AISummarizer } from './ai-summarizer';
import { DatasetTables } from './dataset-tables';
import { TradingViewChart } from './trading-view-chart';
import { CommunityChat } from './community-chat';
import { NormalModeBoard } from './normal-mode-board';
import { Leaderboard } from './leaderboard';
import { AuthModal } from './auth-modal';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { UserNav } from './user-nav';
import { VolatilityGauge } from './volatility-gauge';

const navItems = (lang: 'en' | 'ko') => [
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
  const [activeView, setActiveView] = useState('ranked');
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
      case 'ranked':
        return (
           <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3 space-y-6">
               <TradingViewChart />
            </div>
            <div className="xl:col-span-2 space-y-6">
              <VolatilityGauge lang={lang} />
              <CommunityChat />
            </div>
          </div>
        );
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
                <GanttChartSquare className="h-8 w-8 text-accent" />
                <span className="font-bold font-logo text-2xl tracking-wider">TradeOS</span>
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
                    {item.name}
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
          <main className="p-4 sm:p-6 lg:p-8">
             <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-blue-400">
                  {content[lang].title}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-body">
                  {content[lang].subtitle}
                </p>
              </div>
                <SidebarTrigger className="lg:hidden" />
            </div>

            <div className="space-y-12">
               {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
