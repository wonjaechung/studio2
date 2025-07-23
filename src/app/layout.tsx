import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'TradeOS - The e-Sports League for Traders',
  description: 'Your AI-powered portal to the blockchain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto+Mono:wght@400;500&family=Russo+One&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
          {/* The header is now managed by the sidebar component */}
        </header>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
