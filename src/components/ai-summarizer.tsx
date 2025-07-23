
'use client';

import { useState } from 'react';
import { summarizeBlockchainData } from '@/ai/flows/summarize-blockchain-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Loader2, Search, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';

export function AISummarizer() {
  const [rawData, setRawData] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customReport, setCustomReport] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);
  const { toast } = useToast();

  const sampleData = `{
  "tx_hash": "0x1a2b3c...",
  "block": 15123456,
  "from": "0x987...cba",
  "to": "0x654...fed",
  "value": 2.5,
  "currency": "ETH",
  "gas_used": 21000,
  "gas_price": "45 Gwei",
  "timestamp": "2023-11-01T12:00:00Z",
  "status": "success"
}`;

  const handleSubmit = async (data: string) => {
    if (!data.trim()) {
      toast({
        title: 'Error',
        description: 'Input data cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeBlockchainData({ rawData: data });
      setSummary(result.summary);
    } catch (error) {
      console.error('Summarization error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReportLoading(true);
    // In a real app, you'd send `customReport` to a different Genkit flow.
    // Here we'll just reuse the summarizer for demonstration.
    setTimeout(() => {
        handleSubmit(customReport);
        setIsReportLoading(false);
    }, 1500);
  };


  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                Generate Summary from Data
            </CardTitle>
            <CardDescription>
                Paste raw blockchain data (e.g., transaction JSON) to get an AI-generated summary.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(rawData); }} className="flex flex-col gap-4">
                <Textarea
                placeholder="Paste raw data here..."
                className="min-h-[120px] font-code text-xs bg-black/20"
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                />
                <div className="flex justify-between items-center">
                <Button 
                    type="button" 
                    variant="ghost"
                    onClick={() => setRawData(sampleData)}
                >
                    Load Sample Data
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/80 text-accent-foreground">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Summarizing...
                    </>
                    ) : (
                    'Generate'
                    )}
                </Button>
                </div>
            </form>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                Visualize Dune
            </CardTitle>
            <CardDescription>
                Use natural language to query Dune Analytics and visualize the results.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                <div className="relative">
                    <Input
                    placeholder="e.g., 'Show me the daily active users on Hyperliquid in the last 30 days'"
                    className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                 <Button type="submit" disabled={isReportLoading} className="bg-accent hover:bg-accent/80 text-accent-foreground self-end">
                    {isReportLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                    ) : (
                       <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Visualize
                       </>
                    )}
                </Button>
            </form>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                Create Your Own Report
            </CardTitle>
            <CardDescription>
                Write down your analysis, notes, or questions. Submit to get an AI-powered report based on market data.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleCustomReportSubmit} className="flex flex-col gap-4">
                <Textarea
                placeholder="E.g., 'Analyze the impact of the recent BTC ETF approval on ETH volatility...'"
                className="min-h-[120px] font-body text-sm bg-black/20"
                value={customReport}
                onChange={(e) => setCustomReport(e.target.value)}
                />
                 <Button type="submit" disabled={isReportLoading} className="bg-accent hover:bg-accent/80 text-accent-foreground self-end">
                    {isReportLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                    </>
                    ) : (
                    'Generate Report'
                    )}
                </Button>
            </form>
            </CardContent>
        </Card>
      </div>

      <Card className="min-h-[700px] bg-card/50 backdrop-blur-sm flex flex-col sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline">AI Analysis</CardTitle>
          <CardDescription>The AI-generated summary or report will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading || isReportLoading ? (
             <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
              <p>Analyzing data...</p>
            </div>
          ) : summary ? (
            <div className="prose prose-sm text-foreground/90 w-full">{summary}</div>
          ) : (
            <div className="text-center text-muted-foreground">
                <BrainCircuit className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50"/>
              <p>Your summary is pending.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
