'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradingViewChart } from '@/components/trading-view-chart';
import { VolatilityGauge } from '@/components/volatility-gauge';
import { MarketOverview } from './market-overview';
import { QuickTrade } from './quick-trade';
import { TradeTools } from './trade-tools';

export function RankedModeBoard({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart */}
      <div className="lg:col-span-2">
        <TradingViewChart lang={lang} />
      </div>

      {/* Side Panel */}
      <div className="lg:col-span-1 space-y-6">
        <MarketOverview lang={lang} />
        <div className="grid grid-cols-2 gap-6">
          <QuickTrade lang={lang} />
          <TradeTools lang={lang} />
        </div>
      </div>
    </div>
  );
} 