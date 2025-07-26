
'use client';

import React, { useEffect, useRef, memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Target, DollarSign, Activity, Settings } from 'lucide-react';

declare global {
    interface Window {
        TradingView: any;
    }
}

function TradingViewChart({ lang }: { lang: 'en' | 'ko' }) {
    const container = useRef<HTMLDivElement>(null);
    const [selectedSymbol, setSelectedSymbol] = useState('BINANCE:BTCUSDT');
    const [selectedInterval, setSelectedInterval] = useState('60');
    const [orderType, setOrderType] = useState('market');
    const [orderSize, setOrderSize] = useState('0.1');
    const [orderPrice, setOrderPrice] = useState('');

    const handleBuy = () => { console.log('Buy action'); };
    const handleSell = () => { console.log('Sell action'); };

    const symbols = [
        { value: 'BINANCE:BTCUSDT', label: 'BTC/USDT' },
        { value: 'BINANCE:ETHUSDT', label: 'ETH/USDT' },
        { value: 'COINBASE:SOLUSD', label: 'SOL/USD' },
    ];

    const intervals = [
        { value: '1', label: '1m' },
        { value: '5', label: '5m' },
        { value: '15', label: '15m' },
        { value: '60', label: '1H' },
        { value: '240', label: '4H' },
        { value: 'D', label: '1D' },
    ];

    useEffect(() => {
        if (container.current && !container.current.querySelector('script')) {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = `
            {
              "autosize": true,
              "symbol": "${selectedSymbol}",
              "interval": "${selectedInterval}",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "1",
              "locale": "en",
              "enable_publishing": false,
              "withdateranges": true,
              "hide_side_toolbar": false,
              "allow_symbol_change": true,
              "details": true,
              "hotlist": true,
              "calendar": true,
              "studies": [
                "STD;MA"
              ],
              "container_id": "tradingview-widget-container"
            }`;
            container.current.appendChild(script);
        }
    }, [selectedSymbol, selectedInterval]);

    return (
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {lang === 'ko' ? '실시간 거래 차트' : 'Live Trading Chart'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {symbols.map((symbol) => (<SelectItem key={symbol.value} value={symbol.value}>{symbol.label}</SelectItem>))}
                  </SelectContent>
                </Select>
                <Select value={selectedInterval} onValueChange={setSelectedInterval}>
                  <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {intervals.map((interval) => (<SelectItem key={interval.value} value={interval.value}>{interval.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="tradingview-widget-container" ref={container} style={{ height: "calc(100% - 60px)", width: "100%" }}>
              <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
            </div>
          </CardContent>
        </Card>
    );
}

export const MemoizedTradingViewChart = memo(TradingViewChart);
export { TradingViewChart };
