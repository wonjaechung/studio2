'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

const whaleTrades = [
  {
    address: '0x5d83...4fb6',
    symbol: 'BTC',
    side: 'Long',
    positionUsd: '1,250,432.10',
    positionCoin: '18.45',
    entryPrice: '67,774.00',
    liqPrice: '61,234.50',
    margin: '125,043.21',
    pnl: '+24,567.80',
    leverage: '10x',
    type: 'Isolated',
    tradePrice: '68,102.30',
    timestamp: '2m ago',
  },
  {
    address: '0x20c2...44f5',
    symbol: 'ETH',
    side: 'Short',
    positionUsd: '850,212.50',
    positionCoin: '239.50',
    entryPrice: '3,550.00',
    liqPrice: '3,890.10',
    margin: '170,042.50',
    pnl: '-5,123.45',
    leverage: '5x',
    type: 'Cross',
    tradePrice: '3,541.50',
    timestamp: '5m ago',
  },
    {
    address: '0xfae9...3571',
    symbol: 'SOL',
    side: 'Long',
    positionUsd: '550,000.00',
    positionCoin: '3,353.65',
    entryPrice: '164.00',
    liqPrice: '148.50',
    margin: '55,000.00',
    pnl: '+12,321.00',
    leverage: '10x',
    type: 'Isolated',
    tradePrice: '165.20',
    timestamp: '12m ago',
  },
  {
    address: '0x77c3...5e45',
    symbol: 'BTC',
    side: 'Short',
    positionUsd: '2,100,000.00',
    positionCoin: '31.00',
    entryPrice: '67,741.93',
    liqPrice: '72,500.00',
    margin: '420,000.00',
    pnl: '+5,800.00',
    leverage: '5x',
    type: 'Cross',
    tradePrice: '67,500.00',
    timestamp: '28m ago',
  },
    {
    address: '0x9794...333b',
    symbol: 'ETH',
    side: 'Long',
    positionUsd: '750,000.00',
    positionCoin: '211.26',
    entryPrice: '3,550.00',
    liqPrice: '3,200.00',
    margin: '75,000.00',
    pnl: '-2,500.00',
    leverage: '10x',
    type: 'Isolated',
    tradePrice: '3,530.00',
    timestamp: '45m ago',
  },
];

export function HyperliquidTracker() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-dashed">
        <CardHeader>
            <CardTitle className="font-headline">Recent Large Trades</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Side</TableHead>
                <TableHead className="text-right">Position (USD)</TableHead>
                <TableHead className="text-right">Entry Price</TableHead>
                <TableHead className="text-right">Liq. Price</TableHead>
                <TableHead className="text-right">Unrealised PnL</TableHead>
                <TableHead>Leverage</TableHead>
                <TableHead>Timestamp</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {whaleTrades.map((trade, index) => (
                <TableRow key={index}>
                <TableCell className="font-code text-accent hover:underline cursor-pointer">{trade.address}</TableCell>
                <TableCell>{trade.symbol}</TableCell>
                <TableCell>
                    <Badge variant={trade.side === 'Long' ? 'default' : 'destructive'} className={trade.side === 'Long' ? 'bg-green-600/80' : 'bg-red-600/80'}>
                    {trade.side}
                    </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">${trade.positionUsd}</TableCell>
                <TableCell className="text-right font-code">${trade.entryPrice}</TableCell>
                <TableCell className="text-right font-code">${trade.liqPrice}</TableCell>
                <TableCell className={`text-right font-medium ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl}
                </TableCell>
                <TableCell>{trade.leverage} {trade.type}</TableCell>
                <TableCell className="text-muted-foreground">{trade.timestamp}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </CardContent>
    </Card>
  );
}
