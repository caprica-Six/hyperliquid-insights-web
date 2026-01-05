import { PageLayout } from '@/components/PageLayout';
import { PageTitle } from '@/components/PageTitle';
import { OverviewCard } from '@/components/OverviewCard';
import { mockMarketData } from '@/lib/mock-data/markets';

export default function HomePage() {
  return (
    <PageLayout withContainer={true}>
      <PageTitle>Markets overview</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {mockMarketData.map((coin) => (
          <OverviewCard key={coin.id} data={coin} />
        ))}
      </div>
    </PageLayout>
  );
}
