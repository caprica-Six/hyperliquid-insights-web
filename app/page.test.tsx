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
    expect(coinCardLinks).toHaveLength(4);
  });

  it('should render coin names in cards', async () => {
    const HomePageComponent = await HomePage();
    render(HomePageComponent);
    mockMarketData.slice(0, 4).forEach((coin) => {
      const coinName = screen.getByText(coin.name);
      expect(coinName).toBeInTheDocument();
    });
  });
});
