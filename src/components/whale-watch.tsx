'use client';

import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const transactions = [
  {
    from: 'World Liberty Fi',
    to: 'Anonymous',
    amount: '399,957.00 USD1',
    action: 'Withdrawal',
    time: '3 weeks ago',
    tag: 'Investment Opportunity',
    tagVariant: 'secondary',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'world liberty',
  },
  {
    from: 'BitGo',
    to: 'World Liberty Fi',
    amount: '500,000.00 USD1',
    action: 'Deposit',
    time: '3 weeks ago',
    tag: 'Warning Sign',
    tagVariant: 'destructive',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'crypto bitgo',
  },
  {
    from: 'Anonymous',
    to: 'World Liberty Fi',
    amount: '16,349,597.87 aEthUSDC',
    action: 'Deposit',
    time: '1 month ago',
    tag: 'Warning Sign',
    tagVariant: 'destructive',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'world liberty',
  },
  {
    from: 'World Liberty Fi',
    to: 'Anonymous',
    amount: '7,499,955.00 USD1',
    action: 'Withdrawal',
    time: '1 month ago',
    tag: 'Investment Opportunity',
    tagVariant: 'secondary',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'world liberty',
  },
  {
    from: 'BitGo',
    to: 'World Liberty Fi',
    amount: '7,500,000.00 USD1',
    action: 'Deposit',
    time: '1 month ago',
    tag: 'Warning Sign',
    tagVariant: 'destructive',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'crypto bitgo',
  },
  {
    from: 'World Liberty Fi',
    to: 'Aave',
    amount: '17,664,188.36 WBTC',
    action: 'Withdrawal',
    time: '1 month ago',
    tag: 'Warning Sign',
    tagVariant: 'destructive',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'world liberty',
  },
];

type TagVariant = 'default' | 'secondary' | 'destructive' | 'outline' | null | undefined;

export function WhaleWatch() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-dashed">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium font-headline">Key Wallet Signals</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="bg-accent/50">All</Button>
            <Button variant="ghost" size="sm">High Risk</Button>
            <Button variant="ghost" size="sm">Warning Sign</Button>
            <Button variant="ghost" size="sm">Investment Opportunity</Button>
          </div>
        </div>
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={tx.logo} data-ai-hint={tx.dataAiHint} />
                  <AvatarFallback>{tx.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {tx.action === 'Withdrawal'
                      ? <><span className="font-normal">Withdrawal of </span>{tx.amount}<span className="font-normal"> from </span>{tx.from}<span className="font-normal"> to </span>{tx.to}</>
                      : <><span className="font-normal">Deposit of </span>{tx.amount}<span className="font-normal"> from </span>{tx.from}<span className="font-normal"> to </span>{tx.to}</>
                    }
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{tx.time}</span>
                    <Badge variant={tx.tagVariant as TagVariant}>{tx.tag}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">Quote</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
