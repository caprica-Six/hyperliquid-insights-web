import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  MarketTrendCardBasic,
  MarketTrendCardWithVolume,
} from './MarketTrendCard';
import { mockMarketData } from '@/lib/mock-data/markets';
import { CryptoMarketData } from '@/types/crypto';

describe('MarketTrendCard variants', () => {
  const data: CryptoMarketData[] = mockMarketData;

  it('renders title and at least one row', () => {
    render(<MarketTrendCardBasic title="My Card" data={data} />);
    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByText(/btc/i)).toBeInTheDocument();
  });

  it('does not render the volume column in the basic variant', () => {
    render(<MarketTrendCardBasic title="No Vol" data={data} />);
    expect(screen.queryByText(/24H Volume/)).toBeNull();
  });

  it('renders the volume column in the with-volume variant', () => {
    render(<MarketTrendCardWithVolume title="With Vol" data={data} />);
    expect(screen.getByText(/24H Volume/)).toBeInTheDocument();
    // first coin in mock data has total_volume 25,000,000,000 which formats to 25.00B
    expect(screen.getByText(/\$25\.00B/)).toBeInTheDocument();
  });

  it('shows empty-state message when data array is empty', () => {
    render(<MarketTrendCardBasic title="Empty" data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
