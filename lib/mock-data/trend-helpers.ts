import { CryptoMarketData } from '@/types/crypto';
import { mockMarketsTableData } from './markets-table';

/**
 * Get the most traded coins (sorted by volume)
 */
export function getMostTraded(limit: number = 10): CryptoMarketData[] {
  return [...mockMarketsTableData]
    .sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0))
    .slice(0, limit);
}

/**
 * Get top gainers (sorted by 24h price change percentage)
 */
export function getTopGainers(limit: number = 10): CryptoMarketData[] {
  return [...mockMarketsTableData]
    .filter((coin) => coin.price_change_percentage_24h > 0)
    .sort(
      (a, b) =>
        (b.price_change_percentage_24h || 0) -
        (a.price_change_percentage_24h || 0)
    )
    .slice(0, limit);
}

/**
 * Get top losers (sorted by 24h price change percentage, ascending)
 */
export function getTopLosers(limit: number = 10): CryptoMarketData[] {
  return [...mockMarketsTableData]
    .filter((coin) => coin.price_change_percentage_24h < 0)
    .sort(
      (a, b) =>
        (a.price_change_percentage_24h || 0) -
        (b.price_change_percentage_24h || 0)
    )
    .slice(0, limit);
}
