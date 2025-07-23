
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Gamepad2, Swords, Trophy, Users, Video, SlidersHorizontal, BarChart2, DollarSign, Bitcoin, Waves } from 'lucide-react';
import { Separator } from './ui/separator';

const content = {
  en: {
    mainTitle: 'TradeOS: How to Play',
    mainDescription: 'Welcome to the e-Sports League! This is where you become the player.',
    gaugeTitle: 'What is the Volatility Gauge?',
    gaugeDescription: 'This is TradeOS\'s proprietary on-chart indicator that quantifies the psychological state of market participants—fear and greed—by synthesizing various data points and displaying them visually on the chart.',
    logicTitle: 'Key Calculation Logic',
    logicDescription: 'The F&G index is calculated comprehensively by normalizing the five main indicators below and applying user-defined weights.',
  },
  ko: {
    mainTitle: 'TradeOS: 게임 방법',
    mainDescription: 'e-스포츠 리그에 오신 것을 환영합니다! 이곳은 당신이 선수가 되는 곳입니다.',
    gaugeTitle: '변동성 게이지란?',
    gaugeDescription: '이 지표는 여러 데이터를 종합하여 시장 참여자들의 심리 상태, 즉 공포(Fear)와 탐욕(Greed)을 계량화하여 차트 위에 직접 시각적으로 표시해주는 TradeOS의 독자적인 온차트(On-Chart) 지표입니다.',
    logicTitle: '주요 계산 로직',
    logicDescription: 'F&G 지수는 아래 5가지 주요 지표를 정규화하고, 사용자 설정 가중치를 적용하여 종합적으로 계산됩니다.',
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
  {
    icon: Video,
    title: lang === 'ko' ? '5. 경기를 관람하고 배우세요' : '5. Watch and Learn from Matches',
    description: lang === 'ko' ? 'AI 캐스터가 24/7 시장 상황과 랭크 게임을 중계합니다. 상위 랭커들의 경기를 보며 전략을 배우세요.' : 'An AI caster broadcasts market situations and ranked games 24/7. Learn strategies by watching top rankers\' matches.',
  },
  {
    icon: Users,
    title: lang === 'ko' ? '6. 커뮤니티와 함께하세요' : '6. Join the Community',
    description: lang === 'ko' ? '당신은 혼자가 아닙니다. 다른 플레이어들과 전략을 공유하고 경쟁하며 함께 성장하는 e-스포츠 리그의 일원이 되세요.' : 'You are not alone. Become a member of an e-sports league where you share strategies, compete, and grow with other players.',
  },
];

const gaugeComponents = (lang: 'en' | 'ko') => [
  {
    icon: SlidersHorizontal,
    title: lang === 'ko' ? '가격-이동평균 이격도' : 'Price-MA Divergence',
    description: lang === 'ko' ? '현재 가격이 장기 이동평균선과 얼마나 떨어져 있는지 측정합니다.' : 'Measures how far the current price is from the long-term moving average.',
  },
  {
    icon: BarChart2,
    title: lang === 'ko' ? '수익률' : 'Rate of Return',
    description: lang === 'ko' ? '특정 기간 동안의 가격 변화율을 측정합니다.' : 'Measures the rate of price change over a specific period.',
  },
  {
    icon: DollarSign,
    title: lang === 'ko' ? '자금 흐름' : 'Money Flow',
    description: lang === 'ko' ? '거래량을 동반한 가격 움직임을 통해 자금의 유입 및 유출 강도를 측정합니다.' : 'Measures the strength of fund inflows and outflows through price movements accompanied by trading volume.',
  },
  {
    icon: Waves,
    title: lang === 'ko' ? '변동성 (ATR)' : 'Volatility (ATR)',
    description: lang === 'ko' ? '시장의 변동성 수준을 측정하며, 변동성이 낮을수록 탐욕 심리가 강한 것으로 간주합니다.' : 'Measures the market\'s volatility level; lower volatility is considered a sign of stronger greed.',
  },
  {
    icon: Bitcoin,
    title: lang === 'ko' ? 'BTC 도미넌스' : 'BTC Dominance',
    description: lang === 'ko' ? '비트코인 도미넌스의 변화율을 통해 알트코인 시장의 상대적인 과열 상태를 측정합니다.' : 'Measures the relative overheating of the altcoin market through changes in Bitcoin dominance.',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <Separator className="my-16" />
        
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent to-purple-400">
                {currentContent.gaugeTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {currentContent.gaugeDescription}
            </p>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="lg:col-span-1 md:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm h-full p-6 flex flex-col justify-center">
                   <h3 className="font-headline text-2xl mb-4 text-accent">{currentContent.logicTitle}</h3>
                   <p className="text-muted-foreground">
                        {currentContent.logicDescription}
                   </p>
                </Card>
            </div>
            {currentGaugeComponents.map((component, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-dashed">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <div className="bg-accent/20 p-2 rounded-full mt-1">
                           <component.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-xl">{component.title}</CardTitle>
                             <p className="text-muted-foreground text-sm pt-2">{component.description}</p>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>

    </section>
  );
}
