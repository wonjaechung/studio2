'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

const gaugeLevels = [
  { level: 1, name: 'Calm', color: 'bg-blue-500', animation: 'animate-pulse-calm', description: 'Markets are stable. Low volatility detected.' },
  { level: 2, name: 'Tension', color: 'bg-yellow-500', animation: 'animate-pulse-tension', description: 'Volatility increasing. Market tension is building.' },
  { level: 3, name: 'Critical', color: 'bg-red-500', animation: 'animate-flash-red', description: 'Critical volatility! Ranked game imminent.' },
  { level: 4, name: 'Explosion', color: 'bg-accent', animation: 'animate-ping', description: 'Ranked Game Started! Volatility has exploded.' },
];

export function VolatilityGauge() {
  const [currentLevel, setCurrentLevel] = useState(0);

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
          <TrendingUp className="w-8 h-8"/> Volatility Gauge
        </CardTitle>
        <CardDescription className="font-body text-lg">
          Market Tension Level: <span className="font-bold text-accent">{name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full h-48 bg-black/20 rounded-lg flex items-center justify-center p-4 overflow-hidden">
            {/* This is a simplified representation of a seismic wave / heartbeat */}
            <div className={cn("w-full h-2 rounded-full", color, animation)}></div>
          </div>
          <p className="text-center text-muted-foreground font-body max-w-md">{description}</p>
          
          {name === 'Critical' && (
             <div className="font-code text-2xl text-red-400 animate-pulse">
                RANKED GAME STARTING IN: 00:59
             </div>
          )}

          {name === 'Explosion' && (
             <div className="font-logo text-3xl text-accent tracking-widest animate-pulse">
                RANKED GAME LIVE
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
