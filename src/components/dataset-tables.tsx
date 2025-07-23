'use client';

import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const transactions = [
  { tx_hash: '0x1a2b...ef67', block: 15123456, from: '0xd8dA...8bC', to: '0x7a25...6e48', value: '1.2 WETH', fee: '0.0021 ETH', date: '2023-10-27 10:00:12' },
  { tx_hash: '0x4f5e...cd89', block: 15123455, from: '0x22d4...4d90', to: '0xDeFi...d4e5', value: '5,000 USDC', fee: '0.0053 ETH', date: '2023-10-27 09:58:45' },
  { tx_hash: '0x9a8b...ab12', block: 15123455, from: '0x59ab...d32b', to: '0x1111...1111', value: '10.0 ETH', fee: '0.0019 ETH', date: '2023-10-27 09:58:11' },
  { tx_hash: '0xc3d4...fe34', block: 15123454, from: '0xBuilder...a7d4', to: '0xNFT...7b2e', value: '1 NFT', fee: '0.0120 ETH', date: '2023-10-27 09:55:03' },
  { tx_hash: '0x7e8f...9876', block: 15123453, from: '0xAlice...1a1a', to: '0xBob...b2b2', value: '100 DAI', fee: '0.0033 ETH', date: '2023-10-27 09:54:21' },
];

const blocks = [
  { number: 15123456, timestamp: '2023-10-27 10:00:12', transactions: 152, gasUsed: '14,982,345 (99.8%)', gasLimit: '15,000,000', baseFee: '15.2 Gwei' },
  { number: 15123455, timestamp: '2023-10-27 09:58:45', transactions: 210, gasUsed: '14,991,234 (99.9%)', gasLimit: '15,000,000', baseFee: '14.8 Gwei' },
  { number: 15123454, timestamp: '2023-10-27 09:55:03', transactions: 180, gasUsed: '14,975,678 (99.8%)', gasLimit: '15,000,000', baseFee: '15.1 Gwei' },
  { number: 15123453, timestamp: '2023-10-27 09:54:21', transactions: 195, gasUsed: '14,988,991 (99.9%)', gasLimit: '15,000,000', baseFee: '14.9 Gwei' },
];

export function DatasetTables() {
  return (
     <Card className="bg-card/50 backdrop-blur-sm border-dashed">
      <CardContent className="pt-6">
        <Tabs defaultValue="transactions">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="traces">Traces</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tx Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Date (UTC)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.tx_hash}>
                    <TableCell className="font-code text-accent hover:underline cursor-pointer">{tx.tx_hash}</TableCell>
                    <TableCell>{tx.block}</TableCell>
                    <TableCell className="font-code">{tx.from}</TableCell>
                    <TableCell className="font-code">{tx.to}</TableCell>
                    <TableCell className="text-right font-medium">{tx.value}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{tx.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

           <TabsContent value="blocks" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Block</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Gas Used</TableHead>
                  <TableHead>Gas Limit</TableHead>
                  <TableHead className="text-right">Base Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blocks.map((block) => (
                  <TableRow key={block.number}>
                    <TableCell className="font-medium text-accent hover:underline cursor-pointer">{block.number}</TableCell>
                    <TableCell className="text-muted-foreground">{block.timestamp}</TableCell>
                    <TableCell>{block.transactions}</TableCell>
                    <TableCell>{block.gasUsed}</TableCell>
                    <TableCell>{block.gasLimit}</TableCell>
                    <TableCell className="text-right font-code">{block.baseFee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="logs" className="mt-4 flex items-center justify-center h-64">
            <p className="text-muted-foreground">Log data would be displayed here.</p>
          </TabsContent>
          <TabsContent value="traces" className="mt-4 flex items-center justify-center h-64">
             <p className="text-muted-foreground">Traces data would be displayed here.</p>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
