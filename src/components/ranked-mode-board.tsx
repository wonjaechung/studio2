'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, TrendingDown, Target, Zap, Shield, AlertTriangle, Star, History } from 'lucide-react';
import { TradingViewChart } from '@/components/trading-view-chart';
import { VolatilityGauge } from '@/components/volatility-gauge';
import { ApiConnectionStatus } from '@/components/api-connection-status';

interface TradingStats {
  totalTrades: number;
  winRate: number;
  profitLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  rank: number;
  level: number;
  experience: number;
  nextLevelExp: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export function RankedModeBoard({ lang }: { lang: 'en' | 'ko' }) {
  const [stats, setStats] = useState<TradingStats>({
    totalTrades: 156,
    winRate: 68.5,
    profitLoss: 24500,
    maxDrawdown: -8.2,
    sharpeRatio: 1.85,
    rank: 42,
    level: 15,
    experience: 1250,
    nextLevelExp: 2000
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: 'first-million',
      name: 'First Million',
      description: '첫 100만 달러 거래 달성',
      icon: <Target className="w-4 h-4" />,
      unlocked: true,
      progress: 100,
      maxProgress: 100
    },
    {
      id: 'risk-master',
      name: 'Risk Master',
      description: '연속 10일 리스크 관리 우수',
      icon: <Shield className="w-4 h-4" />,
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 'speed-trader',
      name: 'Speed Trader',
      description: '1분 내 10회 거래 성공',
      icon: <Zap className="w-4 h-4" />,
      unlocked: false,
      progress: 6,
      maxProgress: 10
    },
    {
      id: 'volatility-warrior',
      name: 'Volatility Warrior',
      description: '높은 변동성에서 5회 연속 수익',
      icon: <AlertTriangle className="w-4 h-4" />,
      unlocked: false,
      progress: 3,
      maxProgress: 5
    }
  ]);

  const [recentTrades] = useState([
    { id: 1, symbol: 'BTC/USD', type: 'buy', amount: 0.5, price: 43250, pnl: 1250, time: '2분 전' },
    { id: 2, symbol: 'ETH/USD', type: 'sell', amount: 2.1, price: 2650, pnl: -320, time: '15분 전' },
    { id: 3, symbol: 'SOL/USD', type: 'buy', amount: 10, price: 98.5, pnl: 450, time: '1시간 전' },
  ]);

  const experienceProgress = (stats.experience / stats.nextLevelExp) * 100;

  return (
    <div className="space-y-6">
      {/* Top Section - Critical Info at a Glance */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Rank & Level - Most Important */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">🏆 Ranked Mode</h2>
                <p className="text-muted-foreground">실시간 거래 및 성과 추적</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Trophy className="w-4 h-4 mr-1" />
                  Rank #{stats.rank}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Level {stats.level}
                </Badge>
              </div>
            </div>
            
            {/* Level Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">레벨 진행도</span>
                <span className="font-medium">{stats.experience} / {stats.nextLevelExp} EXP</span>
              </div>
              <Progress value={experienceProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                다음 레벨까지 {stats.nextLevelExp - stats.experience} EXP 필요
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profit/Loss - Key Metric */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">오늘 손익</p>
              <p className={`text-3xl font-bold ${stats.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${stats.profitLoss.toLocaleString()}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {stats.profitLoss >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs text-muted-foreground">
                  {stats.profitLoss >= 0 ? '+' : ''}{((stats.profitLoss / 100000) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Win Rate - Key Metric */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">승률</p>
              <p className="text-3xl font-bold text-green-500">{stats.winRate}%</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">{stats.totalTrades} 거래</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area - Enhanced Chart */}
      <TradingViewChart />

      {/* Additional Monitoring Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Connection - Critical for Trading */}
        <ApiConnectionStatus />
        
        {/* Volatility Gauge - Market Condition */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">시장 변동성</CardTitle>
          </CardHeader>
          <CardContent>
            <VolatilityGauge lang={lang} />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Detailed Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trades - Trading History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              최근 거래
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{trade.symbol}</p>
                    <p className="text-sm text-muted-foreground">{trade.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${trade.pnl.toLocaleString()}
                    </p>
                    <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'} className="text-xs">
                      {trade.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements - Gamification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              업적 시스템
            </CardTitle>
            <CardDescription>
              거래 성과에 따른 업적을 달성하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked ? 'bg-accent/10 border-accent' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? 'bg-accent text-accent-foreground' : 'bg-muted'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.name}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>진행도</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 