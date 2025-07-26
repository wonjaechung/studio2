import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Crown } from 'lucide-react';

const whaleLeaderboard = [
  { rank: 1, address: '0x...a4bC', pnl: 2450000 },
  { rank: 2, address: '0x...dE8f', pnl: 1890000 },
  { rank: 3, address: '0x...bC1d', pnl: 1210000 },
  { rank: 4, address: '0x...fG9a', pnl: 980000 },
  { rank: 5, address: '0x...h3Jk', pnl: 850000 },
];

const transactions = [
  { from: 'Trump Foundation', to: 'MetaMask', amount: '1,200 ETH' },
  { from: 'JP Morgan', to: 'Coinbase', amount: '250 BTC' },
  { from: 'a16z', to: 'FalconX', amount: '15.M USDC' },
  { from: 'GSR Markets', to: 'Bybit', amount: '2.1M WIF' },
];

export function WhaleAnalysisSlide({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg">{lang === 'ko' ? '고래 분석' : 'Whale Analysis'}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-2 gap-6">
        {/* Leaderboard */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">{lang === 'ko' ? 'Hyperliquid 리더보드' : 'Hyperliquid Leaderboard'}</h3>
          {whaleLeaderboard.map((whale, index) => (
            <div key={whale.rank} className={`p-2 rounded-lg flex items-center gap-3 ${index === 0 ? 'bg-yellow-500/10' : 'bg-background/50'}`}>
              <div className="flex items-center justify-center w-5 font-bold">
                {index === 0 ? <Crown className="w-4 h-4 text-yellow-400" /> : whale.rank}
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs">{whale.address}</p>
              </div>
              <p className="font-bold text-xs text-green-400">+${whale.pnl.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">{lang === 'ko' ? '주요 기관 자금 흐름' : 'Major Fund Flows'}</h3>
          {transactions.map((tx, index) => (
            <div key={index} className="p-2 rounded-lg bg-background/50 flex flex-col justify-center h-[3.1rem]">
              <div className="flex items-center justify-between text-xs">
                <span>{tx.from}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />
                <span>{tx.to}</span>
              </div>
              <p className="font-bold text-center text-primary mt-1">{tx.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 