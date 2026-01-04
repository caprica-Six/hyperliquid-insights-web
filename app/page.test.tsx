import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';
import { mockMarketData } from '@/lib/mock-data/markets';

describe('HomePage', () => {
  it('should render the markets overview title', () => {
    render(<HomePage />);
    const pageTitle = screen.getByText('Markets overview');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should render all overview cards', () => {
    render(<HomePage />);
    const coinLinks = screen.getAllByRole('link');
    const coinCardLinks = coinLinks.filter((link) =>
      link.getAttribute('href')?.startsWith('/markets/coin/')
    );
    expect(coinCardLinks).toHaveLength(mockMarketData.length);
  });

  it('should render coin names in cards', () => {
    render(<HomePage />);
    mockMarketData.forEach((coin) => {
      const coinName = screen.getByText(coin.name);
      expect(coinName).toBeInTheDocument();
    });
  });
});
