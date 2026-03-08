'use client';

import { MarketTrendCard } from './MarketTrendCard';
import { CryptoMarketData } from '@/types/crypto';

interface MarketTrendSectionProps {
  mostTraded: CryptoMarketData[];
  topGainers: CryptoMarketData[];
  topLosers: CryptoMarketData[];
}

export function MarketTrendSection({
  mostTraded,
  topGainers,
  topLosers,
}: MarketTrendSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <MarketTrendCard.Basic title="Most Traded Live Data" data={mostTraded} />
      <MarketTrendCard.WithVolume
        title="Top Gainers Live Data"
        data={topGainers}
      />
      <MarketTrendCard.WithVolume
        title="Top Losers Live Data"
        data={topLosers}
      />
    </div>
  );
}
