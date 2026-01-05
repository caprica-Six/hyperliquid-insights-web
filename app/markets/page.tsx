import { PageLayout } from '@/components/PageLayout';
import { PageTitle } from '@/components/PageTitle';
import { MarketsTable } from '@/components/MarketsTable';
import { getMarketsTableData } from '@/lib/api/coingecko';

export default async function MarketsPage() {
  const marketData = await getMarketsTableData({ revalidate: 60 });

  return (
    <PageLayout>
      <PageTitle>Markets</PageTitle>
      <MarketsTable data={marketData} />
    </PageLayout>
  );
}
