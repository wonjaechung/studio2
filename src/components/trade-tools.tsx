import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, DollarSign, Settings } from 'lucide-react';

export function TradeTools({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full bg-background/50 p-4 h-full flex flex-col">
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-base">{lang === 'ko' ? '거래 도구' : 'Trade Tools'}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col justify-around">
        <Button variant="outline" className="w-full justify-start">
          <Target className="w-4 h-4 mr-2" />
          <span className="whitespace-nowrap">{lang === 'ko' ? 'TP/SL 설정' : 'TP/SL Settings'}</span>
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <DollarSign className="w-4 h-4 mr-2" />
          <span className="whitespace-nowrap">{lang === 'ko' ? '포지션 계산기' : 'Position Calculator'}</span>
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          <span className="whitespace-nowrap">{lang === 'ko' ? '거래 설정' : 'Trade Settings'}</span>
        </Button>
      </CardContent>
    </Card>
  );
} 