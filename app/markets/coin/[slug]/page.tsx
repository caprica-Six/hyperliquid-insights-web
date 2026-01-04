import { PageLayout } from '@/components/PageLayout';
import { PageTitle } from '@/components/PageTitle';
import { mockCoinDetails } from '@/lib/mock-data/coin-details';
import { mockMarketData } from '@/lib/mock-data/markets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice, formatPercentageChange } from '@/lib/format';
import { cn } from '@/lib/utils';
import { CoinChart } from '@/components/CoinChart';

interface CoinPageProps {
  params: Promise<{ slug: string }>;
}

function getHostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return null;
  }
}

function renderLink(url: string, index: number) {
  const hostname = getHostname(url);
  if (!hostname) return null;

  return (
    <a
      key={index}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-sky-600 hover:text-sky-500 hover:underline"
    >
      {hostname}
    </a>
  );
}

function renderHomepageLinks(urls: string[]) {
  if (urls.length === 0) return null;

  return (
    <div>
      <div className="text-xs text-muted-foreground uppercase mb-2">
        Website
      </div>
      <div className="flex flex-wrap gap-2">
        {urls.map((url, index) => renderLink(url, index))}
      </div>
    </div>
  );
}

function renderBlockchainLinks(urls: string[]) {
  if (urls.length === 0) return null;

  return (
    <div>
      <div className="text-xs text-muted-foreground uppercase mb-2">
        Blockchain Explorer
      </div>
      <div className="flex flex-wrap gap-2">
        {urls.map((url, index) => renderLink(url, index))}
      </div>
    </div>
  );
}

export default async function CoinPage({ params }: CoinPageProps) {
  const { slug } = await params;
  const coinDetail = mockCoinDetails[slug];
  const marketData = mockMarketData.find((coin) => coin.id === slug);

  if (!coinDetail || !marketData) {
    return (
      <PageLayout withContainer={true}>
        <PageTitle>Coin not found</PageTitle>
      </PageLayout>
    );
  }

  const currentPrice = coinDetail.market_data.current_price.usd;
  const priceChange24h = coinDetail.market_data.price_change_24h;
  const priceChangePercentage24h =
    coinDetail.market_data.price_change_percentage_24h;
  const isPositive = priceChangePercentage24h >= 0;

  // Generate chart data from sparkline (24h data)
  const sparklinePrices = marketData.sparkline_in_7d.price.slice(-24); // Last 24 hours
  const chartData = sparklinePrices.map((price, index) => ({
    value: price,
    time: `${String(Math.floor(index / 2) + 4).padStart(2, '0')}:${String((index % 2) * 30).padStart(2, '0')}`,
  }));

  return (
    <PageLayout withContainer={true}>
      <div className="mb-6">
        <PageTitle>
          {coinDetail.name} ({coinDetail.symbol.toUpperCase()})
        </PageTitle>

        <div className="flex items-baseline gap-4 mt-4">
          <div className="text-4xl font-bold">{formatPrice(currentPrice)}</div>
          <div
            className={cn(
              'text-lg',
              isPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            {formatPrice(priceChange24h)} (
            {formatPercentageChange(priceChangePercentage24h)}) 24H
          </div>
        </div>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <CoinChart data={chartData} isPositive={isPositive} coinId={slug} />
        </CardContent>
      </Card>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Demo content inspired by tokenized equity dashboards.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{coinDetail.description.en}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase mb-1">
                  Category
                </div>
                <div className="text-sm">
                  {coinDetail.categories.join(', ')}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase mb-1">
                  Algorithm
                </div>
                <div className="text-sm">{coinDetail.hashing_algorithm}</div>
              </div>
            </div>

            {(coinDetail.links.homepage.length > 0 ||
              coinDetail.links.blockchain_site.length > 0) && (
              <div className="pt-4 border-t space-y-3">
                {renderHomepageLinks(coinDetail.links.homepage)}
                {renderBlockchainLinks(coinDetail.links.blockchain_site)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Section */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Token price and underlying asset stats over the last 24 hours
              using dummy data.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase mb-2">
                Token Price - 24H
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Open</div>
                  <div>{formatPrice(coinDetail.market_data.low_24h.usd)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">High</div>
                  <div>{formatPrice(coinDetail.market_data.high_24h.usd)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Low</div>
                  <div>{formatPrice(coinDetail.market_data.low_24h.usd)}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-xs text-muted-foreground uppercase mb-1">
                  Total Market Cap
                </div>
                <div className="text-sm">
                  {formatPrice(coinDetail.market_data.market_cap.usd)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase mb-1">
                  24H Volume
                </div>
                <div className="text-sm">
                  {formatPrice(coinDetail.market_data.total_volume.usd)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
