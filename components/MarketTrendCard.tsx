'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CryptoMarketData } from '@/types/crypto';
import { formatPrice, formatPercentageChange } from '@/lib/format';
import { cn } from '@/lib/utils';

interface MarketTrendCardProps {
  title: string;
  data: CryptoMarketData[];
  showVolume?: boolean;
}

export function MarketTrendCard({
  title,
  data,
  showVolume = false,
}: MarketTrendCardProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                {showVolume && (
                  <TableHead className="text-right">24H Volume</TableHead>
                )}
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((coin) => {
                const changePercentage = coin.price_change_percentage_24h || 0;
                const isPositive = changePercentage >= 0;

                // Format volume
                const formatVolume = (volume: number) => {
                  if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`;
                  if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
                  if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
                  return volume.toFixed(0);
                };

                // Determine price decimals
                const priceDecimals =
                  coin.current_price >= 1000
                    ? 2
                    : coin.current_price >= 1
                      ? 2
                      : coin.current_price >= 0.01
                        ? 4
                        : 6;

                return (
                  <TableRow
                    key={coin.id}
                    className="hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell>
                      <Link
                        href={`/markets/coin/${coin.id}`}
                        className="flex items-center gap-2 hover:opacity-80"
                      >
                        {coin.image ? (
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            className="w-6 h-6 rounded-full"
                            width={24}
                            height={24}
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {coin.symbol.toUpperCase().slice(0, 2)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {coin.symbol.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {coin.name}
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm">
                        {formatPrice(coin.current_price, priceDecimals)}
                      </span>
                    </TableCell>
                    {showVolume && (
                      <TableCell className="text-right">
                        <span className="text-sm text-muted-foreground">
                          ${formatVolume(coin.total_volume || 0)}
                        </span>
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isPositive ? 'text-green-500' : 'text-red-500'
                        )}
                      >
                        {formatPercentageChange(changePercentage)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
