'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const liquidationStats = [
    { period: '1H', total: '$7.43M', longs: '$4.13M', shorts: '$3.29M' },
    { period: '4H', total: '$26.84M', longs: '$11.46M', shorts: '$15.38M' },
    { period: '12H', total: '$101.84M', longs: '$41.46M', shorts: '$60.38M' },
    { period: '1D', total: '$315.27M', longs: '$202.72M', shorts: '$112.54M' },
];

const recentLiquidations = [
    { exchange: 'Binance', symbol: 'ETHUSDT', side: 'Shorts', amount: '$3.97M', time: '07-23 08:34' },
    { exchange: 'Bybit', symbol: 'ETHUSD', side: 'Longs', amount: '$1.92M', time: '07-22 17:07' },
    { exchange: 'Bybit', symbol: 'ETHUSD', side: 'Longs', amount: '$1.89M', time: '07-22 13:59' },
    { exchange: 'OKX', symbol: 'BTCUSDT', side: 'Shorts', amount: '$1.55M', time: '07-23 01:15' },
    { exchange: 'dYdX', symbol: 'SOLUSD', side: 'Longs', amount: '$1.21M', time: '07-22 22:40' },
];

const heatmapData = [
    { symbol: 'SPK', amount: '1.58M', color: 'bg-red-500/80', size: 'col-span-3 row-span-2' },
    { symbol: 'ETH', amount: '750.35K', color: 'bg-green-500/80', size: 'col-span-2 row-span-2' },
    { symbol: 'BTC', amount: '1.08M', color: 'bg-green-500/80', size: 'col-span-3 row-span-2' },
    { symbol: 'ENA', amount: '690.96K', color: 'bg-green-500/80', size: 'col-span-2 row-span-2' },
    { symbol: 'Others', amount: '603.94K', color: 'bg-green-500/80', size: 'col-span-2' },
    { symbol: 'PENGU', amount: '387.81K', color: 'bg-green-500/80', size: 'col-span-1' },
    { symbol: 'SOL', amount: '336.58K', color: 'bg-green-500/80', size: 'col-span-2' },
    { symbol: 'XRP', amount: '110.11K', color: 'bg-green-500/80', size: '' },
    { symbol: 'ZORA', amount: '106.56K', color: 'bg-red-500/80', size: '' },
    { symbol: 'SAHARA', amount: '102.51K', color: 'bg-red-500/80', size: '' },
    { symbol: 'DOGE', amount: '90.84K', color: 'bg-green-500/80', size: '' },
];

export function LiquidationTracker() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {liquidationStats.map(stat => (
            <Card key={stat.period} className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-full">{stat.period}</span>
                  <span className="font-bold text-lg">{stat.total}</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-green-400">Longs</span>
                    <span>{stat.longs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-400">Shorts</span>
                    <span>{stat.shorts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center px-4">
            In the past 24 hours, <span className="font-bold text-foreground">115,602</span> traders were liquidated. The total liquidations comes in at <span className="font-bold text-accent">$315.27M</span>
        </p>
        <Card className="bg-card/50 backdrop-blur-sm border-dashed">
            <CardContent className="pt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Exchange</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Side</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentLiquidations.map((tx, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{tx.exchange}</TableCell>
                                <TableCell>{tx.symbol}</TableCell>
                                <TableCell className={tx.side === 'Longs' ? 'text-green-400' : 'text-red-400'}>{tx.side}</TableCell>
                                <TableCell className="text-right font-medium">{tx.amount}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{tx.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="bg-card/50 backdrop-blur-sm h-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-headline">Liquidation Heatmap</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="btc">BTC</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center bg-muted p-0.5 rounded-md">
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-3 bg-background">1H</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-3">4H</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-3">12H</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-3">1D</Button>
                </div>
                 <div className="flex items-center bg-muted p-0.5 rounded-md">
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-3 bg-background">Symbol</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-3">Exchange</Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 grid-rows-4 gap-1 h-[500px] text-white font-bold">
              {heatmapData.map((item, index) => (
                <div key={index} className={`${item.color} ${item.size} rounded-md flex flex-col items-center justify-center p-2 text-center`}>
                    <span className="text-xl">{item.symbol}</span>
                    <span className="text-lg">{item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
