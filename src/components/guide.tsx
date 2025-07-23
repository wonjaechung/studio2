
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Gamepad2, Swords, Trophy, Users, Video } from 'lucide-react';

const guideSteps = [
  {
    icon: Activity,
    title: '1. 변동성 게이지를 확인하세요',
    description: '시장의 긴장감을 나타내는 심장박동입니다. 게이지가 높아질수록 시장의 변동성이 커지며, 랭크 게임 시작이 가까워졌음을 의미합니다.',
  },
  {
    icon: Swords,
    title: '2. 랭크 게임에 참여하세요',
    description: '변동성 게이지가 폭발하면 랭크 게임이 시작됩니다! 시즌제로 운영되며, 티어는 수익률뿐만 아니라 안정성과 같은 지표로 결정됩니다.',
  },
    {
    icon: Trophy,
    title: '3. 티어를 획득하고 증명하세요',
    description: '브론즈부터 챌린저까지, 당신의 트레이딩 실력을 증명하세요. 시즌 종료 시 특별한 보상이 기다립니다.',
  },
  {
    icon: Gamepad2,
    title: '4. 일반 모드에서 연습하세요',
    description: '랭크 게임이 아닐 때는 일반 모드에서 자유롭게 트레이딩 전략을 테스트하고 실력을 갈고 닦을 수 있습니다.',
  },
  {
    icon: Video,
    title: '5. 경기를 관람하고 배우세요',
    description: 'AI 캐스터가 24/7 시장 상황과 랭크 게임을 중계합니다. 상위 랭커들의 경기를 보며 전략을 배우세요.',
  },
  {
    icon: Users,
    title: '6. 커뮤니티와 함께하세요',
    description: '당신은 혼자가 아닙니다. 다른 플레이어들과 전략을 공유하고 경쟁하며 함께 성장하는 e-스포츠 리그의 일원이 되세요.',
  },
];

export function Guide() {
  return (
    <section id="guide">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-blue-400">
                TradeOS: 게임 방법
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                e-스포츠 리그에 오신 것을 환영합니다! 이곳은 당신이 선수가 되는 곳입니다.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideSteps.map((step, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-dashed hover:border-solid hover:border-accent transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="bg-accent/20 p-3 rounded-full">
                           <step.icon className="w-8 h-8 text-accent" />
                        </div>
                        <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </section>
  );
}
