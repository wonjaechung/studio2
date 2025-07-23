'use client';

import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Database, Code, Wand2, Users, BotMessageSquare, Settings, Fish, Waves, Flame } from 'lucide-react';
import { useState } from 'react';
import { AISummarizer } from './ai-summarizer';
import { DatasetTables } from './dataset-tables';
import { WhaleWatch } from './whale-watch';
import { HyperliquidTracker } from './hyperliquid-tracker';
import { LiquidationTracker } from './liquidation-tracker';

const navItems = [
  { name: 'Raw Data', icon: Database, view: 'raw' },
  { name: 'Decoded Projects', icon: Code, view: 'decoded' },
  { name: 'Spells', icon: Wand2, view: 'spells' },
  { name: 'Whale Watch', icon: Fish, view: 'whale' },
  { name: 'Hyperliquid', icon: Waves, view: 'hyperliquid' },
  { name: 'Liquidations', icon: Flame, view: 'liquidations' },
  { name: 'Community', icon: Users, view: 'community' },
];

export function Dashboard() {
  const [activeView, setActiveView] = useState('raw');

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar className="hidden lg:flex flex-col">
          <SidebarHeader>
            <h2 className="text-xl font-semibold font-headline text-foreground">Explorer</h2>
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
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-blue-400">
                  DuneChain Explorer
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Your AI-powered portal to the blockchain. Parse, structure, and understand on-chain data with unprecedented clarity.
                </p>
              </div>
              <div className="flex items-center gap-2">
                 <SidebarTrigger className="lg:hidden" />
              </div>
            </div>

            <div className="space-y-12">
               <section id="liquidation-tracker">
                 <h2 className="text-2xl font-headline font-semibold tracking-tight mb-4 flex items-center gap-2">
                   <Flame className="w-6 h-6 text-accent"/> Total Liquidations
                 </h2>
                 <LiquidationTracker />
              </section>
              
              <section id="hyperliquid-tracker">
                 <h2 className="text-2xl font-headline font-semibold tracking-tight mb-4 flex items-center gap-2">
                   <Waves className="w-6 h-6 text-accent"/> Hyperliquid Whale Tracker
                 </h2>
                 <HyperliquidTracker />
              </section>

              <section id="whale-watch">
                 <h2 className="text-2xl font-headline font-semibold tracking-tight mb-4 flex items-center gap-2">
                   <Fish className="w-6 h-6 text-accent"/> Whale Watch
                 </h2>
                 <WhaleWatch />
              </section>

              <section id="ai-summarizer">
                 <h2 className="text-2xl font-headline font-semibold tracking-tight mb-4 flex items-center gap-2">
                   <BotMessageSquare className="w-6 h-6 text-accent"/> AI Analysis
                 </h2>
                 <AISummarizer />
              </section>

              <section id="datasets">
                <h2 className="text-2xl font-headline font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-accent"/>
                  Browse Datasets
                </h2>
                <DatasetTables />
              </section>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
