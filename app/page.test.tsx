import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';
import { mockMarketData } from '@/lib/mock-data/markets';

// Mock the API function
vi.mock('@/lib/api/coingecko', () => ({
  getMarketData: vi.fn(() => Promise.resolve(mockMarketData.slice(0, 4))),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the markets overview title', async () => {
    const HomePageComponent = await HomePage();
    render(HomePageComponent);
    const pageTitle = screen.getByText('Markets overview');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should render all overview cards', async () => {
    const HomePageComponent = await HomePage();
    render(HomePageComponent);
    const coinLinks = screen.getAllByRole('link');
    const coinCardLinks = coinLinks.filter((link) =>
      link.getAttribute('href')?.startsWith('/markets/coin/')
    );

    expect(coinCardLinks.length).toBeGreaterThanOrEqual(4);

    const overviewCardIds = mockMarketData.slice(0, 4).map((coin) => coin.id);
    overviewCardIds.forEach((id) => {
      expect(
        coinCardLinks.some(
          (link) => link.getAttribute('href') === `/markets/coin/${id}`
        )
      ).toBe(true);
    });
  });

  it('should render coin names in cards', async () => {
    const HomePageComponent = await HomePage();
    render(HomePageComponent);
    mockMarketData.slice(0, 4).forEach((coin) => {
      const coinNames = screen.getAllByText(coin.name);
      expect(coinNames.length).toBeGreaterThan(0);
    });
  });

  it('should render all market trend card titles', async () => {
    const HomePageComponent = await HomePage();
    render(HomePageComponent);
    expect(screen.getByText('Most Traded Live Data')).toBeInTheDocument();
    expect(screen.getByText('Top Gainers Live Data')).toBeInTheDocument();
    expect(screen.getByText('Top Losers Live Data')).toBeInTheDocument();
  });
});
