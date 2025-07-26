'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Trophy, 
  Target, 
  Zap, 
  Shield, 
  Activity,
  BarChart3,
  Users,
  Award,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
  Clock,
  Timer,
  Gamepad2,
  Crown,
  Medal,
  Gift,
  Calendar,
  AlertTriangle,
  TrendingUp as TrendingUpIcon,
  Sparkles,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { VolatilityGauge } from '@/components/volatility-gauge';
import { HeroAnimation } from '@/components/hero-animation';

export function HomePage({ lang }: { lang: 'en' | 'ko' }) {
  const [showHero, setShowHero] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [volatilityLevel, setVolatilityLevel] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 15, seconds: 30 });

  useEffect(() => {
    // Hero 애니메이션
    const timer1 = setTimeout(() => setShowHero(true), 500);
    const timer2 = setTimeout(() => setShowDemo(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    // Volatility 레벨 애니메이션
    const interval = setInterval(() => {
      setVolatilityLevel(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 카운트다운 타이머
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getVolatilityData = () => {
    const levels = [
      { level: lang === 'ko' ? '낮음' : 'Low', value: 25, color: 'from-green-500 to-green-400', bgColor: 'bg-green-500' },
      { level: lang === 'ko' ? '보통' : 'Medium', value: 50, color: 'from-yellow-500 to-yellow-400', bgColor: 'bg-yellow-500' },
      { level: lang === 'ko' ? '높음' : 'High', value: 75, color: 'from-orange-500 to-orange-400', bgColor: 'bg-orange-500' },
      { level: lang === 'ko' ? '매우 높음' : 'Very High', value: 95, color: 'from-red-500 to-red-400', bgColor: 'bg-red-500' }
    ];
    return levels[volatilityLevel];
  };

  const volatilityData = getVolatilityData();

  const quickFeatures = [
    {
      icon: <Trophy className="w-5 h-5" />,
      title: lang === 'ko' ? '실시간 랭킹' : 'Live Rankings',
      description: lang === 'ko' ? '실시간 성과 추적' : 'Real-time performance tracking'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: lang === 'ko' ? '빠른 거래' : 'Quick Trading',
      description: lang === 'ko' ? '원클릭 거래 실행' : 'One-click trading'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: lang === 'ko' ? '안전한 거래' : 'Safe Trading',
      description: lang === 'ko' ? '리스크 관리 도구' : 'Risk management tools'
    }
  ];

  const keyBenefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: lang === 'ko' ? '게임화된 경험' : 'Gamified Experience',
      description: lang === 'ko' ? '레벨업, 업적, 랭킹으로 거래를 재미있게' : 'Make trading fun with levels, achievements, and rankings',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: lang === 'ko' ? '실시간 시장 분석' : 'Real-time Market Analysis',
      description: lang === 'ko' ? '변동성 게이지와 시장 지표로 최적의 타이밍 포착' : 'Capture optimal timing with volatility gauge and market indicators',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: lang === 'ko' ? '실전 대회' : 'Real Competitions',
      description: lang === 'ko' ? 'FOMC, CPI 등 이벤트 기반 실전 투자 대회' : 'Real trading competitions based on events like FOMC, CPI',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section - Simplified */}
      <section className="relative w-full h-screen flex justify-center overflow-hidden pt-32">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <HeroAnimation />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center gap-12 text-center">
            {/* Top section: Headline & CTA */}
            <div className={`max-w-3xl transition-all duration-1000 ${
              showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {lang === 'ko' ? '게이머와 트레이더를 위한 궁극의 필드' : 'The Ultimate Arena for Gamers & Traders'}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {lang === 'ko' ? '시장의 리듬을 정복하라' : 'Conquer the Rhythm of the Market'}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {lang === 'ko' ? '변동성은 단순한 데이터가 아니라, 당신의 다음 레벨입니다. Coinmap의 랭킹 시스템과 실시간 게이지로 시장의 흐름을 지배하세요.' : "Volatility isn't just data; it's your next level. Dominate the market's flow with Coinmap's ranking system and live gauges."}
                </p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20">
                  <Play className="w-5 h-5 mr-2" />
                  {lang === 'ko' ? '게임 시작하기' : 'Enter the Arena'}
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  {lang === 'ko' ? '플레이 방법 보기' : 'How to Play'}
                </Button>
              </div>
            </div>

            {/* Bottom section: Live Demos */}
            <div className={`w-full max-w-5xl transition-all duration-1000 delay-500 ${
              showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-2xl shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        <span>{lang === 'ko' ? '실시간 변동성 게이지' : 'Live Volatility Gauge'}</span>
                      </div>
                      <Badge variant="destructive" className="animate-pulse">
                        {volatilityData.level}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VolatilityGauge lang={lang} />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-2xl shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      {lang === 'ko' ? '다음 랭크 게임' : 'Next Ranked Game'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Auto-Join Events */}
                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{lang === 'ko' ? '주요 경제 지표' : 'Key Economic Indicators'}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                        <p className="text-sm font-semibold">{lang === 'ko' ? '12월 FOMC' : 'December FOMC'}</p>
                        <Badge variant="secondary" className="text-xs">{lang === 'ko' ? '자동 참가' : 'Auto-join'}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                        <p className="text-sm font-semibold">{lang === 'ko' ? '12월 CPI 발표' : 'CPI Release'}</p>
                        <Badge variant="secondary" className="text-xs">{lang === 'ko' ? '자동 참가' : 'Auto-join'}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                        <p className="text-sm font-semibold">{lang === 'ko' ? '비농업고용지수' : 'Non-Farm Payroll'}</p>
                        <Badge variant="secondary" className="text-xs">{lang === 'ko' ? '자동 참가' : 'Auto-join'}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                        <p className="text-sm font-semibold">{lang === 'ko' ? '생산자물가지수 (PPI)' : 'Producer Price Index (PPI)'}</p>
                        <Badge variant="secondary" className="text-xs">{lang === 'ko' ? '자동 참가' : 'Auto-join'}</Badge>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{lang === 'ko' ? '특별 토너먼트' : 'Special Tournaments'}</p>
                    </div>

                    {/* Special Events */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                        <div>
                          <p className="text-sm font-semibold text-blue-400">{lang === 'ko' ? '주말 변동성 사냥' : 'Weekend Volatility Hunt'}</p>
                          <p className="text-xs text-muted-foreground">{lang === 'ko' ? '매주' : 'Weekly'}: <span className="text-blue-400 font-bold">$10,000</span></p>
                        </div>
                        <Button size="sm" variant="outline" className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300">
                          {lang === 'ko' ? '참가' : 'Join'}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
                        <div>
                          <p className="text-sm font-semibold text-purple-400">{lang === 'ko' ? '2025년 12월 매억남 챔피언십' : 'Dec 2025 MUN Championship'}</p>
                          <p className="text-xs text-muted-foreground">{lang === 'ko' ? '총 상금' : 'Total Prize'}: <span className="text-purple-400 font-bold">$250,000</span></p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          {lang === 'ko' ? '사전 등록' : 'Pre-register'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {lang === 'ko' ? '경험의 차이를 만들다' : 'An Unfair Advantage'}
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              {lang === 'ko' ? 'Coinmap은 단순한 거래 플랫폼이 아닙니다. 시장의 모든 움직임을 당신의 승리로 바꾸는 강력한 무기입니다.' : 'Coinmap is more than a trading platform. It’s an arsenal of powerful tools designed to turn every market move into your victory.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="group relative p-8 rounded-2xl bg-card/50 border border-border/20 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                 <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(benefit.icon, { className: 'w-8 h-8' })}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {lang === 'ko' ? '게임의 법칙' : 'The Rules of the Game'}
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              {lang === 'ko' ? '승리를 위한 간단한 3단계 가이드.' : 'A simple, three-step guide to victory.'}
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Step 1: Normal Trading */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <Badge>{lang === 'ko' ? '1단계' : 'Step 1'}</Badge>
                <h3 className="text-3xl font-bold mt-4 mb-4">{lang === 'ko' ? '시즌 점수 누적' : 'Accumulate Season Score'}</h3>
                <p className="text-muted-foreground text-lg">
                  {lang === 'ko' ? '평상시에는 일반 모드에서 거래하며 시즌 랭킹을 위한 포인트를 꾸준히 쌓습니다. 모든 거래가 당신의 최종 순위에 기여합니다.' : 'During normal periods, trade in Normal Mode to consistently build points for your season ranking. Every trade contributes to your final standing.'}
                </p>
              </div>
              <div className="relative h-64 flex items-center justify-center">
                 <div className="absolute w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                 <Trophy className="w-24 h-24 text-blue-500 relative z-10"/>
              </div>
            </div>

            {/* Step 2: Ranked Mode */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-64 flex items-center justify-center md:order-2">
                 <div className="absolute w-48 h-48 bg-red-500/10 rounded-full blur-2xl"></div>
                 <Zap className="w-24 h-24 text-red-500 relative z-10"/>
              </div>
              <div className="text-center md:text-left md:order-1">
                <Badge>{lang === 'ko' ? '2단계' : 'Step 2'}</Badge>
                <h3 className="text-3xl font-bold mt-4 mb-4">{lang === 'ko' ? '랭크 게임 참전' : 'Enter Ranked Games'}</h3>
                <p className="text-muted-foreground text-lg">
                  {lang === 'ko' ? '주요 경제 지표 발표와 같은 높은 변동성 기간에는 자동으로 랭크 게임이 시작됩니다. 이 기간 동안의 성과는 시즌 점수에 큰 영향을 미칩니다.' : 'During periods of high volatility, like major economic announcements, Ranked Games will automatically begin. Performance during these games has a major impact on your season score.'}
                </p>
              </div>
            </div>

            {/* Step 3: Championship */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <Badge>{lang === 'ko' ? '3단계' : 'Step 3'}</Badge>
                <h3 className="text-3xl font-bold mt-4 mb-4">{lang === 'ko' ? '챔피언십 도전' : 'Challenge for the Championship'}</h3>
                <p className="text-muted-foreground text-lg">
                  {lang === 'ko' ? '시즌이 끝나면 상위 랭커들이 최종 챔피언십에 진출하여 막대한 상금을 놓고 경쟁합니다. 최고의 트레이더가 될 준비가 되셨나요?' : 'At the end of the season, top-ranked players will advance to the final Championship to compete for massive prizes. Are you ready to become the best?'}
                </p>
              </div>
              <div className="relative h-64 flex items-center justify-center">
                 <div className="absolute w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                 <Crown className="w-24 h-24 text-purple-500 relative z-10"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              {lang === 'ko' ? '지금, 당신의 실력을 증명하세요' : 'Your Arena Awaits'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {lang === 'ko' ? '지금 바로 가입하여 랭킹에 이름을 올리고, 변동성의 리듬을 정복하세요.' : 'Join now to get on the leaderboard, conquer the rhythm of volatility, and prove your skill.'}
          </p>
          <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 scale-105 hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 mr-2" />
            {lang === 'ko' ? '무료로 게임 시작' : 'Enter the Game for Free'}
          </Button>
        </div>
      </section>
    </div>
  );
} 