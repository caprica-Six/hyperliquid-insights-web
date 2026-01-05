'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatPrice } from '@/lib/format';

interface CoinChartProps {
  data: Array<{ value: number; time: string }>;
  isPositive: boolean;
  coinId: string;
}

function ChartTooltip(props: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { value: number; time: string } }>;
}) {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md bg-black/80 border border-white/10 px-3 py-2 shadow-lg">
        <div className="text-white text-xs font-medium">
          {formatPrice(data.value)}
        </div>
        <div className="text-white/70 text-xs">{data.time}</div>
      </div>
    );
  }
  return null;
}

export function CoinChart({ data, isPositive, coinId }: CoinChartProps) {
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height={384}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={`gradient-${coinId}`}
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
          <XAxis dataKey="time" stroke="#888" fontSize={12} />
          <YAxis
            stroke="#888"
            fontSize={12}
            tickFormatter={(value) => formatPrice(value)}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#22c55e' : '#ef4444'}
            strokeWidth={2}
            fill={`url(#gradient-${coinId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
