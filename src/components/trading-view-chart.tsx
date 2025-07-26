
'use client';

import React, { useEffect, useRef, memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Target, DollarSign, Activity, Settings } from 'lucide-react';

function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedSymbol, setSelectedSymbol] = useState('BINANCE:BTCUSDT');
  const [selectedInterval, setSelectedInterval] = useState('60');
  const [orderType, setOrderType] = useState('market');
  const [orderSize, setOrderSize] = useState('0.1');
  const [orderPrice, setOrderPrice] = useState('43250');

  const symbols = [
    { value: 'BINANCE:BTCUSDT', label: 'BTC/USDT', price: '43,250', change: '+2.5%' },
    { value: 'BINANCE:ETHUSDT', label: 'ETH/USDT', price: '2,650', change: '+1.8%' },
    { value: 'BINANCE:SOLUSDT', label: 'SOL/USDT', price: '98.5', change: '+5.2%' },
    { value: 'BINANCE:ADAUSDT', label: 'ADA/USDT', price: '0.45', change: '-0.8%' },
  ];

  const intervals = [
    { value: '1', label: '1m' },
    { value: '5', label: '5m' },
    { value: '15', label: '15m' },
    { value: '60', label: '1h' },
    { value: '240', label: '4h' },
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
          "width": "100%",
          "height": "100%",
          "symbol": "${selectedSymbol}",
          "interval": "${selectedInterval}",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "backgroundColor": "rgba(23, 27, 38, 0)",
          "gridColor": "rgba(255, 255, 255, 0.06)",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com",
          "studies": [
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies",
            "BB@tv-basicstudies"
          ],
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650"
        }`;
      container.current.appendChild(script);
    }
  }, [selectedSymbol, selectedInterval]);

  const handleBuy = () => {
    // Simulate buy order
    console.log(`Buy ${orderSize} ${selectedSymbol} at ${orderPrice}`);
  };

  const handleSell = () => {
    // Simulate sell order
    console.log(`Sell ${orderSize} ${selectedSymbol} at ${orderPrice}`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 h-[450px]">
      {/* Main Chart Area */}
      <div className="xl:col-span-3">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                실시간 거래 차트
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {symbols.map((symbol) => (
                      <SelectItem key={symbol.value} value={symbol.value}>
                        {symbol.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedInterval} onValueChange={setSelectedInterval}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {intervals.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </SelectItem>
                    ))}
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
      </div>

      {/* Trading Side Panel */}
      <div className="xl:col-span-1 space-y-4">
        {/* Market Overview & Quick Trade Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Market Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">시장 개요</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Top Gainers/Losers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Top Movers</span>
                  <div className="flex gap-1">
                    <Badge variant="default" className="text-xs">Gainers</Badge>
                    <Badge variant="secondary" className="text-xs">Losers</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-1 rounded bg-green-500/10">
                    <span className="text-xs font-medium">SOL</span>
                    <span className="text-xs text-green-500">+15.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded bg-green-500/10">
                    <span className="text-xs font-medium">AVAX</span>
                    <span className="text-xs text-green-500">+8.7%</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded bg-red-500/10">
                    <span className="text-xs font-medium">ADA</span>
                    <span className="text-xs text-red-500">-3.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded bg-red-500/10">
                    <span className="text-xs font-medium">DOT</span>
                    <span className="text-xs text-red-500">-2.1%</span>
                  </div>
                </div>
              </div>

              {/* Volatility Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">시장 변동성</span>
                  <span className="text-xs text-muted-foreground">높음</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">현재 변동성 지수: 75%</p>
              </div>
              
              {/* Bitcoin Dominance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">비트코인 도미넌스</span>
                  <span className="text-xs text-muted-foreground">52.3%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '52.3%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>24h: 51.8%</span>
                  <span>7d: 53.1%</span>
                </div>
              </div>

              {/* Fear & Greed Index */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fear & Greed Index</span>
                  <span className="text-xs text-muted-foreground">Greed</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Value: 65</span>
                  <span>Yesterday: 58</span>
                </div>
              </div>

              {/* 24h Volume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">24h Volume</span>
                  <span className="text-xs text-muted-foreground">$402.1B</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>변화: -0.94%</span>
                  <span>평균: $450B</span>
                </div>
              </div>

              {/* Open Interest */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Open Interest</span>
                  <span className="text-xs text-muted-foreground">$201.7B</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>변화: +3.68%</span>
                  <span>최고: $280B</span>
                </div>
              </div>

              {/* 24h Liquidation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">24h Liquidation</span>
                  <span className="text-xs text-muted-foreground">$463.3M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>변화: -16.21%</span>
                  <span>최고: $1.2B</span>
                </div>
              </div>

              {/* Long/Short Ratio */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Long/Short Ratio</span>
                  <span className="text-xs text-muted-foreground">47.84%/52.16%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full" style={{ width: '52.16%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Long: 47.84%</span>
                  <span>Short: 52.16%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Trade */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">빠른 거래</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">심볼</Label>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {symbols.map((symbol) => (
                      <SelectItem key={symbol.value} value={symbol.value}>
                        {symbol.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderType">주문 유형</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">시장가</SelectItem>
                    <SelectItem value="limit">지정가</SelectItem>
                    <SelectItem value="stop">스탑</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">수량</Label>
                <Input
                  id="size"
                  type="number"
                  value={orderSize}
                  onChange={(e) => setOrderSize(e.target.value)}
                  placeholder="0.1"
                />
              </div>

              {orderType === 'limit' && (
                <div className="space-y-2">
                  <Label htmlFor="price">가격</Label>
                  <Input
                    id="price"
                    type="number"
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(e.target.value)}
                    placeholder="43250"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={handleBuy} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  매수
                </Button>
                <Button 
                  onClick={handleSell} 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  <TrendingDown className="w-4 h-4 mr-1" />
                  매도
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Tools */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">거래 도구</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Target className="w-4 h-4 mr-2" />
              손절/익절 설정
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <DollarSign className="w-4 h-4 mr-2" />
              포지션 계산기
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              거래 설정
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const MemoizedTradingViewChart = memo(TradingViewChart);
export { TradingViewChart };
