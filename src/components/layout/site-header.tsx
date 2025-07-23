'use client';

import { GanttChartSquare, Languages, LogIn, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { AuthModal } from '../auth-modal';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const UserNav = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    return         <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Guest</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            guest@tradeos.pro
                        </p>
                    </div>
                </DropdownMenuLabel>
                 <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
                       <LogIn className="mr-2 h-4 w-4" />
                        <span>Login / Sign Up</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
        </>
}

export function SiteHeader() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'ko';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ko' : 'en';
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('lang', newLang);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
    
    toast({
        title: newLang === 'ko' ? '언어 변경' : 'Language Changed',
        description: newLang === 'ko' ? '이제 한국어로 표시됩니다.' : 'Now displaying in English.',
    });
  }

  return (
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2">
          <GanttChartSquare className="h-6 w-6 text-accent" />
          <span className="font-bold font-logo text-lg tracking-wider">TradeOS</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Languages className="w-6 h-6" />
          </Button>
          <UserNav />
        </div>
      </div>
  );
}
