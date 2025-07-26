import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Zap, AlertTriangle, Target, Trophy } from 'lucide-react';

const achievements = [
  {
    icon: Target,
    title: "First Million",
    description: "첫 100만 달러 거래 달성",
    progress: 100,
    max: 100,
    isCompleted: true,
  },
  {
    icon: ShieldCheck,
    title: "Risk Master",
    description: "연속 10일 리스크 관리 우수",
    progress: 7,
    max: 10,
  },
  {
    icon: Zap,
    title: "Speed Trader",
    description: "1분 내 10회 거래 성공",
    progress: 6,
    max: 10,
  },
  {
    icon: AlertTriangle,
    title: "Volatility Warrior",
    description: "높은 변동성에서 5회 연속 수익",
    progress: 3,
    max: 5,
  },
];

export const AchievementSystem = ({ lang }: { lang: 'en' | 'ko' }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <span>{lang === 'ko' ? '업적 시스템' : 'Achievement System'}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {lang === 'ko' ? '거래 성과에 따른 업적을 달성하세요' : 'Complete achievements based on your trading performance'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((ach, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              ach.isCompleted 
                ? 'bg-primary/10 border-primary/30' 
                : 'bg-card/50 border-border/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                ach.isCompleted ? 'bg-primary/20' : 'bg-background'
              }`}>
                <ach.icon className={`w-5 h-5 ${ach.isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{ach.title}</p>
                <p className="text-xs text-muted-foreground">{ach.description}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold">{lang === 'ko' ? '진행도' : 'Progress'}</span>
                <span className="text-xs text-muted-foreground">{ach.progress}/{ach.max}</span>
              </div>
              <Progress value={(ach.progress / ach.max) * 100} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}; 