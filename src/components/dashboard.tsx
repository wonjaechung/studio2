'use client';

import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Gamepad2, ShieldCheck, Trophy, History, Radio, Users, Settings, BotMessageSquare, BookUser } from 'lucide-react';
import { useState } from 'react';
import { VolatilityGauge } from './volatility-gauge';
import { Guide } from './guide';
import { LiquidationTracker } from './liquidation-tracker';
import { HyperliquidTracker } from './hyperliquid-tracker';

const navItems = [
  { name: 'Ranked Mode', icon: Trophy, view: 'ranked' },
  { name: '게임 방법', icon: BookUser, view: 'guide' },
  { name: 'Leaderboard', icon: ShieldCheck, view: 'leaderboard' },
  { name: 'Liquidations', icon: Radio, view: 'liquidations' },
  { name: 'Hyperliquid', icon: History, view: 'hyperliquid' },
  { name: 'AI Analysis', icon: BotMessageSquare, view: 'ai' },
  { name: 'Community', icon: Users, view: 'community' },
];

export function Dashboard() {
  const [activeView, setActiveView] = useState('ranked');

  const renderContent = () => {
    switch (activeView) {
      case 'ranked':
        return (
          <section id="volatility-gauge">
            <VolatilityGauge />
          </section>
        );
      case 'guide':
        return <Guide />;
      case 'liquidations':
        return <LiquidationTracker />;
      case 'hyperliquid':
        return <HyperliquidTracker />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">{navItems.find(item => item.view === activeView)?.name} view coming soon.</p>
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
              {navItems.map((item) => (
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
                    Settings
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
                  The e-Sports League for Traders
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-body">
                  Where volatility is the start of the game.
                </p>
              </div>
              <div className="flex items-center gap-2">
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
