'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wifi, WifiOff, Settings, CheckCircle, AlertCircle } from 'lucide-react';

interface ExchangeStatus {
  name: string;
  connected: boolean;
  lastSync: string;
  latency: number;
  volume24h: number;
}

export function ApiConnectionStatus() {
  const [exchanges, setExchanges] = useState<ExchangeStatus[]>([
    {
      name: 'Binance',
      connected: true,
      lastSync: '2초 전',
      latency: 45,
      volume24h: 1250000000
    },
    {
      name: 'Bybit',
      connected: true,
      lastSync: '5초 전',
      latency: 67,
      volume24h: 890000000
    },
    {
      name: 'OKX',
      connected: false,
      lastSync: '연결 끊김',
      latency: 0,
      volume24h: 0
    }
  ]);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (exchangeName: string) => {
    setIsConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      setExchanges(prev => 
        prev.map(ex => 
          ex.name === exchangeName 
            ? { ...ex, connected: true, lastSync: '방금 전', latency: Math.floor(Math.random() * 100) + 20 }
            : ex
        )
      );
      setIsConnecting(false);
    }, 2000);
  };

  const connectedExchanges = exchanges.filter(ex => ex.connected);
  const totalVolume = connectedExchanges.reduce((sum, ex) => sum + ex.volume24h, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          API 연결 상태
        </CardTitle>
        <CardDescription>
          거래소 API 연결 상태 및 실시간 데이터 동기화
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Connection Summary */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">연결된 거래소</p>
              <p className="text-2xl font-bold text-green-500">
                {connectedExchanges.length} / {exchanges.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">24시간 거래량</p>
              <p className="text-lg font-bold">
                ${(totalVolume / 1000000000).toFixed(1)}B
              </p>
            </div>
          </div>

          {/* Exchange List */}
          <div className="space-y-3">
            {exchanges.map((exchange) => (
              <div key={exchange.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    exchange.connected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {exchange.connected ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{exchange.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exchange.connected ? `마지막 동기화: ${exchange.lastSync}` : '연결 끊김'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {exchange.connected ? (
                    <>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">지연시간</p>
                        <p className="font-medium">{exchange.latency}ms</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">거래량</p>
                        <p className="font-medium">${(exchange.volume24h / 1000000).toFixed(0)}M</p>
                      </div>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handleConnect(exchange.name)}
                      disabled={isConnecting}
                    >
                      {isConnecting ? '연결 중...' : '연결'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Connection Quality */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">연결 품질</span>
              <Badge variant="secondary">우수</Badge>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              평균 지연시간: {Math.round(connectedExchanges.reduce((sum, ex) => sum + ex.latency, 0) / connectedExchanges.length)}ms
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 