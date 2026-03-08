import { PageLayout } from '@/components/PageLayout';
import { PageTitle } from '@/components/PageTitle';
import { OverviewCard } from '@/components/OverviewCard';
import { getMarketData } from '@/lib/api/coingecko';
import {
  getMostTraded,
  getTopGainers,
  getTopLosers,
} from '@/lib/mock-data/trend-helpers';
import { MarketTrendSection } from '@/components/MarketTrendSection';

export default async function HomePage() {
  const marketData = await getMarketData({ perPage: 4, revalidate: 60 });

  const mostTraded = getMostTraded(10);
  const topGainers = getTopGainers(10);
  const topLosers = getTopLosers(10);

  return (
    <PageLayout>
      <PageTitle>Markets overview</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {marketData.map((coin) => (
          <OverviewCard key={coin.id} data={coin} />
        ))}
      </div>

      <MarketTrendSection
        mostTraded={mostTraded}
        topGainers={topGainers}
        topLosers={topLosers}
      />
    </PageLayout>
  );
}
