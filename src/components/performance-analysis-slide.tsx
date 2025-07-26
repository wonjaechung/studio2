import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { LineChart, TrendingUp, TrendingDown, Clock, BarChart2, MoreHorizontal } from 'lucide-react';

const equityCurveData = [
  { day: 'D-30', value: 10000 },
  { day: 'D-25', value: 12500 },
  { day: 'D-20', value: 11800 },
  { day: 'D-15', value: 13200 },
  { day: 'D-10', value: 15800 },
  { day: 'D-5', value: 15100 },
  { day: 'Today', value: 17230 },
];

const keyStats = (lang: 'en' | 'ko') => [
    { label: lang === 'ko' ? '총 PNL': 'Total PNL', value: '+$17,230', trend: 7.2 },
    { label: lang === 'ko' ? '승률': 'Win Rate', value: '68%', trend: 2.1 },
    { label: lang === 'ko' ? '평균 수익률': 'Avg. Profit', value: '+2.1%', trend: -0.5 },
    { label: lang === 'ko' ? '샤프 지수': 'Sharpe Ratio', value: '1.87', trend: 0.12 },
];

const tradingTags = (lang: 'en' | 'ko') => [
    { text: lang==='ko' ? '단기 변동성 매매' : 'Short-term Volatility', color: 'bg-blue-500/10 text-blue-300' },
    { text: lang==='ko' ? 'BTC/ETH 주력' : 'BTC/ETH Focused', color: 'bg-orange-500/10 text-orange-300' },
    { text: lang==='ko' ? '높은 레버리지' : 'High Leverage', color: 'bg-red-500/10 text-red-300' },
    { text: lang==='ko' ? '주말에 강함' : 'Strong on Weekends', color: 'bg-green-500/10 text-green-300' },
];

const recentMatches = (lang: 'en' | 'ko') => [
  { result: 'win', pnl: '+$2,150', symbol: 'BTC/USDT', duration: '2h 15m', time: '3 hours ago', type: 'Long', leverage: '10x' },
  { result: 'loss', pnl: '-$890', symbol: 'ETH/USDT', duration: '45m', time: '8 hours ago', type: 'Short', leverage: '25x' },
  { result: 'win', pnl: '+$4,320', symbol: 'BTC/USDT', duration: '5h 30m', time: '1 day ago', type: 'Long', leverage: '5x' },
  { result: 'win', pnl: '+$1,120', symbol: 'SOL/USDT', duration: '1h 5m', time: '1 day ago', type: 'Long', leverage: '15x' },
];

export function PerformanceAnalysisSlide({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <div className="p-1 md:p-2 bg-transparent rounded-xl h-full w-full flex flex-col justify-center text-sm">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="p-0 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary/50">
              <AvatarImage src="/avatars/01.png" alt="@CryptoKing" />
            </Avatar>
            <div>
              <h3 className="font-bold text-base">@CryptoKing's Analysis</h3>
              <p className="text-xs text-muted-foreground">{lang === 'ko' ? '당신의 거래 데이터 요약' : 'Your Trading Data Summary'}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8">{lang === 'ko' ? 'API 키 연결' : 'Connect API Key'}</Button>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-4 gap-2">
            {keyStats(lang).map(stat => (
                <Card key={stat.label} className="bg-background/50 p-2 rounded-lg">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-bold text-base">{stat.value}</p>
                    <div className={`flex items-center text-xs ${stat.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.trend > 0 ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>}
                        {stat.trend}%
                    </div>
                </Card>
            ))}
            <div className="col-span-4 h-32 mt-2">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={equityCurveData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                         <defs>
                            <linearGradient id="equityCurve" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', fontSize: '12px' }}/>
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#equityCurve)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
             <div className="col-span-4 mt-2">
                <h4 className="text-xs font-semibold mb-2 text-muted-foreground">{lang==='ko' ? '거래 스타일' : 'Trading Style'}</h4>
                <div className="flex flex-wrap gap-2">
                    {tradingTags(lang).map(tag => (
                        <Badge key={tag.text} className={`text-xs font-normal ${tag.color}`}>{tag.text}</Badge>
                    ))}
                </div>
            </div>
            {/* Recent Match History */}
            <div className="col-span-4 mt-2">
                <h4 className="text-xs font-semibold my-2 text-muted-foreground">{lang === 'ko' ? '최근 거래 내역' : 'Recent Match History'}</h4>
                <div className="space-y-1">
                    {recentMatches(lang).map((match, index) => (
                        <Card key={index} className={`p-2 flex items-center gap-2 text-xs transition-all hover:border-primary/50 ${match.result === 'win' ? 'bg-blue-900/20 border-blue-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
                            <div className={`w-1.5 h-10 rounded-full ${match.result === 'win' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                            <div className="flex flex-col w-16">
                                <span className={`font-bold ${match.result === 'win' ? 'text-blue-400' : 'text-red-400'}`}>{match.result === 'win' ? (lang === 'ko' ? '승리' : 'VICTORY') : (lang === 'ko' ? '패배' : 'DEFEAT')}</span>
                                <span className="text-muted-foreground text-[10px]">{match.time}</span>
                            </div>
                             <div className="flex-1 flex items-center gap-3">
                                <Badge variant={match.type === 'Long' ? 'default' : 'destructive'} className="w-12 justify-center h-5">{match.type}</Badge>
                                <div>
                                    <p className="font-bold text-white">{match.symbol}</p>
                                    <p className="text-muted-foreground text-[10px]">Leverage {match.leverage}</p>
                                </div>
                             </div>
                             <div className="flex flex-col text-right w-20">
                                <span className={`font-mono font-bold ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>{match.pnl}</span>
                                <span className="text-muted-foreground text-[10px]">{match.duration}</span>
                             </div>
                             <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full">
                                <MoreHorizontal className="w-4 h-4" />
                             </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
} 