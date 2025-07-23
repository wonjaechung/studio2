

'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PlayerProfile } from './player-profile';
import { Crown, Shield, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const rankedData = [
  { rank: 1, name: 'Gen.G Esports', league: 'LCK', points: 1617, record: '28-4 (.875)', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'esports logo GenG', isInternational: true, trend: [{v: 1580}, {v: 1595}, {v: 1590}, {v: 1605}, {v: 1617}] },
  { rank: 2, name: 'T1', league: 'LCK', points: 1561, record: '21-11 (.656)', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'esports logo T1', isInternational: true, trend: [{v: 1550}, {v: 1545}, {v: 1555}, {v: 1565}, {v: 1561}] },
  { rank: 3, name: 'Anyone\'s Legend', league: 'LPL', points: 1558, record: '30-9 (.769)', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'esports logo AL', isInternational: false, trend: [{v: 1520}, {v: 1530}, {v: 1545}, {v: 1550}, {v: 1558}] },
  { rank: 4, name: 'Hanwha Life Esports', league: 'LCK', points: 1555, record: '28-8 (.778)', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'esports logo HLE', isInternational: false, trend: [{v: 1560}, {v: 1550}, {v: 1540}, {v: 1545}, {v: 1555}] },
  { rank: 5, name: 'BILIBILI GAMING', league: 'LPL', points: 1492, record: '28-13 (.683)', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'esports logo BLG', isInternational: true, trend: [{v: 1480}, {v: 1485}, {v: 1495}, {v: 1490}, {v: 1492}] },
];

const normalData = [
    { rank: 1, name: 'CryptoKing', profit: '+1,254.3%', address: '0xabc...def', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'king crown' },
    { rank: 2, name: 'WhaleWatcher', profit: '+987.1%', address: '0x123...456', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'whale ocean' },
    { rank: 3, name: 'DiamondHands', profit: '+850.5%', address: '0x789...abc', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'diamond hands' },
]

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
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <div className="xl:col-span-3">
         <Tabs defaultValue="ranked">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="ranked">Ranked Mode</TabsTrigger>
                    <TabsTrigger value="normal">Normal Mode</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                </TabsList>
                <Button>Create a Team</Button>
            </div>
            <TabsContent value="ranked">
                <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline">Global Power Rankings</CardTitle>
                    <CardDescription>Powered by TradeOS AI Engine. Updated: 2024-07-23 03:00</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-16 text-center">#</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="w-32 text-center">Trend</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        <TableHead className="text-center">W/L</TableHead>
                        <TableHead className="text-center">International</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rankedData.map((player) => (
                        <TableRow key={player.rank} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelectedAddress(player.name)}>
                            <TableCell className="font-bold text-lg text-center">{player.rank}</TableCell>
                            <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                <AvatarImage src={player.avatar} data-ai-hint={player.dataAiHint} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{player.name}</p>
                                    <p className="text-xs text-muted-foreground">{player.league}</p>
                                </div>
                            </div>
                            </TableCell>
                            <TableCell>
                                <div className="h-8 w-24 mx-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={player.trend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Bar dataKey="v" fill={player.trend[player.trend.length-1].v > player.trend[0].v ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-1))'} />
                                    </BarChart>
                                </ResponsiveContainer>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-mono font-bold text-accent">{player.points} pts</TableCell>
                            <TableCell className="text-center font-mono">{player.record}</TableCell>
                            <TableCell className="text-center">
                                {player.isInternational && (
                                  <div className="flex justify-center gap-2">
                                      <Badge variant="outline" className="border-yellow-400/50 text-yellow-300">
                                          <Crown className="w-4 h-4 mr-1"/> Worlds
                                      </Badge>
                                  </div>
                                )}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="normal">
                {/* Placeholder for Normal Mode Leaderboard */}
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline">Normal Mode Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rank</TableHead>
                                    <TableHead>Player</TableHead>
                                    <TableHead className="text-right">Profit %</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {normalData.map((player) => (
                                <TableRow key={player.rank} onClick={() => setSelectedAddress(player.address)} className="cursor-pointer hover:bg-muted/30">
                                    <TableCell>{player.rank}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8"><AvatarImage src={player.avatar} data-ai-hint={player.dataAiHint} /></Avatar>
                                            {player.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-green-400 font-mono">{player.profit}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                 </Card>
            </TabsContent>
            <TabsContent value="teams">
                {/* Placeholder for Teams Leaderboard */}
                 <div className="text-center py-16 text-muted-foreground">Team rankings coming soon!</div>
            </TabsContent>
        </Tabs>
      </div>

      <div className="xl:col-span-1 space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Power Rankings Explained</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>1-tier team power rankings are calculated by summing points from the following categories.</p>
                <div className="space-y-2 border-t border-border pt-4">
                   <div className="font-semibold text-foreground">Team Match Result Points</div>
                   <p>⚔️ Opponent's Strength: Power score difference</p>
                   <p>📈 Win Score Difference: Match win/loss</p>
                   <p>💥 Upset Bonus: e.g., Worlds Playoffs > Regular Season</p>
                </div>
                 <div className="space-y-2 border-t border-border pt-4">
                    <div className="font-semibold text-foreground">Regional League Power</div>
                     <p>LCK: 1755, LPL: 1604, LEC: 1341...</p>
                </div>
                 <div className="space-y-2 border-t border-border pt-4">
                    <div className="font-semibold text-foreground">International Competition Results</div>
                     <Button variant="link" className="p-0 h-auto">Learn More</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
