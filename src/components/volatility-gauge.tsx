'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

const getGaugeLevels = (lang: 'en' | 'ko') => [
  { level: 1, name: lang === 'ko' ? '고요' : 'Calm', color: 'bg-blue-500', animation: 'animate-pulse-calm', description: lang === 'ko' ? '시장이 안정적입니다. 낮은 변동성이 감지됩니다.' : 'Markets are stable. Low volatility detected.' },
  { level: 2, name: lang === 'ko' ? '긴장' : 'Tension', color: 'bg-yellow-500', animation: 'animate-pulse-tension', description: lang === 'ko' ? '변동성이 증가하고 있습니다. 시장의 긴장감이 고조됩니다.' : 'Volatility increasing. Market tension is building.' },
  { level: 3, name: lang === 'ko' ? '임계' : 'Critical', color: 'bg-red-500', animation: 'animate-flash-red', description: lang === 'ko' ? '임계 변동성! 랭크 게임이 임박했습니다.' : 'Critical volatility! Ranked game imminent.' },
  { level: 4, name: lang === 'ko' ? '폭발' : 'Explosion', color: 'bg-accent', animation: 'animate-ping', description: lang === 'ko' ? '랭크 게임 시작! 변동성이 폭발했습니다.' : 'Ranked Game Started! Volatility has exploded.' },
];

const content = {
    en: {
        title: 'Volatility Gauge',
        levelLabel: 'Market Tension Level',
        countdown: (time: string) => `RANKED GAME STARTING IN: ${time}`,
        live: 'RANKED GAME LIVE'
    },
    ko: {
        title: '변동성 게이지',
        levelLabel: '시장 긴장도 레벨',
        countdown: (time: string) => `랭크 게임 시작까지: ${time}`,
        live: '랭크 게임 진행 중'
    }
}

export function VolatilityGauge({ lang }: { lang: 'en' | 'ko' }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const gaugeLevels = getGaugeLevels(lang);
  const currentContent = content[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLevel((prevLevel) => (prevLevel + 1) % gaugeLevels.length);
    }, 5000); // Cycle through levels every 5 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const { name, color, animation, description } = gaugeLevels[currentLevel];

  return (
    <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl shadow-accent/10">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl tracking-wider flex items-center justify-center gap-2">
          <TrendingUp className="w-8 h-8"/> {currentContent.title}
        </CardTitle>
        <CardDescription className="font-body text-lg">
          {currentContent.levelLabel}: <span className="font-bold text-accent">{name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full h-48 bg-black/20 rounded-lg flex items-center justify-center p-4 overflow-hidden">
            {/* This is a simplified representation of a seismic wave / heartbeat */}
            <div className={cn("w-full h-2 rounded-full", color, animation)}></div>
          </div>
          <p className="text-center text-muted-foreground font-body max-w-md">{description}</p>
          
          {name === (lang === 'ko' ? '임계' : 'Critical') && (
             <div className="font-code text-2xl text-red-400 animate-pulse">
                {currentContent.countdown('00:59')}
             </div>
          )}

          {name === (lang === 'ko' ? '폭발' : 'Explosion') && (
             <div className="font-logo text-3xl text-accent tracking-widest animate-pulse">
                {currentContent.live}
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
