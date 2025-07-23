'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, PenSquare, MessageSquare } from 'lucide-react';

const content = {
    en: {
        title: 'Community Board',
        description: 'Practice strategies and discuss with other players in Normal Mode.',
        searchPlaceholder: 'Search posts...',
        newPost: 'New Post',
        category: 'Category',
        titleHeader: 'Title',
        author: 'Author',
        date: 'Date',
        views: 'Views',
    },
    ko: {
        title: '커뮤니티 게시판',
        description: '일반 모드에서 자유롭게 전략을 테스트하고 다른 플레이어와 토론하세요.',
        searchPlaceholder: '게시물 검색...',
        newPost: '글쓰기',
        category: '분류',
        titleHeader: '제목',
        author: '작성자',
        date: '작성일',
        views: '조회',
    }
}

const posts = [
  { id: 1, category: '자유', title: '이번 FOMC 어떻게들 보시나요?', author: '경제신동', date: '2023.10.28', views: 1024, comments: 23 },
  { id: 2, category: '분석', title: 'BTC 단기 저항선 분석과 대응 전략', author: '차트도사', date: '2023.10.28', views: 2345, comments: 45 },
  { id: 3, category: '질문', title: '레버리지 처음 써보는데 팁 좀 부탁드립니다', author: '코린이', date: '2023.10.27', views: 512, comments: 12 },
  { id: 4, category: '정보', title: '[공유] 유용한 온체인 데이터 분석 사이트 모음', author: '데이터콜렉터', date: '2023.10.27', views: 5421, comments: 88 },
  { id: 5, category: '기타', title: '다들 주말에 뭐하시나요?', author: '주말요정', date: '2023.10.26', views: 234, comments: 5 },
  { id: 6, category: '분석', title: '솔라나 생태계, 다음 10배 밈코인은?', author: '알트고수', date: '2023.10.25', views: 8910, comments: 156 },
  { id: 7, category: '자유', title: '이번 시즌 챌린저 목표로 달립니다', author: '성투가즈아', date: '2023.10.25', views: 456, comments: 33 },
];

export function NormalModeBoard({ lang }: { lang: 'en' | 'ko' }) {
    const currentContent = content[lang];
    const currentPosts = posts.map(p => ({
        ...p,
        category: lang === 'ko' ? p.category : (p.category === '자유' ? 'General' : p.category === '분석' ? 'Analysis' : p.category === '질문' ? 'Question' : p.category === '정보' ? 'Info' : 'Misc')
    }));

    return (
        <Card className="bg-card/30 backdrop-blur-sm border-dashed font-code">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{currentContent.title}</CardTitle>
                <CardDescription>{currentContent.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-sm">
                        <Input placeholder={currentContent.searchPlaceholder} className="pr-10 bg-black/20" />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
                        <PenSquare className="mr-2 h-4 w-4" />
                        {currentContent.newPost}
                    </Button>
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="w-[100px] text-center">{currentContent.category}</TableHead>
                                <TableHead>{currentContent.titleHeader}</TableHead>
                                <TableHead className="w-[150px] text-center">{currentContent.author}</TableHead>
                                <TableHead className="w-[120px] text-center">{currentContent.date}</TableHead>
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
                                            <span className="text-muted-foreground flex items-center gap-1">
                                                <MessageSquare className="w-3.5 h-3.5"/>
                                                {post.comments}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground">{post.author}</TableCell>
                                    <TableCell className="text-center text-muted-foreground">{post.date}</TableCell>
                                    <TableCell className="text-center text-muted-foreground">{post.views}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
