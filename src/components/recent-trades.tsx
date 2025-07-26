import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentTrades({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lang === 'ko' ? '최근 거래' : 'Recent Trades'}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for recent trades list */}
        <p className="text-sm text-muted-foreground">
          {lang === 'ko' ? '최근 거래 내역이 여기에 표시됩니다.' : 'Recent trades list will be displayed here.'}
        </p>
      </CardContent>
    </Card>
  );
} 