import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Crown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const performanceData = [
  { name: 'Week 1', pnl: 4000 },
  { name: 'Week 2', pnl: 3000 },
  { name: 'Week 3', pnl: 5000 },
  { name: 'Week 4', pnl: 4500 },
  { name: 'Week 5', pnl: 6000 },
  { name: 'Week 6', pnl: 8200 },
];

const recentTrades = [
  { type: 'Long', symbol: 'BTC/USD', amount: '+2.5 BTC', pnl: '+$5,230', time: '2h ago' },
  { type: 'Short', symbol: 'ETH/USD', amount: '-15 ETH', pnl: '+$1,890', time: '5h ago' },
  { type: 'Long', symbol: 'SOL/USD', amount: '+150 SOL', pnl: '-$950', time: '1d ago' },
];

export function PlayerDetailSlide({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full h-full bg-transparent border-none shadow-none p-2">
      <CardHeader className="p-0 mb-3 flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-primary">
            <AvatarImage src="/avatars/01.png" alt="@CryptoKing" />
            <AvatarFallback>CK</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">@CryptoKing</h3>
              <Crown className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">Team: <span className="font-semibold text-primary">T1</span></p>
          </div>
        </div>
        <div className="text-right">
            <p className="text-xs text-muted-foreground">{lang === 'ko' ? '시즌 PNL' : 'Season PNL'}</p>
            <p className="text-2xl font-bold text-green-400">+$82,450</p>
        </div>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-2 gap-3">
        {/* Performance Chart */}
        <div className="col-span-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ 
                        background: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        fontSize: '12px'
                        }} 
                    />
                    <Area type="monotone" dataKey="pnl" stroke="hsl(var(--chart-2))" fill="url(#colorPnl)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Recent Trades */}
        <div className="col-span-2">
           <h4 className="text-sm font-semibold mb-2">{lang === 'ko' ? '최근 거래' : 'Recent Trades'}</h4>
            <div className="space-y-2">
                {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-2 rounded-md bg-background/50">
                        <div className="flex items-center gap-2">
                            {trade.type === 'Long' ? <ArrowUpRight className="w-4 h-4 text-green-500"/> : <ArrowDownRight className="w-4 h-4 text-red-500"/>}
                            <div>
                                <span className="font-bold">{trade.symbol}</span>
                                <span className="text-muted-foreground ml-2">{trade.amount}</span>
                            </div>
                        </div>
                        <div className={`font-mono text-right ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {trade.pnl}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
} 