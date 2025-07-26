import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Crown, Users } from 'lucide-react';

export const CompetitionVisual = ({ lang }: { lang: 'en' | 'ko' }) => {
  const topTraders = [
    { rank: 1, name: '@CryptoKing', pnl: '+12,500', team: 'T1', avatar: '/avatars/01.png', trend: [{ v: 1580 }, { v: 1595 }, { v: 1590 }, { v: 1605 }, { v: 1617 }] },
    { rank: 2, name: '@VolatilityViper', pnl: '+8,200', team: 'Gen.G', avatar: '/avatars/02.png', trend: [{ v: 1550 }, { v: 1545 }, { v: 1555 }, { v: 1565 }, { v: 1561 }] },
    { rank: 3, name: '@DiamondHands', pnl: '+5,100', team: 'DRX', avatar: '/avatars/03.png', trend: [{ v: 1520 }, { v: 1530 }, { v: 1545 }, { v: 1550 }, { v: 1558 }] },
    { rank: 4, name: '@SignalSamurai', pnl: '+4,800', team: 'DK', avatar: '/avatars/04.png', trend: [{ v: 1480 }, { v: 1485 }, { v: 1495 }, { v: 1490 }, { v: 1492 }] },
    { rank: 5, name: '@ChartWizard', pnl: '+3,950', team: 'T1', avatar: '/avatars/05.png', trend: [{ v: 1470 }, { v: 1465 }, { v: 1480 }, { v: 1475 }, { v: 1482 }] },
  ];

  return (
    <div className="p-1 md:p-2 bg-transparent rounded-xl h-full w-full flex flex-col justify-center">
      {/* Header */}
      <div className="flex items-center text-xs text-muted-foreground px-3 py-2">
        <div className="w-16 text-center">#</div>
        <div className="flex-1">{lang === 'ko' ? '플레이어' : 'Player'}</div>
        <div className="w-24 text-center">{lang === 'ko' ? '7일 동향' : '7D Trend'}</div>
        <div className="w-24 text-right">PNL</div>
      </div>

      {/* Leaderboard Body */}
      <div className="space-y-2">
        {topTraders.map((trader) => (
          <Card
            key={trader.rank}
            className={`flex items-center p-2 rounded-lg border-2 transition-all hover:border-primary/50 hover:bg-primary/5 cursor-pointer ${
              trader.rank === 1
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : trader.rank === 2
                ? 'bg-blue-500/10 border-blue-500/30'
                : trader.rank === 3
                ? 'bg-orange-500/10 border-orange-500/30'
                : 'bg-muted/30 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-base font-bold w-10 text-center text-muted-foreground">{trader.rank}</span>
              <Avatar className="w-9 h-9 border-2 border-background">
                <AvatarImage src={trader.avatar} alt={trader.name} />
                <AvatarFallback>{trader.name.charAt(1)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">{trader.name}</div>
                <Badge variant="secondary" className="text-xs h-5">{trader.team}</Badge>
              </div>
              {trader.rank === 1 && <Crown className="w-4 h-4 text-yellow-400 ml-1" />}
            </div>
            <div className="w-24 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trader.trend} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Bar
                    dataKey="v"
                    fill={trader.trend[trader.trend.length - 1].v > trader.trend[0].v ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-1))'}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="font-mono text-sm text-green-400 w-24 text-right pr-2">{trader.pnl}</div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4">
        <Button variant="outline" className="w-full bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary hover:text-primary-foreground">
          <Users className="w-4 h-4 mr-2" />
          {lang === 'ko' ? '나만의 팀 만들기' : 'Create Your Own Team'}
        </Button>
      </div>
    </div>
  );
}; 