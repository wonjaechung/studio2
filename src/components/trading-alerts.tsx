'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface TradingAlert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  symbol?: string;
  price?: number;
  action?: string;
}

export function TradingAlerts() {
  const [alerts, setAlerts] = useState<TradingAlert[]>([
    {
      id: '1',
      type: 'success',
      title: '거래 성공',
      message: 'BTC/USD 매수 주문이 체결되었습니다',
      time: '방금 전',
      symbol: 'BTC/USD',
      price: 43250,
      action: '매수'
    },
    {
      id: '2',
      type: 'warning',
      title: '변동성 증가',
      message: 'ETH/USD 변동성이 15% 증가했습니다',
      time: '2분 전',
      symbol: 'ETH/USD',
      price: 2650
    },
    {
      id: '3',
      type: 'info',
      title: 'API 연결',
      message: 'Binance API가 성공적으로 연결되었습니다',
      time: '5분 전'
    },
    {
      id: '4',
      type: 'error',
      title: '주문 실패',
      message: 'SOL/USD 매도 주문이 거부되었습니다',
      time: '10분 전',
      symbol: 'SOL/USD',
      price: 98.5,
      action: '매도'
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const visibleAlerts = isExpanded ? alerts : alerts.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          실시간 알림
          <Badge variant="secondary" className="ml-auto">
            {alerts.length}
          </Badge>
        </CardTitle>
        <CardDescription>
          거래 및 시장 이벤트 실시간 알림
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                    {alert.symbol && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.symbol}
                        </Badge>
                        {alert.price && (
                          <span className="text-xs font-medium">
                            ${alert.price.toLocaleString()}
                          </span>
                        )}
                        {alert.action && (
                          <Badge variant="secondary" className="text-xs">
                            {alert.action}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          
          {alerts.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full"
            >
              {isExpanded ? '접기' : `${alerts.length - 3}개 더 보기`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 