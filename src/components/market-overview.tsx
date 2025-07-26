import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const topMovers = {
  gainers: [
    { symbol: 'WIF/USD', change: '+18.45%', price: '$3.12' },
    { symbol: 'PEPE/USD', change: '+12.87%', price: '$0.000014' },
    { symbol: 'BONK/USD', change: '+9.21%', price: '$0.000028' },
  ],
  losers: [
    { symbol: 'JUP/USD', change: '-6.54%', price: '$0.88' },
    { symbol: 'ORDI/USD', change: '-5.12%', price: '$45.67' },
    { symbol: 'ZRO/USD', change: '-4.88%', price: '$3.15' },
  ],
};

export function MarketOverview({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg">{lang === 'ko' ? '시장 개요' : 'Market Overview'}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {/* Top Movers */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{lang === 'ko' ? 'Top Movers' : 'Top Movers'}</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-green-400 mb-1">{lang === 'ko' ? '상승' : 'Gainers'}</p>
              {topMovers.gainers.map((g, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{g.symbol}</span>
                  <span className="text-green-400">{g.change}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-red-400 mb-1">{lang === 'ko' ? '하락' : 'Losers'}</p>
              {topMovers.losers.map((l, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{l.symbol}</span>
                  <span className="text-red-400">{l.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bitcoin Dominance */}
        <div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-semibold">{lang === 'ko' ? '비트코인 도미넌스' : 'Bitcoin Dominance'}</span>
            <span className="font-bold text-blue-400">54.3%</span>
          </div>
          <Progress value={54.3} className="h-2 [&>div]:bg-blue-400" />
        </div>

        {/* Fear & Greed Index */}
        <div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-semibold">{lang === 'ko' ? 'Fear & Greed 지수' : 'Fear & Greed Index'}</span>
            <span className="font-bold text-green-400">72 (Greed)</span>
          </div>
          <Progress value={72} className="h-2 [&>div]:bg-green-400" />
        </div>

        {/* 24h Trading Volume */}
        <div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-semibold">{lang === 'ko' ? '24시간 거래량' : '24h Trading Volume'}</span>
            <span className="font-bold text-yellow-400">$85.4B</span>
          </div>
          <Progress value={80} className="h-2 [&>div]:bg-yellow-400" />
        </div>

        {/* Long/Short Ratio */}
        <div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-semibold">{lang === 'ko' ? '롱/숏 비율' : 'Long/Short Ratio'}</span>
            <span>1.82</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-400">64.5%</span>
            <Progress value={64.5} className="h-2 flex-1 [&>div]:bg-green-400" />
            <span className="text-xs text-red-400">35.5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 