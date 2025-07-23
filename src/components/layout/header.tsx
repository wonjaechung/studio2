import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2">
          <GanttChartSquare className="h-6 w-6 text-accent" />
          <span className="font-bold font-logo text-lg tracking-wider">TradeOS</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Future user auth can go here */}
        </div>
      </div>
    </header>
  );
}
