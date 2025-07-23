
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Gamepad2, Swords, Trophy, Users, Video, SlidersHorizontal, BarChart2, DollarSign, Bitcoin, Waves, Info, Newspaper, BookOpen } from 'lucide-react';
import { Separator } from './ui/separator';
import { VolatilityGauge } from './volatility-gauge';
import { Button } from './ui/button';

const content = {
  en: {
    mainTitle: 'TradeOS: How to Play',
    mainDescription: 'Welcome to the e-Sports League! This is where you become the player.',
    gaugeTitle: 'What is the Volatility Gauge?',
    gaugeDescription: 'This is TradeOS\'s proprietary on-chart indicator that quantifies the psychological state of market participants—fear and greed—by synthesizing various data points and displaying them visually on the chart.',
    logicTitle: 'Key Calculation Logic',
    logicDescription: 'The F&G index is calculated comprehensively by normalizing the five main indicators below and applying user-defined weights.',
    announcementsTitle: 'Announcements & API Guide',
    whitePaper: 'White Paper',
    announcements: 'Announcements',
    apiGuide: 'API Guide',
  },
  ko: {
    mainTitle: 'TradeOS: 게임 방법',
    mainDescription: 'e-스포츠 리그에 오신 것을 환영합니다! 이곳은 당신이 선수가 되는 곳입니다.',
    gaugeTitle: '변동성 게이지란?',
    gaugeDescription: '이 지표는 여러 데이터를 종합하여 시장 참여자들의 심리 상태, 즉 공포(Fear)와 탐욕(Greed)을 계량화하여 차트 위에 직접 시각적으로 표시해주는 TradeOS의 독자적인 온차트(On-Chart) 지표입니다.',
    logicTitle: '주요 계산 로직',
    logicDescription: 'F&G 지수는 아래 5가지 주요 지표를 정규화하고, 사용자 설정 가중치를 적용하여 종합적으로 계산됩니다.',
    announcementsTitle: '공지사항 & API 가이드',
    whitePaper: '백서',
    announcements: '공지사항',
    apiGuide: 'API 가이드',
  },
};


const guideSteps = (lang: 'en' | 'ko') => [
  {
    icon: Activity,
    title: lang === 'ko' ? '1. 변동성 게이지를 확인하세요' : '1. Check the Volatility Gauge',
    description: lang === 'ko' ? '시장의 긴장감을 나타내는 심장박동입니다. 게이지가 높아질수록 시장의 변동성이 커지며, 랭크 게임 시작이 가까워졌음을 의미합니다.' : 'It\'s the heartbeat that shows market tension. The higher the gauge, the greater the market volatility, signaling that a ranked game is approaching.',
  },
  {
    icon: Swords,
    title: lang === 'ko' ? '2. 랭크 게임에 참여하세요' : '2. Join the Ranked Game',
    description: lang === 'ko' ? '변동성 게이지가 폭발하면 랭크 게임이 시작됩니다! 시즌제로 운영되며, 티어는 수익률뿐만 아니라 안정성과 같은 지표로 결정됩니다.' : 'When the volatility gauge explodes, the ranked game begins! It operates on a seasonal basis, and your tier is determined not just by profit, but by metrics like stability.',
  },
    {
    icon: Trophy,
    title: lang === 'ko' ? '3. 티어를 획득하고 증명하세요' : '3. Earn and Prove Your Tier',
    description: lang === 'ko' ? '브론즈부터 챌린저까지, 당신의 트레이딩 실력을 증명하세요. 시즌 종료 시 특별한 보상이 기다립니다.' : 'From Bronze to Challenger, prove your trading skills. Special rewards await at the end of the season.',
  },
  {
    icon: Gamepad2,
    title: lang === 'ko' ? '4. 일반 모드에서 연습하세요' : '4. Practice in Normal Mode',
    description: lang === 'ko' ? '랭크 게임이 아닐 때는 일반 모드에서 자유롭게 트레이딩 전략을 테스트하고 실력을 갈고 닦을 수 있습니다.' : 'When it\'s not a ranked game, you can freely test your trading strategies and hone your skills in normal mode.',
  },
];

const gaugeComponents = (lang: 'en' | 'ko') => [
  {
    icon: SlidersHorizontal,
    title: lang === 'ko' ? '가격-이동평균 이격도' : 'Price-MA Divergence',
  },
  {
    icon: BarChart2,
    title: lang === 'ko' ? '수익률' : 'Rate of Return',
  },
  {
    icon: DollarSign,
    title: lang === 'ko' ? '자금 흐름' : 'Money Flow',
  },
  {
    icon: Waves,
    title: lang === 'ko' ? '변동성 (ATR)' : 'Volatility (ATR)',
  },
  {
    icon: Bitcoin,
    title: lang === 'ko' ? 'BTC 도미넌스' : 'BTC Dominance',
  }
];

export function Guide({ lang }: { lang: 'en' | 'ko' }) {
  const currentContent = content[lang];
  const currentGuideSteps = guideSteps(lang);
  const currentGaugeComponents = gaugeComponents(lang);
  
  return (
    <section id="guide">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-blue-400">
                {currentContent.mainTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                {currentContent.mainDescription}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                {currentGuideSteps.map((step, index) => (
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
            <div className="space-y-8">
                 <Card className="bg-card/50 backdrop-blur-sm border-dashed p-6">
                    <h3 className="font-headline text-2xl mb-4 text-accent flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      {currentContent.whitePaper}
                    </h3>
                    <p className="text-muted-foreground mb-4">Read our white paper to get a deep-dive on the protocol and the vision.</p>
                     <Button>Read White Paper</Button>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-dashed p-6">
                    <h3 className="font-headline text-2xl mb-4 text-accent flex items-center gap-2">
                      <Newspaper className="w-6 h-6" />
                      {currentContent.announcementsTitle}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="hover:text-foreground cursor-pointer font-semibold text-foreground/90">[Update] v1.2 Patch Notes - New MMR calculation</li>
                        <li className="hover:text-foreground cursor-pointer">[API] How to connect to the MCP API</li>
                        <li className="hover:text-foreground cursor-pointer">[Event] Season 3 start date announced!</li>
                        <li className="hover:text-foreground cursor-pointer">[System] Scheduled maintenance on 2024-08-01</li>
                    </ul>
                </Card>
            </div>
        </div>

        <Separator className="my-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                 <h2 className="text-4xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent to-purple-400 mb-4">
                    {currentContent.gaugeTitle}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    {currentContent.gaugeDescription}
                </p>
                 <Card className="bg-card/50 backdrop-blur-sm p-6 max-w-2xl">
                   <h3 className="font-headline text-2xl mb-4 text-accent">{currentContent.logicTitle}</h3>
                   <p className="text-muted-foreground mb-6">
                        {currentContent.logicDescription}
                   </p>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {currentGaugeComponents.map((component, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="bg-accent/20 p-2 rounded-md">
                                    <component.icon className="w-5 h-5 text-accent" />
                                </div>
                                <span className="font-medium">{component.title}</span>
                            </div>
                        ))}
                   </div>
                </Card>
            </div>
            <div className="mt-12 md:mt-0">
                <VolatilityGauge lang={lang} />
            </div>
        </div>
    </section>
  );
}
