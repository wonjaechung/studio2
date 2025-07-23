'use client';

import { useState } from 'react';
import { summarizeBlockchainData } from '@/ai/flows/summarize-blockchain-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function AISummarizer() {
  const [rawData, setRawData] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  "status": "success",
  "logs": [
    {
      "address": "0xTokenContract...",
      "topics": ["0xddf252ad..."],
      "data": "..."
    }
  ]
}`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rawData.trim()) {
      toast({
        title: 'Error',
        description: 'Raw data cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeBlockchainData({ rawData });
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

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            Generate Summary
          </CardTitle>
          <CardDescription>
            Paste raw blockchain data (e.g., transaction JSON) to get an AI-generated natural language summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Textarea
              placeholder="Paste raw data here..."
              className="min-h-[250px] font-code text-xs bg-black/20"
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
      <Card className="min-h-[422px] bg-card/50 backdrop-blur-sm flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">AI Summary</CardTitle>
          <CardDescription>The AI-generated summary will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
              <p>Analyzing data...</p>
            </div>
          ) : summary ? (
            <div className="prose prose-sm text-foreground/90 w-full">{summary}</div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Your summary is pending.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
