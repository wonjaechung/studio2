'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, PenSquare, MessageSquare, TrendingUp, Newspaper, Heart, Flame, Pin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const content = {
    en: {
        title: 'Community Board',
        description: 'Practice strategies and discuss with other players in Normal Mode.',
        searchPlaceholder: 'Search posts...',
        newPost: 'New Post',
        category: 'Category',
        titleHeader: 'Title',
        author: 'Author',
        reactions: 'Reactions',
        views: 'Views',
        popularSearches: 'Popular Searches',
        news: 'News',
        all: 'All',
        defi: 'DeFi',
        nft: 'NFT',
        regulation: 'Regulation',
        popularPosts: 'Popular Posts',
    },
    ko: {
        title: '커뮤니티 게시판',
        description: '일반 모드에서 자유롭게 전략을 테스트하고 다른 플레이어와 토론하세요.',
        searchPlaceholder: '게시물 검색...',
        newPost: '글쓰기',
        category: '분류',
        titleHeader: '제목',
        author: '작성자',
        reactions: '반응',
        views: '조회',
        popularSearches: '인기 검색어',
        news: '카테고리별 뉴스',
        all: '전체',
        defi: '디파이',
        nft: 'NFT',
        regulation: '규제',
        popularPosts: '인기 게시물',
    }
}

const posts = [
  { id: 1, category: '자유', title: '이번 FOMC 어떻게들 보시나요?', author: '경제신동', date: '2023.10.28', views: 1024, comments: 23, hearts: 15, fires: 3 },
  { id: 2, category: '분석', title: 'BTC 단기 저항선 분석과 대응 전략', author: '차트도사', date: '2023.10.28', views: 2345, comments: 45, hearts: 128, fires: 40 },
  { id: 3, category: '질문', title: '레버리지 처음 써보는데 팁 좀 부탁드립니다', author: '코린이', date: '2023.10.27', views: 512, comments: 12, hearts: 5, fires: 1 },
  { id: 4, category: '정보', title: '[공유] 유용한 온체인 데이터 분석 사이트 모음', author: '데이터콜렉터', date: '2023.10.27', views: 5421, comments: 88, hearts: 256, fires: 60 },
  { id: 5, category: '기타', title: '다들 주말에 뭐하시나요?', author: '주말요정', date: '2023.10.26', views: 234, comments: 5, hearts: 3, fires: 0 },
  { id: 6, category: '분석', title: '솔라나 생태계, 다음 10배 밈코인은?', author: '알트고수', date: '2023.10.25', views: 8910, comments: 156, hearts: 450, fires: 121 },
  { id: 7, category: '자유', title: '이번 시즌 챌린저 목표로 달립니다', author: '성투가즈아', date: '2023.10.25', views: 456, comments: 33, hearts: 42, fires: 11 },
];

const popularSearches = {
    ko: ['솔라나', '비트코인', 'FOMC', '밈코인', '에어드랍', '이더리움'],
    en: ['Solana', 'Bitcoin', 'FOMC', 'Memecoin', 'Airdrop', 'Ethereum'],
};

const newsItems = {
    ko: {
        all: ['미 연준, 금리 동결 시사... 시장 안도', '이더리움 덴쿤 업그레이드, 가스비 절감 효과 나타나'],
        defi: ['에이프로토콜, V3 버전 출시하며 유동성 채굴 보상 강화'],
        nft: ['유명 NFT 프로젝트, 오프라인 갤러리 전시회 개최'],
        regulation: ['미 SEC, 암호화폐 규제 가이드라인 발표 임박'],
    },
    en: {
        all: ['Fed hints at interest rate freeze, market relieved', 'Ethereum Dencun upgrade shows gas fee reduction effect'],
        defi: ['Aave Protocol boosts liquidity mining rewards with V3 launch'],
        nft: ['Famous NFT project holds offline gallery exhibition'],
        regulation: ['US SEC close to announcing crypto regulation guidelines'],
    },
};

export function NormalModeBoard({ lang }: { lang: 'en' | 'ko' }) {
    const currentContent = content[lang];
    const currentPosts = posts.map(p => ({
        ...p,
        category: lang === 'ko' ? p.category : (p.category === '자유' ? 'General' : p.category === '분석' ? 'Analysis' : p.category === '질문' ? 'Question' : p.category === '정보' ? 'Info' : 'Misc')
    }));
    const currentSearches = popularSearches[lang];
    const currentNews = newsItems[lang];

    const popularPosts = [...currentPosts].sort((a, b) => (b.hearts + b.fires) - (a.hearts + a.fires)).slice(0, 3);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                <Card className="bg-card/30 backdrop-blur-sm border-dashed font-body">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{currentContent.title}</CardTitle>
                        <CardDescription>{currentContent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Popular Posts Section */}
                         <div className="mb-8">
                            <h3 className="font-headline text-xl mb-4 flex items-center gap-2">
                                <Pin className="w-5 h-5 text-accent" />
                                {currentContent.popularPosts}
                            </h3>
                            <div className="space-y-3">
                                {popularPosts.map(post => (
                                    <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="border-accent/50 text-accent">{post.category}</Badge>
                                            <span className="font-medium">{post.title}</span>
                                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                                <MessageSquare className="w-3.5 h-3.5"/>
                                                {post.comments}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                             <div className="flex items-center gap-1.5">
                                                <Heart className="w-4 h-4 text-red-400" />
                                                <span>{post.hearts}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Flame className="w-4 h-4 text-orange-400" />
                                                <span>{post.fires}</span>
                                            </div>
                                            <span className="w-20 text-right">{post.author}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* All Posts Section */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative w-full max-w-sm">
                                <Input placeholder={currentContent.searchPlaceholder} className="pr-10 bg-background/50" />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                            <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
                                <PenSquare className="mr-2 h-4 w-4" />
                                {currentContent.newPost}
                            </Button>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead className="w-[100px] text-center">{currentContent.category}</TableHead>
                                        <TableHead>{currentContent.titleHeader}</TableHead>
                                        <TableHead className="w-[120px] text-center">{currentContent.author}</TableHead>
                                        <TableHead className="w-[120px] text-center">{currentContent.reactions}</TableHead>
                                        <TableHead className="w-[80px] text-center">{currentContent.views}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentPosts.map((post) => (
                                        <TableRow key={post.id} className="hover:bg-accent/10 cursor-pointer">
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className="border-accent/50 text-accent">{post.category}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span>{post.title}</span>
                                                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                                        <MessageSquare className="w-3.5 h-3.5"/>
                                                        {post.comments}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground text-xs">{post.author}</TableCell>
                                            <TableCell className="text-muted-foreground text-xs">
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-3.5 h-3.5 text-red-400/80" />
                                                        {post.hearts}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Flame className="w-3.5 h-3.5 text-orange-400/80" />
                                                        {post.fires}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground text-xs">{post.views}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card/30 backdrop-blur-sm border-dashed">
                    <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                           <TrendingUp className="w-5 h-5" />
                           {currentContent.popularSearches}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {currentSearches.map((term, index) => (
                            <Button key={index} variant="outline" size="sm" className="bg-background/50 hover:bg-accent/20 hover:border-accent/50">
                                {term}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-card/30 backdrop-blur-sm border-dashed">
                    <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                           <Newspaper className="w-5 h-5" />
                           {currentContent.news}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-4">
                                <TabsTrigger value="all">{currentContent.all}</TabsTrigger>
                                <TabsTrigger value="defi">{currentContent.defi}</TabsTrigger>
                                <TabsTrigger value="nft">{currentContent.nft}</TabsTrigger>
                                <TabsTrigger value="regulation">{currentContent.regulation}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                               <ul className="space-y-2 text-sm">
                                  {currentNews.all.map((item, i) => (
                                    <li key={i} className="hover:text-accent cursor-pointer truncate">{item}</li>
                                  ))}
                               </ul>
                            </TabsContent>
                            <TabsContent value="defi">
                                <ul className="space-y-2 text-sm">
                                  {currentNews.defi.map((item, i) => (
                                    <li key={i} className="hover:text-accent cursor-pointer truncate">{item}</li>
                                  ))}
                               </ul>
                            </TabsContent>
                            <TabsContent value="nft">
                               <ul className="space-y-2 text-sm">
                                  {currentNews.nft.map((item, i) => (
                                    <li key={i} className="hover:text-accent cursor-pointer truncate">{item}</li>
                                  ))}
                               </ul>
                            </TabsContent>
                             <TabsContent value="regulation">
                               <ul className="space-y-2 text-sm">
                                  {currentNews.regulation.map((item, i) => (
                                    <li key={i} className="hover:text-accent cursor-pointer truncate">{item}</li>
                                  ))}
                               </ul>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
