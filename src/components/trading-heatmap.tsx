'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { subDays, format, addDays, getDay, getMonth, startOfWeek, getDate } from 'date-fns';
import { Button } from '@/components/ui/button';

// Helper function to generate mock data
const generateMockData = () => {
    const data: Record<string, { pnl: number; trades: number }> = {};
    const today = new Date();
    for (let i = 0; i < 365 * 2; i++) { // Generate data for 2 years
        const date = format(subDays(today, i), 'yyyy-MM-dd');
        if (Math.random() > 0.3) {
            const pnl = (Math.random() - 0.45) * 10000;
            const trades = Math.floor(Math.random() * 15) + 1;
            data[date] = { pnl, trades };
        }
    }
    return data;
};

const mockData = generateMockData();

const getColor = (pnl: number) => {
    if (pnl > 5000) return 'bg-green-700';
    if (pnl > 1000) return 'bg-green-600';
    if (pnl > 0) return 'bg-green-500';
    if (pnl < -5000) return 'bg-red-700';
    if (pnl < -1000) return 'bg-red-600';
    if (pnl < 0) return 'bg-red-500';
    return 'bg-muted/50';
};

export function TradingHeatmap({ lang }: { lang: 'en' | 'ko' }) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const endDate = new Date(selectedYear, 11, 31);
    const startDate = new Date(selectedYear, 0, 1);
    
    const start = startOfWeek(startDate);
    const weeks = [];
    let currentWeek = [];
    for(let day = start; day <= endDate; day = addDays(day, 1)) {
        currentWeek.push(day);
        if (getDay(day) === 6) { // Saturday
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }
    
    const totalContributions = Object.keys(mockData).filter(d => d.startsWith(selectedYear.toString())).length;

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekDays = ["", "Mon", "", "Wed", "", "Fri", ""];

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{totalContributions} {lang === 'ko' ? '거래일' : 'trading days'} ({selectedYear})</CardTitle>
                <div className="flex gap-1">
                    <Button variant={selectedYear === 2025 ? 'default' : 'outline'} size="sm" onClick={() => setSelectedYear(2025)}>2025</Button>
                    <Button variant={selectedYear === 2024 ? 'default' : 'outline'} size="sm" onClick={() => setSelectedYear(2024)}>2024</Button>
                </div>
            </CardHeader>
            <CardContent className="pt-2">
                <TooltipProvider>
                    <div className="flex gap-2">
                        <div className="grid grid-rows-7 gap-1 text-xs text-muted-foreground pt-5">
                           {weekDays.map((d, i) => <div key={i} className="h-3">{d}</div>)}
                        </div>
                        <div className="flex-1">
                             <div className="grid grid-flow-col auto-cols-min gap-1 mb-1">
                                {weeks.map((week, weekIndex) => {
                                    const firstDayOfWeek = getDate(week[0]);
                                    const showMonth = firstDayOfWeek >= 1 && firstDayOfWeek <= 7;
                                    return <div key={weekIndex} className="text-xs text-muted-foreground w-3">{showMonth ? monthLabels[getMonth(week[0])] : ''}</div>
                                })}
                            </div>
                            <div className="grid grid-rows-7 grid-flow-col auto-cols-min gap-1">
                                {weeks.flat().map((day, index) => {
                                    if (day < startDate || day > endDate) return <div key={index} className="w-3 h-3"/>;

                                    const dateString = format(day, 'yyyy-MM-dd');
                                    const data = mockData[dateString];
                                    const color = data ? getColor(data.pnl) : 'bg-muted/30';
                                    
                                    return (
                                        <Tooltip key={index} delayDuration={100}>
                                            <TooltipTrigger asChild>
                                                <div className={`w-3 h-3 rounded-sm ${color}`} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-xs font-bold">{dateString}</p>
                                                <p className="text-xs">
                                                    {data ? `${data.trades} trades, P&L: ${data.pnl.toFixed(2)}` : (lang === 'ko' ? '거래 없음' : 'No trades')}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </TooltipProvider>
                <div className="flex justify-end items-center text-xs mt-2 text-muted-foreground gap-2 pr-2">
                    <span>{lang === 'ko' ? '손실' : 'Loss'}</span>
                    <div className="w-3 h-3 rounded-sm bg-red-500" />
                    <div className="w-3 h-3 rounded-sm bg-red-700" />
                    <div className="w-3 h-3 rounded-sm bg-muted/30" />
                    <div className="w-3 h-3 rounded-sm bg-green-500" />
                    <div className="w-3 h-3 rounded-sm bg-green-700" />
                    <span>{lang === 'ko' ? '수익' : 'Profit'}</span>
                </div>
            </CardContent>
        </Card>
    );
} 