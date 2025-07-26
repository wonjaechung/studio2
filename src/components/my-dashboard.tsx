import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ApiConnectionStatus } from './api-connection-status';
import { RecentTrades } from './recent-trades';
import { AchievementSystem } from './achievement-system';
import { TradingJournal } from './trading-journal';
import { TradingHeatmap } from './trading-heatmap';

export function MyDashboard({ lang }: { lang: 'en' | 'ko' }) {
    const [stats] = useState({
        rank: 42,
        level: 15,
        experience: 1250,
        nextLevelExp: 2000,
        profitLoss: 24500,
        winRate: 68.5,
    });
    const experienceProgress = (stats.experience / stats.nextLevelExp) * 100;

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Top Row: Rank Banner & Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>🏆 {lang === 'ko' ? '나의 랭크' : 'My Rank'}</span>
                            <Badge variant="secondary">Level {stats.level}</Badge>
                        </CardTitle>
                        <CardDescription>Rank #{stats.rank}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{lang === 'ko' ? '레벨 진행도' : 'Level Progress'}</span>
                                <span className="font-medium">{stats.experience} / {stats.nextLevelExp} EXP</span>
                            </div>
                            <Progress value={experienceProgress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">{lang === 'ko' ? '오늘 손익' : 'Today P&L'}</p>
                                <p className={`text-xl font-bold ${stats.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ${stats.profitLoss.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">{lang === 'ko' ? '승률' : 'Win Rate'}</p>
                                <p className="text-xl font-bold text-green-500">{stats.winRate}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="lg:col-span-2">
                    <TradingHeatmap lang={lang} />
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <ApiConnectionStatus />
                    <RecentTrades lang={lang} />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <AchievementSystem lang={lang} />
                    <TradingJournal lang={lang} />
                </div>
            </div>
        </div>
    );
} 