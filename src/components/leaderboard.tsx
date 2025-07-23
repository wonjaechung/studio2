'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { PlayerProfile } from './player-profile';

const leaderboardData = [
  { rank: 1, name: 'frieza', exchange: 'Binance', profit: '2,587.35%', avatar: 'https://placehold.co/40x40/7E57C2/FFFFFF', address: '0x123...abc' },
  { rank: 2, name: 'affordably_Grandma', exchange: 'OKX', profit: '2,111.35%', avatar: 'https://placehold.co/40x40/5C6BC0/FFFFFF', address: '0x456...def' },
  { rank: 3, name: 'Vegeta', exchange: 'Binance', profit: '1,520.84%', avatar: 'https://placehold.co/40x40/42A5F5/FFFFFF', address: '0x789...ghi' },
  { rank: 4, name: 'ninilucky', exchange: 'Binance', profit: '1,445.91%', avatar: 'https://placehold.co/40x40/29B6F6/FFFFFF', address: '0xabc...123' },
  { rank: 5, name: 'kelly9', exchange: 'Binance', profit: '1,280.77%', avatar: 'https://placehold.co/40x40/26C6DA/FFFFFF', address: '0xdef...456' },
  { rank: 6, name: 'Reboot', exchange: 'Binance', profit: '1,242.49%', avatar: 'https://placehold.co/40x40/26A69A/FFFFFF', address: '0xghi...789' },
  { rank: 7, name: 'dunny', exchange: 'BitMEX', profit: '1,017.45%', avatar: 'https://placehold.co/40x40/66BB6A/FFFFFF', address: '0xshd...281' },
  { rank: 8, name: 'happyending', exchange: 'OKX', profit: '890.84%', avatar: 'https://placehold.co/40x40/9CCC65/FFFFFF', address: '0xapd...134' },
  { rank: 9, name: 'revive_MTA', exchange: 'Bybit', profit: '881.78%', avatar: 'https://placehold.co/40x40/D4E157/FFFFFF', address: '0x153...aef' },
  { rank: 10, name: 'Lu111', exchange: 'Bitget', profit: '795.81%', avatar: 'https://placehold.co/40x40/FFEE58/FFFFFF', address: '0x213...ffa' },
];

const Chart = ({ data }: { data: number[] }) => (
  <div className="w-24 h-8">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data.map(v => ({ value: v }))}>
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--accent))"
          fill="url(#chart-gradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);


export function Leaderboard() {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  if (selectedAddress) {
      return (
          <div>
              <Button onClick={() => setSelectedAddress(null)} className="mb-4">
                  &larr; Back to Leaderboard
              </Button>
              <PlayerProfile />
          </div>
      );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline">Main Leaderboard</CardTitle>
        <div className="flex items-center justify-between">
            <Tabs defaultValue="main">
                <TabsList>
                    <TabsTrigger value="main">Main Leaderboard</TabsTrigger>
                    <TabsTrigger value="copy">Copy Leaders</TabsTrigger>
                    <TabsTrigger value="league">League</TabsTrigger>
                </TabsList>
            </Tabs>
            <Button variant="outline" className="bg-accent/20 border-accent/50 text-accent-foreground">Pay to See Rewards Help</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Exchange</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="w-32 text-center">Chart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((player) => (
              <TableRow key={player.rank} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelectedAddress(player.address)}>
                <TableCell className="font-medium text-center">{player.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{player.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{player.exchange}</TableCell>
                <TableCell className="text-right font-medium text-green-400">{player.profit}</TableCell>
                <TableCell>
                  <Chart data={[10, 20, 15, 30, 25, 45, 40]}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
