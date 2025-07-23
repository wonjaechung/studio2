
'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const whaleTrades = [
  {
    address: '0x5d83...4fb6',
    symbol: 'BTC',
    side: 'Long',
    positionUsd: '1,250,432.10',
    entryPrice: '67,774.00',
    liqPrice: '61,234.50',
    pnl: '+24,567.80',
    leverage: '10x',
    type: 'Isolated',
    timestamp: '2m ago',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'crypto bitgo',
    tag: 'Position Increase',
    tagVariant: 'secondary'
  },
  {
    address: '0x20c2...44f5',
    symbol: 'ETH',
    side: 'Short',
    positionUsd: '850,212.50',
    entryPrice: '3,550.00',
    liqPrice: '3,890.10',
    pnl: '-5,123.45',
    leverage: '5x',
    type: 'Cross',
    timestamp: '5m ago',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'anonymous whale',
    tag: 'New High-Risk Short',
    tagVariant: 'destructive'
  },
    {
    address: '0xfae9...3571',
    symbol: 'SOL',
    side: 'Long',
    positionUsd: '550,000.00',
    entryPrice: '164.00',
    liqPrice: '148.50',
    pnl: '+12,321.00',
    leverage: '10x',
    type: 'Isolated',
    timestamp: '12m ago',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'solana coin',
    tag: 'Investment Opportunity',
    tagVariant: 'default'
  },
];

export function HyperliquidTracker() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-dashed">
        <CardHeader>
            <CardTitle className="font-headline">Hyperliquid Whale Feed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Key Wallet Signals</h3>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="bg-accent/50">All</Button>
                    <Button variant="ghost" size="sm">High Risk</Button>
                    <Button variant="ghost" size="sm">Warning Sign</Button>
                    <Button variant="ghost" size="sm">Investment Opportunity</Button>
                </div>
            </div>
            <div className="space-y-4">
                {whaleTrades.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <Avatar>
                        <AvatarImage src={tx.logo} data-ai-hint={tx.dataAiHint} />
                        <AvatarFallback>{tx.address.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="font-semibold">
                            {tx.address}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{tx.timestamp}</span>
                            <Badge variant={tx.tagVariant as any}>{tx.tag}</Badge>
                        </div>
                        </div>
                    </div>
                    <div>
                      <p className={`font-mono text-lg text-right ${tx.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.side} {tx.symbol} {tx.pnl}
                      </p>
                      <p className="text-sm text-muted-foreground text-right">
                        Value: ${tx.positionUsd}
                      </p>
                    </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  );
}

