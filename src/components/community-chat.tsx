'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

const messages = [
  {
    user: 'CryptoKing',
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'king crown',
    message: 'V-Gauge is spiking! Something big is about to happen.',
    time: '2m ago',
    color: 'text-purple-400',
  },
  {
    user: 'WhaleWatcher',
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'whale ocean',
    message: 'Just saw a massive BTC transfer on the hyperliquid tracker. Coincidence? I think not.',
    time: '1m ago',
    color: 'text-blue-400',
  },
  {
    user: 'DiamondHands',
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'diamond hands',
    message: 'HODL! This is where players are made. Don\'t get shaken out.',
    time: '1m ago',
    color: 'text-green-400',
  },
  {
    user: 'DayTraderPro',
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'chart graph',
    message: '@CryptoKing For sure. ATR on the 15min chart is off the charts. Ranked game starting any second now.',
    time: '30s ago',
    color: 'text-yellow-400',
  },
   {
    user: 'You',
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'user profile',
    message: 'Let\'s go! Ready for this.',
    time: 'now',
    color: 'text-accent',
  },
];

export function CommunityChat() {
  return (
    <Card className="w-full h-[70vh] flex flex-col bg-card/50 backdrop-blur-sm border-dashed">
      <CardHeader>
        <CardTitle className="font-headline">Live Community Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar} data-ai-hint={msg.dataAiHint} />
                  <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className={`font-bold ${msg.color}`}>{msg.user}</p>
                    <time className="text-xs text-muted-foreground">{msg.time}</time>
                  </div>
                  <p className="text-foreground/90">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="relative w-full">
            <Input placeholder="Send a message..." className="pr-12 h-12" />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-accent-foreground hover:bg-accent">
                <Send className="w-6 h-6" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
