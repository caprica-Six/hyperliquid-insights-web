import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OverviewCard } from './OverviewCard';
import { mockMarketData } from '@/lib/mock-data/markets';
import { CryptoMarketData } from '@/types/crypto';

describe('OverviewCard', () => {
  const bitcoinData = mockMarketData[0];

  describe('Basic Rendering', () => {
    it('should render the coin name and symbol', () => {
      render(<OverviewCard data={bitcoinData} />);

      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText(/btc/i)).toBeInTheDocument();
    });

    it('should display current price', () => {
      render(<OverviewCard data={bitcoinData} />);

      expect(screen.getByText(/\$91/)).toBeInTheDocument();
    });

    it('should render the percentage change', () => {
      render(<OverviewCard data={bitcoinData} />);

      expect(screen.getByText(/\+0\.70%/)).toBeInTheDocument();
    });

    it('should render correct link href', () => {
      render(<OverviewCard data={bitcoinData} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/markets/coin/bitcoin');
    });

    it('should display coin badge with initials', () => {
      const { container } = render(<OverviewCard data={bitcoinData} />);
      const badgeDiv = container.querySelector('.rounded-full.bg-muted');
      expect(badgeDiv).toBeInTheDocument();
      expect(badgeDiv?.textContent?.trim()).toBeTruthy();
    });

    it('should render sparkline chart', () => {
      const { container } = render(<OverviewCard data={bitcoinData} />);
      const chartContainer = container.querySelector(
        '.recharts-responsive-container'
      );
      expect(chartContainer).toBeInTheDocument();
    });
  });

  describe('Price Formatting', () => {
    it('should format prices >= 1000 with 2 decimals and commas', () => {
      const highPriceData: CryptoMarketData = {
        ...bitcoinData,
        current_price: 5000.123,
      };
      render(<OverviewCard data={highPriceData} />);

      expect(screen.getByText(/\$5,000\.12/)).toBeInTheDocument();
    });

    it('should format prices >= 1 with 2 decimals', () => {
      const midPriceData: CryptoMarketData = {
        ...bitcoinData,
        current_price: 100.456,
      };
      render(<OverviewCard data={midPriceData} />);

      expect(screen.getByText(/\$100\.46/)).toBeInTheDocument();
    });

    it('should format prices >= 0.01 with 4 decimals', () => {
      const lowPriceData: CryptoMarketData = {
        ...bitcoinData,
        current_price: 0.123456,
      };
      render(<OverviewCard data={lowPriceData} />);

      expect(screen.getByText(/\$0\.1235/)).toBeInTheDocument();
    });

    it('should format prices < 0.01 with 6 decimals', () => {
      const veryLowPriceData: CryptoMarketData = {
        ...bitcoinData,
        current_price: 0.00123456,
      };
      render(<OverviewCard data={veryLowPriceData} />);

      expect(screen.getByText(/\$0\.001235/)).toBeInTheDocument();
    });
  });

  describe('Percentage Change Styling', () => {
    it('should handle negative percentage change', () => {
      const negativeData: CryptoMarketData = {
        ...bitcoinData,
        price_change_percentage_24h: -1.5,
      };
      render(<OverviewCard data={negativeData} />);

      expect(screen.getByText(/-1\.50%/)).toBeInTheDocument();
    });

    it('should apply red color for negative percentage change', () => {
      const negativeData: CryptoMarketData = {
        ...bitcoinData,
        price_change_percentage_24h: -2.5,
      };
      render(<OverviewCard data={negativeData} />);

      const changeElement = screen.getByText(/-2\.50%/);
      expect(changeElement).toHaveClass('text-red-500');
    });

    it('should apply green color for positive percentage change', () => {
      render(<OverviewCard data={bitcoinData} />);

      const changeElement = screen.getByText(/\+0\.70%/);
      expect(changeElement).toHaveClass('text-green-500');
    });

    it('should handle zero percentage change', () => {
      const zeroChangeData: CryptoMarketData = {
        ...bitcoinData,
        price_change_percentage_24h: 0,
      };
      render(<OverviewCard data={zeroChangeData} />);

      expect(screen.getByText(/\+0\.00%/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing sparkline data gracefully', () => {
      const dataWithoutSparkline: CryptoMarketData = {
        ...bitcoinData,
        sparkline_in_7d: { price: [] },
      };
      render(<OverviewCard data={dataWithoutSparkline} />);

      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    it('should handle very large price values', () => {
      const largeValueData: CryptoMarketData = {
        ...bitcoinData,
        current_price: 1000000.99,
      };
      render(<OverviewCard data={largeValueData} />);

      expect(screen.getByText(/\$1,000,000\.99/)).toBeInTheDocument();
    });

    it('should handle very small price values', () => {
      const tinyValueData: CryptoMarketData = {
        ...bitcoinData,
        current_price: 0.000001,
      };
      render(<OverviewCard data={tinyValueData} />);

      expect(screen.getByText(/\$0\.000001/)).toBeInTheDocument();
    });

    it('should handle large negative percentage change', () => {
      const largeNegativeData: CryptoMarketData = {
        ...bitcoinData,
        price_change_percentage_24h: -99.99,
      };
      render(<OverviewCard data={largeNegativeData} />);

      expect(screen.getByText(/-99\.99%/)).toBeInTheDocument();
    });

    it('should handle large positive percentage change', () => {
      const largePositiveData: CryptoMarketData = {
        ...bitcoinData,
        price_change_percentage_24h: 150.75,
      };
      render(<OverviewCard data={largePositiveData} />);

      expect(screen.getByText(/\+150\.75%/)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should have correct link href for navigation', () => {
      render(<OverviewCard data={bitcoinData} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/markets/coin/bitcoin');
    });

    it('should have proper accessibility attributes', () => {
      render(<OverviewCard data={bitcoinData} />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
    });
  });

  describe('Chart Integration', () => {
    it('should render chart with sparkline data', () => {
      const { container } = render(<OverviewCard data={bitcoinData} />);
      const chartContainer = container.querySelector(
        '.recharts-responsive-container'
      );
      expect(chartContainer).toBeInTheDocument();
    });

    it('should use correct chart data from sparkline_in_7d', () => {
      const customSparklineData: CryptoMarketData = {
        ...bitcoinData,
        sparkline_in_7d: {
          price: [100, 110, 105, 115, 120, 125, 130],
        },
      };
      const { container } = render(<OverviewCard data={customSparklineData} />);
      const chartContainer = container.querySelector(
        '.recharts-responsive-container'
      );
      expect(chartContainer).toBeInTheDocument();
    });
  });

  describe('Multiple Coin Support', () => {
    it('should render Ethereum card correctly', () => {
      const ethereumData = mockMarketData[1];
      render(<OverviewCard data={ethereumData} />);

      expect(screen.getByText('Ethereum')).toBeInTheDocument();

      const ethElements = screen.getAllByText(/eth/i);
      expect(ethElements.length).toBeGreaterThan(0);
    });

    it('should render Tether card correctly', () => {
      const tetherData = mockMarketData[2];
      render(<OverviewCard data={tetherData} />);

      expect(screen.getByText('Tether')).toBeInTheDocument();
      expect(screen.getByText(/usdt/i)).toBeInTheDocument();
    });

    it('should render different coins with different links', () => {
      const { unmount } = render(<OverviewCard data={bitcoinData} />);
      let link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/markets/coin/bitcoin');
      unmount();

      const ethereumData = mockMarketData[1];
      render(<OverviewCard data={ethereumData} />);
      link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/markets/coin/ethereum');
    });
  });
});
