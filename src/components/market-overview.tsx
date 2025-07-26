import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VolatilityGauge } from './volatility-gauge';
import { Switch } from '@/components/ui/switch';

const topMovers = {
  gainers: [
    { symbol: 'SOL', change: '+15.2%' },
    { symbol: 'AVAX', change: '+8.7%' },
    { symbol: 'ADA', change: '-3.2%' },
    { symbol: 'DOT', change: '-2.1%' },
  ],
  losers: [
    { symbol: 'WIF/USD', change: '+18.45%' },
    { symbol: 'PEPE/USD', change: '+12.87%' },
    { symbol: 'BONK/USD', change: '+9.21%' },
    { symbol: 'ZRO/USD', change: '-4.88%' },
  ],
};

export function MarketOverview({ lang }: { lang: 'en' | 'ko' }) {
  const [showVolatility, setShowVolatility] = useState(false);
  
  return (
    <Card className="w-full bg-background/50 p-4">
      <CardHeader className="p-0 mb-3 flex justify-between items-center">
        <CardTitle className="text-base">{lang === 'ko' ? '시장 개요' : 'Market Overview'}</CardTitle>
        <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">{lang === 'ko' ? '변동성 보기' : 'Show Volatility'}</span>
            <Switch
                checked={showVolatility}
                onCheckedChange={setShowVolatility}
            />
        </div>
      </CardHeader>
      <CardContent className="p-0 text-xs pt-4">
        {showVolatility ? (
          <div>
            <VolatilityGauge lang={lang} />
          </div>
        ) : (
          <div className="space-y-4">
            <Tabs defaultValue="gainers" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="gainers">{lang === 'ko' ? '상승' : 'Gainers'}</TabsTrigger>
                <TabsTrigger value="losers">{lang === 'ko' ? '하락' : 'Losers'}</TabsTrigger>
              </TabsList>
              <TabsContent value="gainers" className="mt-2 space-y-1">
                {topMovers.gainers.map((g, i) => (
                  <div key={i} className="flex justify-between items-center p-1 rounded-md hover:bg-white/5">
                    <span className="font-bold">{g.symbol}</span>
                    <span className={`px-1.5 py-0.5 rounded font-medium text-xs ${g.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{g.change}</span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="losers" className="mt-2 space-y-1">
                {topMovers.losers.map((l, i) => (
                  <div key={i} className="flex justify-between items-center p-1 rounded-md hover:bg-white/5">
                    <span className="font-bold">{l.symbol}</span>
                    <span className={`px-1.5 py-0.5 rounded font-medium text-xs ${l.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{l.change}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div>
                <div className="flex justify-between items-baseline text-sm mb-1"><span className="font-semibold text-white">{lang === 'ko' ? '비트코인 도미넌스' : 'Bitcoin Dominance'}</span><span className="font-bold text-[#4A90E2]">52.3%</span></div>
                <Progress value={52.3} className="h-1.5 [&>div]:bg-[#4A90E2]" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><div><span>24h:</span> <span className="text-white">51.8%</span></div><div><span>7d:</span> <span className="text-white">53.1%</span></div></div>
            </div>
            <div>
                <div className="flex justify-between items-baseline text-sm mb-1"><span className="font-semibold text-white">{lang === 'ko' ? '공포 & 탐욕 지수' : 'Fear & Greed Index'}</span><span className="font-bold text-[#7ED321]">{`72 (${lang === 'ko' ? '탐욕' : 'Greed'})`}</span></div>
                <Progress value={72} className="h-1.5 [&>div]:bg-[#7ED321]" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><div><span>{lang === 'ko' ? '어제:' : 'Yesterday:'}</span> <span className="text-white">65</span></div><div><span>{lang === 'ko' ? '지난주:' : 'Last week:'}</span> <span className="text-white">58</span></div></div>
            </div>
            <div>
                <div className="flex justify-between items-baseline text-sm mb-1"><span className="font-semibold text-white">{lang === 'ko' ? '24시간 거래량' : '24h Volume'}</span><span className="font-bold text-[#F5A623]">$402.1B</span></div>
                <Progress value={85} className="h-1.5 [&>div]:bg-[#F5A623]" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><div><span>{lang === 'ko' ? '변화:' : 'Change:'}</span> <span className="text-white">-0.94%</span></div><div><span>{lang === 'ko' ? '평균:' : 'Average:'}</span> <span className="text-white">$450B</span></div></div>
            </div>
            <div>
                <div className="flex justify-between items-baseline text-sm mb-1"><span className="font-semibold text-white">{lang === 'ko' ? '미체결 약정' : 'Open Interest'}</span><span className="font-bold text-[#F5A623]">$201.7B</span></div>
                <Progress value={70} className="h-1.5 [&>div]:bg-[#F5A623]" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><div><span>{lang === 'ko' ? '변화:' : 'Change:'}</span> <span className="text-white">+3.68%</span></div><div><span>{lang === 'ko' ? '최고:' : 'Peak:'}</span> <span className="text-white">$280B</span></div></div>
            </div>
            <div>
                <div className="flex justify-between items-baseline text-sm mb-1"><span className="font-semibold text-white">{lang === 'ko' ? '24시간 청산' : '24h Liquidation'}</span><span className="font-bold text-[#D0021B]">$463.3M</span></div>
                <Progress value={40} className="h-1.5 [&>div]:bg-[#D0021B]" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><div><span>{lang === 'ko' ? '변화:' : 'Change:'}</span> <span className="text-white">-16.21%</span></div><div><span>{lang === 'ko' ? '최고:' : 'Peak:'}</span> <span className="text-white">$1.2B</span></div></div>
            </div>
            <div>
              <div className="flex justify-between items-baseline text-sm mb-1">
                <span className="font-semibold text-white">{lang === 'ko' ? '롱/숏 비율' : 'Long/Short Ratio'}</span>
                <span className="font-bold text-white">47.84% / 52.16%</span>
              </div>
              <Progress value={47.84} className="h-1.5 [&>div]:bg-green-400" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 