import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, LineChart, Activity, Search } from 'lucide-react';

export function AIAnalysisTeaser({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <span>{lang === 'ko' ? 'AI 기반 분석' : 'AI-Powered Analysis'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {/* AI Pattern Detection */}
        <div className="p-3 rounded-lg bg-background/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LineChart className="w-4 h-4 text-blue-400" />
              <p className="font-semibold text-sm">{lang === 'ko' ? '패턴 감지' : 'Pattern Recognition'}</p>
            </div>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              {lang === 'ko' ? 'BTC/USD 15분봉' : 'BTC/USD 15m'}
            </Badge>
          </div>
          <p className="text-md font-bold text-right mt-1 text-blue-400">
            {lang === 'ko' ? '강세 페넌트 패턴 감지' : 'Bullish Pennant Detected'}
          </p>
        </div>
        
        {/* AI Volatility Prediction */}
        <div className="p-3 rounded-lg bg-background/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-yellow-400" />
              <p className="font-semibold text-sm">{lang === 'ko' ? '변동성 예측' : 'Volatility Forecast'}</p>
            </div>
             <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
              {lang === 'ko' ? '다음 4시간' : 'Next 4 Hours'}
            </Badge>
          </div>
          <p className="text-md font-bold text-right mt-1">
            {lang === 'ko' ? '단기 변동성 급증 확률: ' : 'Spike Probability: '}
            <span className="text-yellow-400">75%</span>
          </p>
        </div>

        {/* Natural Language Query */}
        <div className="p-3 rounded-lg bg-background/50">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-400" />
              <p className="font-semibold text-sm">{lang === 'ko' ? '자연어 쿼리' : 'Natural Language Query'}</p>
            </div>
          </div>
          <div className="flex gap-2 items-start mt-2">
            <div className="w-1/2 p-2 rounded bg-black/20 text-xs font-mono">
              <span className="text-gray-400">&gt; </span> 
              <span className="text-purple-300">Show me weekly active users on Uniswap</span>
            </div>
            <div className="w-1/2 h-20 flex flex-col rounded bg-black/20">
              {/* Mini chart visualization */}
              <div className="flex-grow flex items-end justify-center gap-1 p-2">
                <div className="w-4 h-[40%] bg-purple-400/50 rounded-t-sm" title="Week 1"></div>
                <div className="w-4 h-[60%] bg-purple-400/50 rounded-t-sm" title="Week 2"></div>
                <div className="w-4 h-[80%] bg-purple-400/50 rounded-t-sm" title="Week 3"></div>
                <div className="w-4 h-[50%] bg-purple-400/50 rounded-t-sm" title="Week 4"></div>
              </div>
              <div className="flex-shrink-0 w-full border-t border-purple-400/20">
                <p className="text-xs text-purple-400/70 text-center font-mono p-1">{lang === 'ko' ? '주별 사용자' : 'Users by Week'}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 