
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface AuthModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const KakaoIcon = () => (
     <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#3C1E1E" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        <path fill="#FFCD00" d="M6.43,9.51c-0.03,0.36-0.05,0.72-0.05,1.09c0,2.77,2.25,5.02,5.02,5.02c0.23,0,0.46-0.02,0.68-0.05 c-0.54,1.2-1.76,2.05-3.18,2.05c-1.93,0-3.5-1.57-3.5-3.5C5.4,12.24,5.77,10.74,6.43,9.51z"/>
        <path fill="#FFCD00" d="M14.6,9.51c0.66,1.23,1.03,2.73,1.03,4.31c0,1.93-1.57,3.5-3.5,3.5c-1.42,0-2.64-0.85-3.18-2.05 C9.14,15.58,9.37,15.6,9.6,15.6c2.77,0,5.02-2.25,5.02-5.02C14.6,10.23,14.63,9.87,14.6,9.51z"/>
    </svg>
);

const MetamaskIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="orange"/>
        <path d="M12 2L15.6 6L12 12L8.4 6L12 2Z" fill="white"/>
        <path d="M12 22L8.4 18L12 12L15.6 18L12 22Z" fill="white"/>
        <path d="M2 12L6 8.4L12 12L6 15.6L2 12Z" fill="white"/>
        <path d="M22 12L18 15.6L12 12L18 8.4L22 12Z" fill="white"/>
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="orange"/>
    </svg>
);


export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-xl border-accent/20">
                <DialogHeader className="text-center">
                    <DialogTitle className="font-headline text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-blue-400">
                        Join the League
                    </DialogTitle>
                    <DialogDescription className="font-body text-base">
                        Connect your account to start playing in the TradeOS e-Sports League.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                     <Button variant="outline" size="lg" className="h-14 text-lg">
                        <MetamaskIcon /> Connect Wallet
                    </Button>
                    <div className="flex items-center gap-2">
                        <Separator className="flex-1" />
                        <span className="text-muted-foreground text-xs">OR</span>
                        <Separator className="flex-1" />
                    </div>
                    <Button variant="outline" size="lg" className="h-14 text-lg">
                        <GoogleIcon /> Continue with Google
                    </Button>
                     <Button variant="outline" size="lg" className="h-14 text-lg">
                        <KakaoIcon /> Continue with Kakao
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
