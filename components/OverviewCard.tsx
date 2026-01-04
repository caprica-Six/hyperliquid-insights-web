'use client';

import Link from 'next/link';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatPrice, formatPercentageChange } from '@/lib/format';
import { CryptoMarketData } from '@/types/crypto';
import { cn } from '@/lib/utils';

interface OverviewCardProps {
  data: CryptoMarketData;
}

function getCoinInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function ChartTooltip(props: {
  active?: boolean;
  payload?: Array<{
    payload: { index: number; value: number; previousValue: number };
    value: number;
  }>;
}) {
  const { active, payload } = props;

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;
  const value = payload[0].value;
  const previousValue = data.previousValue || value;
  const change = ((value - previousValue) / previousValue) * 100;

  return (
    <div className="rounded-md bg-green-900/90 border border-green-700/50 px-3 py-2 shadow-lg">
      <div className="text-white text-xs font-medium">{data.index}</div>
      <div className="text-white/70 text-xs">
        Change: {change >= 0 ? '+' : ''}
        {change.toFixed(2)}%
      </div>
    </div>
  );
}

export function OverviewCard({ data }: OverviewCardProps) {
  const changePercentage = data.price_change_percentage_24h;
  const isPositive = changePercentage >= 0;
  const initials = getCoinInitials(data.name);

  // Prepare chart data with previous value for change calculation
  const prices = data.sparkline_in_7d.price;
  const chartData = prices.map((price, index) => ({
    value: price,
    index,
    previousValue: index > 0 ? prices[index - 1] : price,
  }));

  // Determine price decimals based on price
  const priceDecimals = (() => {
    if (data.current_price >= 1000) return 2;
    if (data.current_price >= 1) return 2;
    if (data.current_price >= 0.01) return 4;
    return 6;
  })();

  return (
    <Link href={`/markets/coin/${data.id}`} className="block h-full">
      <Card className="h-full transition-all hover:shadow-md cursor-pointer">
        <CardHeader className="flex flex-row items-center gap-3 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
            {initials}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">{data.name}</h3>
            <p className="text-sm text-muted-foreground uppercase">
              {data.symbol}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-20 w-full min-w-0 overflow-visible">
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart
                data={chartData}
                margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`gradient-${data.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={isPositive ? '#22c55e' : '#ef4444'}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? '#22c55e' : '#ef4444'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 2"
                  stroke="rgba(255, 255, 255, 0.1)"
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{
                    stroke: isPositive ? '#22c55e' : '#ef4444',
                    strokeWidth: 1,
                    strokeDasharray: '0',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#22c55e' : '#ef4444'}
                  strokeWidth={1}
                  fill={`url(#gradient-${data.id})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-semibold">
              {formatPrice(data.current_price, priceDecimals)}
            </span>
            <span
              className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {formatPercentageChange(changePercentage)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
