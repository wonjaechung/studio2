import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Crown } from 'lucide-react';

const getTierName = (tier: 'Grandmaster' | 'Master' | 'Diamond', lang: 'en' | 'ko') => {
    const tiers = {
        Grandmaster: { en: 'Grandmaster', ko: '그랜드마스터' },
        Master: { en: 'Master', ko: '마스터' },
        Diamond: { en: 'Diamond', ko: '다이아몬드' },
    };
    return tiers[tier][lang];
}

const seasonHistoryData = [
    { season: '2024 Q2', tier: 'Grandmaster', pnl: '+$1,240,830', color: 'text-red-400' },
    { season: '2024 Q1', tier: 'Master', pnl: '+$870,150', color: 'text-purple-400' },
    { season: '2023 Q4', tier: 'Master', pnl: '+$915,400', color: 'text-purple-400' },
    { season: '2023 Q3', tier: 'Diamond', pnl: '+$550,600', color: 'text-blue-400' },
    { season: '2023 Q2', tier: 'Diamond', pnl: '+$480,210', color: 'text-blue-400' },
] as const;


export function PlayerDetailSlide({ lang }: { lang: 'en' | 'ko' }) {
  const peakPnlSeason = seasonHistoryData[0];

  return (
    <Card className="w-full h-full bg-transparent border-none shadow-none p-2">
      <CardHeader className="p-0 mb-3 flex-row items-center space-x-3">
        <Avatar className="w-12 h-12">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>CJ</AvatarFallback>
        </Avatar>
        <div>
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">@CryptoKing</h3>
                <Badge variant="secondary">T1</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{lang === 'ko' ? '팀의 핵심, 에이스 트레이더' : 'The core of the team, Ace Trader'}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-5 gap-4">
        {/* Current Season Stats */}
        <div className="col-span-2 space-y-3">
            <Card className="bg-background/50 p-3">
                <p className="text-xs text-muted-foreground mb-1">{lang === 'ko' ? '이번 시즌 랭크' : 'Current Season Rank'}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-purple-400">{getTierName('Master', lang)}</p>
                        <p className="text-sm font-semibold">250 LP</p>
                    </div>
                    <div className="text-right text-xs">
                        <p>150W 88L</p>
                        <p><span className="text-muted-foreground">{lang === 'ko' ? '승률' : 'Win Rate'}</span> 63%</p>
                    </div>
                </div>
            </Card>
            <Card className="bg-background/50 p-3">
                <p className="text-xs text-muted-foreground mb-1">{lang === 'ko' ? '최고 PNL' : 'Peak PNL'}</p>
                <div className="flex items-center justify-between">
                     <div>
                        <p className="text-xl font-bold text-green-400">{peakPnlSeason.pnl}</p>
                        <p className="text-sm text-muted-foreground">{peakPnlSeason.season} {getTierName(peakPnlSeason.tier, lang)}</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-none">
                        <Crown className="w-3 h-3 mr-1"/>
                        {lang === 'ko' ? '최고 등급' : 'Top Tier'}
                    </Badge>
                </div>
            </Card>
        </div>
        
        {/* Season History */}
        <div className="col-span-3">
            <Card className="bg-background/50 h-full p-2">
                <p className="text-sm font-semibold px-2 mb-1">{lang === 'ko' ? '시즌 기록' : 'Season History'}</p>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs">{lang === 'ko' ? '시즌' : 'Season'}</TableHead>
                            <TableHead className="text-xs">{lang === 'ko' ? '티어' : 'Tier'}</TableHead>
                            <TableHead className="text-right text-xs">{lang === 'ko' ? '최종 PNL' : 'Final PNL'}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {seasonHistoryData.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-xs py-1.5 font-medium">{s.season}</TableCell>
                                <TableCell className={`text-xs py-1.5 font-bold ${s.color}`}>{getTierName(s.tier, lang)}</TableCell>
                                <TableCell className="text-right text-xs py-1.5 font-mono">{s.pnl}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
      </CardContent>
    </Card>
  );
} 