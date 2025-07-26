import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, Swords, Mic } from 'lucide-react';

const team1 = {
  name: 'T1',
  avatar: '/teams/t1.png',
  totalPnl: '+128,300',
  winRate: '68%',
  members: [
    { name: '@CryptoKing', pnl: '+82,450', avatar: '/avatars/01.png', contribution: 64 },
    { name: '@ChartWizard', pnl: '+45,850', avatar: '/avatars/05.png', contribution: 36 },
  ],
};

const team2 = {
  name: 'Gen.G',
  avatar: '/teams/geng.png',
  totalPnl: '+115,900',
  winRate: '62%',
  members: [
    { name: '@VolatilityViper', pnl: '+75,200', avatar: '/avatars/02.png', contribution: 65 },
    { name: '@SignalSamurai', pnl: '+40,700', avatar: '/avatars/04.png', contribution: 35 },
  ],
};

const teamCommentary = (lang: 'en' | 'ko') => [
    { time: '1m ago', text: lang === 'ko' ? 'T1의 @CryptoKing, Gen.G의 매도세를 예측하고 팀을 위한 방어적 포지션에 들어갑니다! 엄청난 리더십!' : 'T1 @CryptoKing anticipates Gen.G\'s sell-off and enters a defensive position for the team! Incredible leadership!' },
    { time: '5m ago', text: lang === 'ko' ? 'Gen.G의 @VolatilityViper, T1의 공격적인 롱 포지션을 역이용하여 큰 수익을 냅니다! 스마트한 플레이!' : 'Gen.G @VolatilityViper capitalizes on T1\'s aggressive long, securing a major profit! Smart play!' },
    { time: '12m ago', text: lang === 'ko' ? '@ChartWizard가 손실을 보자마자 @CryptoKing이 즉시 커버에 들어갑니다! 이것이 T1의 팀워크입니다!' : 'The moment @ChartWizard took a loss, @CryptoKing immediately moved to cover! That\'s the teamwork of T1!' },
];

export function TeamBattleSlide({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full h-full bg-transparent border-none shadow-none p-2">
      <CardHeader className="p-0 mb-3 text-center">
        <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={team1.avatar} alt={team1.name} />
                    <AvatarFallback>{team1.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xl font-bold">{team1.name}</span>
            </div>
            <Swords className="w-6 h-6 text-muted-foreground"/>
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{team2.name}</span>
                 <Avatar className="w-8 h-8">
                    <AvatarImage src={team2.avatar} alt={team2.name} />
                    <AvatarFallback>{team2.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
        </div>
        <p className="text-sm text-primary font-semibold mt-1">{lang === 'ko' ? '주간 라이벌 매치' : 'Weekly Rival Match'}</p>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-5 gap-4">
        <div className="col-span-3 space-y-3">
            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-lg font-bold text-green-400">{team1.totalPnl}</p>
                    <p className="text-xs text-muted-foreground">{lang === 'ko' ? '총 PNL' : 'Total PNL'}</p>
                </div>
                <div>
                    <p className="text-lg font-bold text-green-400">{team2.totalPnl}</p>
                    <p className="text-xs text-muted-foreground">{lang === 'ko' ? '총 PNL' : 'Total PNL'}</p>
                </div>
            </div>

            {/* Members Contribution */}
            <div>
                <h4 className="text-sm font-semibold mb-2 text-center">{lang === 'ko' ? '팀원 기여도' : 'Member Contribution'}</h4>
                <div className="space-y-2">
                    {team1.members.map(member => (
                        <div key={member.name} className="flex items-center gap-2 text-xs">
                            <Avatar className="w-5 h-5"><AvatarImage src={member.avatar} /></Avatar>
                            <span className="w-20 truncate">{member.name}</span>
                            <Progress value={member.contribution} className="w-full h-2" />
                            <span className="w-12 text-right font-mono">{member.contribution}%</span>
                        </div>
                    ))}
                </div>
                <div className="my-2 border-t border-dashed border-border"></div>
                <div className="space-y-2">
                    {team2.members.map(member => (
                        <div key={member.name} className="flex items-center gap-2 text-xs">
                            <Avatar className="w-5 h-5"><AvatarImage src={member.avatar} /></Avatar>
                            <span className="w-20 truncate">{member.name}</span>
                            <Progress value={member.contribution} className="w-full h-2 [&>div]:bg-red-500" />
                            <span className="w-12 text-right font-mono">{member.contribution}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {/* AI Live Commentary */}
        <div className="col-span-2">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary"/>
                {lang === 'ko' ? 'AI 팀전 해설' : 'AI Team Commentary'}
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground bg-background/50 p-2 rounded-lg h-[150px] overflow-y-auto">
                {teamCommentary(lang).map((item, index) => (
                    <div key={index} className="p-2 rounded-md bg-black/20">
                        <p className="mb-1">{item.text}</p>
                        <p className="text-[10px] text-right opacity-70">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
} 