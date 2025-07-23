
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Copy, Edit, Star } from 'lucide-react';

const pnlData = [
    { date: '27 Feb', pnl: -10 }, { date: '6 Mar', pnl: -15 }, { date: '20 Mar', pnl: -5 }, 
    { date: '3 Apr', pnl: 0 }, { date: '17 Apr', pnl: 5 }, { date: '1 May', pnl: 15 },
    { date: '15 May', pnl: 35 }, { date: '29 May', pnl: 55 }, { date: '12 Jun', pnl: 40 },
    { date: '26 Jun', pnl: 45 }, { date: '30 Jun', pnl: 30 }, { date: '4 Jul', pnl: 25 }, 
    { date: '8 Jul', pnl: 10 }, { date: '12 Jul', pnl: -20 }, { date: '16 Jul', pnl: -50 },
    { date: '19 Jul', pnl: -70 }, { date: '22 Jul', pnl: -83.80 }
];

const positions = [
    { token: 'BTC', side: 'Short', leverage: '10X Cross', value: '$346.26M', amount: '-2.92K BTC', entryPrice: '$110624.1', pnl: '-$ 23.42M', fundingFee: '+$ 6.32M', liqPrice: '$158,355.45' },
    { token: 'ETH', side: 'Short', leverage: '10X Cross', value: '$289.83M', amount: '-78.05K ETH', entryPrice: '$2822.65', pnl: '-$ 69.53M', fundingFee: '+$ 4.35M', liqPrice: '$5,186.22' },
    { token: 'SOL', side: 'Short', leverage: '10X Cross', value: '$70.48M', amount: '-349.10K SOL', entryPrice: '$163.5763', pnl: '-$13.38M', fundingFee: '+$ 1.22M', liqPrice: '$525.93' },
    { token: 'SUI', side: 'Short', leverage: '10X Cross', value: '$809.34K', amount: '-202.24K SUI', entryPrice: '$3.96003', pnl: '-$ 8.47K', fundingFee: '+$ 17.14K', liqPrice: '$563.34' },
    { token: 'HYPE', side: 'Short', leverage: '5X Cross', value: '$79.41M', amount: '-1.79M HYPE', entryPrice: '$39.2636', pnl: '-$ 9.26M', fundingFee: '+$ 1.96M', liqPrice: '$104.89' },
    { token: 'FARTCOIN', side: 'Short', leverage: '10X Cross', value: '$746.50K', amount: '-451.90K FARTCOIN', entryPrice: '$1.07216', pnl: '-$ 261.99K', fundingFee: '+$ 14.53K', liqPrice: '$242.53' },
];

const pnlStats = [
    { label: 'Total PnL', value: '-$ 83.80M' },
    { label: '24-Hour PnL', value: '-$ 1.50M' },
    { label: '48-Hour PnL', value: '-$ 1.50M' },
    { label: '7-Day PnL', value: '-$ 53.01M' },
    { label: '30-Day PnL', value: '-$ 140.54M' },
];


export function PlayerProfile() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-mono text-muted-foreground">Address: 0x5b5d51203a0f9079f8aeb098a6523a13f298c060</h2>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground"><Copy className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground"><Star className="w-4 h-4" /></Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    {pnlStats.map(stat => (
                        <Card key={stat.label} className="bg-card/30 backdrop-blur-sm border-dashed">
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold text-red-400">{stat.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="lg:col-span-3">
                    <Card className="bg-card/30 backdrop-blur-sm border-dashed h-full">
                         <CardHeader>
                            <CardTitle className="font-headline">Total PnL</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={pnlData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                    <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <YAxis tickFormatter={(value) => `$${value}M`} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            color: 'hsl(var(--foreground))'
                                        }}
                                        labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <Area type="monotone" dataKey="pnl" stroke="hsl(var(--accent))" fill="url(#colorLoss)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

             <div>
                <p className="text-muted-foreground mb-4">Perps Position Value : $787.54M</p>
                <Tabs defaultValue="positions">
                    <TabsList>
                        <TabsTrigger value="positions">Positions</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        <TabsTrigger value="open-orders">Open Orders(0)</TabsTrigger>
                        <TabsTrigger value="deposit-withdraw">Deposit & Withdraw</TabsTrigger>
                    </TabsList>
                    <TabsContent value="positions">
                        <Card className="bg-card/30 backdrop-blur-sm border-dashed">
                            <CardContent className="pt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Token</TableHead>
                                            <TableHead>Side</TableHead>
                                            <TableHead>Leverage</TableHead>
                                            <TableHead>Value</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Entry Price</TableHead>
                                            <TableHead>Profit & Loss (PnL)</TableHead>
                                            <TableHead>Funding Fee</TableHead>
                                            <TableHead>Liq. Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {positions.map((pos, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{pos.token}</TableCell>
                                                <TableCell>
                                                    <Badge variant="destructive" className="bg-red-600/80">{pos.side}</Badge>
                                                </TableCell>
                                                <TableCell>{pos.leverage}</TableCell>
                                                <TableCell>{pos.value}</TableCell>
                                                <TableCell>{pos.amount}</TableCell>
                                                <TableCell>{pos.entryPrice}</TableCell>
                                                <TableCell className="text-red-400">{pos.pnl}</TableCell>
                                                <TableCell className="text-green-400">{pos.fundingFee}</TableCell>
                                                <TableCell>{pos.liqPrice}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
