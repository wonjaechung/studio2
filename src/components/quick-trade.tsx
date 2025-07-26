import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';


export function QuickTrade({ lang }: { lang: 'en' | 'ko' }) {
  return (
    <Card className="w-full bg-background/50 p-4">
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-base">{lang === 'ko' ? '빠른 거래' : 'Quick Trade'}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="space-y-2">
            <Label htmlFor="symbol">{lang === 'ko' ? '심볼' : 'Symbol'}</Label>
            <Select defaultValue="btc-usdt">
                <SelectTrigger id="symbol">
                    <SelectValue placeholder="Select symbol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                    <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                    <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="order-type">{lang === 'ko' ? '주문 유형' : 'Order Type'}</Label>
            <Select defaultValue="market">
                <SelectTrigger id="order-type">
                    <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="market">{lang === 'ko' ? '시장가' : 'Market'}</SelectItem>
                    <SelectItem value="limit">{lang === 'ko' ? '지정가' : 'Limit'}</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="quantity">{lang === 'ko' ? '수량' : 'Quantity'}</Label>
            <Input id="quantity" type="number" placeholder="0.1" defaultValue={0.1}/>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                {lang === 'ko' ? '매수' : 'Buy/Long'}
            </Button>
            <Button variant="destructive">
                <TrendingDown className="w-4 h-4 mr-2" />
                {lang === 'ko' ? '매도' : 'Sell/Short'}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
} 