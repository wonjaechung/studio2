'use client';

import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Gamepad2, ShieldCheck, Trophy, History, Radio, Users, Settings, BotMessageSquare, BookUser, Languages } from 'lucide-react';
import { useState } from 'react';
import { VolatilityGauge } from './volatility-gauge';
import { Guide } from './guide';
import { LiquidationTracker } from './liquidation-tracker';
import { HyperliquidTracker } from './hyperliquid-tracker';
import { WhaleWatch } from './whale-watch';
import { AISummarizer } from './ai-summarizer';
import { DatasetTables } from './dataset-tables';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { TradingViewChart } from './trading-view-chart';

const navItems = (lang: 'en' | 'ko') => [
  { name: lang === 'ko' ? '랭크 모드' : 'Ranked Mode', icon: Trophy, view: 'ranked' },
  { name: lang === 'ko' ? '게임 방법' : 'How to Play', icon: BookUser, view: 'guide' },
  { name: lang === 'ko' ? '리더보드' : 'Leaderboard', icon: ShieldCheck, view: 'leaderboard' },
  { name: lang === 'ko' ? '청산' : 'Liquidations', icon: Radio, view: 'liquidations' },
  { name: lang === 'ko' ? '하이퍼리퀴드' : 'Hyperliquid', icon: History, view: 'hyperliquid' },
  { name: lang === 'ko' ? '고래 추적' : 'Whale Watch', icon: Users, view: 'whale' },
  { name: lang === 'ko' ? 'AI 분석' : 'AI Analysis', icon: BotMessageSquare, view: 'ai' },
  { name: lang === 'ko' ? '데이터셋' : 'Datasets', icon: Users, view: 'data' },
  { name: lang === 'ko' ? '커뮤니티' : 'Community', icon: Users, view: 'community' },
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

export function Dashboard() {
  const [activeView, setActiveView] = useState('ranked');
  const [language, setLanguage] = useState<'en' | 'ko'>('ko');
  const { toast } = useToast();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ko' : 'en');
    toast({
        title: language === 'en' ? '언어 변경' : 'Language Changed',
        description: language === 'en' ? '이제 한국어로 표시됩니다.' : 'Now displaying in English.',
    });
  }

  const renderContent = () => {
    switch (activeView) {
      case 'ranked':
        return (
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
               <TradingViewChart />
            </div>
            <div className="xl:col-span-1">
              <VolatilityGauge lang={language} />
            </div>
          </div>
        );
      case 'guide':
        return <Guide lang={language} />;
      case 'liquidations':
        return <LiquidationTracker />;
      case 'hyperliquid':
        return <HyperliquidTracker />;
      case 'whale':
        return <WhaleWatch />;
      case 'ai':
        return <AISummarizer />;
      case 'data':
        return <DatasetTables />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">{content[language].comingSoon(navItems(language).find(item => item.view === activeView)?.name || '')}</p>
          </div>
        );
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar className="hidden lg:flex flex-col">
          <SidebarHeader>
            <h2 className="text-2xl font-bold font-logo text-foreground tracking-widest">Leagues</h2>
          </SidebarHeader>
          <SidebarContent className="flex-1">
            <SidebarMenu>
              {navItems(language).map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
           <SidebarHeader>
             <SidebarMenu>
               <SidebarMenuItem>
                <SidebarMenuButton>
                    <Settings className="w-5 h-5" />
                    {content[language].settings}
                </SidebarMenuButton>
               </SidebarMenuItem>
             </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
        <SidebarInset>
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-blue-400">
                  {content[language].title}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-body">
                  {content[language].subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                    <Languages className="w-6 h-6" />
                 </Button>
                 <SidebarTrigger className="lg:hidden" />
              </div>
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
