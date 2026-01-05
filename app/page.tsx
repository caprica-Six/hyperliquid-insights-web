import { PageLayout } from '@/components/PageLayout';
import { PageTitle } from '@/components/PageTitle';
import { OverviewCard } from '@/components/OverviewCard';
import { getMarketData } from '@/lib/api/coingecko';

export default async function HomePage() {
  // Fetch market data from CoinGecko API with fallback to mock data
  const marketData = await getMarketData({ perPage: 4, revalidate: 60 });

  return (
    <PageLayout withContainer={true}>
      <PageTitle>Markets overview</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {marketData.map((coin) => (
          <OverviewCard key={coin.id} data={coin} />
        ))}
      </div>
    </PageLayout>
  );
}
