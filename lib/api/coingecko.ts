import { CryptoMarketData, CoinDetailData } from '@/types/crypto';
import { mockMarketData } from '@/lib/mock-data/markets';
import { mockCoinDetails } from '@/lib/mock-data/coin-details';

const BASE_URL =
  process.env.NEXT_PUBLIC_COINGECKO_API_URL ||
  'https://api.coingecko.com/api/v3';

/**
 * Fetches market data for cryptocurrencies from CoinGecko API
 * Falls back to mock data if API request fails
 *
 * @param options - Fetch options
 * @param options.perPage - Number of coins to fetch (default: 4)
 * @param options.revalidate - Revalidation time in seconds (default: 60)
 * @returns Promise<CryptoMarketData[]> - Array of market data
 */
export async function getMarketData(options?: {
  perPage?: number;
  revalidate?: number;
}): Promise<CryptoMarketData[]> {
  const perPage = options?.perPage ?? 4;
  const revalidate = options?.revalidate ?? 60;

  try {
    const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=24h`;

    const res = await fetch(url, {
      next: { revalidate },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`CoinGecko API error: ${res.status} ${res.statusText}`);
    }

    const data: CryptoMarketData[] = await res.json();

    // Validate that we got data
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid data format from API');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch market data from CoinGecko API:', error);
    console.log('Falling back to mock data...');

    // Return mock data as fallback
    return mockMarketData.slice(0, perPage);
  }
}

/**
 * Fetches detailed coin data from CoinGecko API
 * Falls back to mock data if API request fails
 *
 * @param coinId - The coin ID (e.g., 'bitcoin', 'ethereum')
 * @param options - Fetch options
 * @param options.revalidate - Revalidation time in seconds (default: 60)
 * @returns Promise<CoinDetailData | null> - Coin detail data or null if not found
 */
export async function getCoinDetail(
  coinId: string,
  options?: {
    revalidate?: number;
  }
): Promise<CoinDetailData | null> {
  const revalidate = options?.revalidate ?? 60;

  try {
    const url = `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    const res = await fetch(url, {
      next: { revalidate },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Coin not found
      }
      throw new Error(`CoinGecko API error: ${res.status} ${res.statusText}`);
    }

    const data: CoinDetailData = await res.json();

    // Validate that we got data
    if (!data || !data.id) {
      throw new Error('Invalid data format from API');
    }

    return data;
  } catch (error) {
    console.error(
      `Failed to fetch coin detail for ${coinId} from CoinGecko API:`,
      error
    );
    console.log('Falling back to mock data...');

    // Return mock data as fallback
    return mockCoinDetails[coinId] || null;
  }
}

/**
 * Fetches market data for a specific coin (for sparkline chart)
 * Falls back to mock data if API request fails
 *
 * @param coinId - The coin ID (e.g., 'bitcoin', 'ethereum')
 * @param options - Fetch options
 * @param options.revalidate - Revalidation time in seconds (default: 60)
 * @returns Promise<CryptoMarketData | null> - Market data or null if not found
 */
export async function getCoinMarketData(
  coinId: string,
  options?: {
    revalidate?: number;
  }
): Promise<CryptoMarketData | null> {
  const revalidate = options?.revalidate ?? 60;

  try {
    const url = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinId}&sparkline=true&price_change_percentage=24h`;

    const res = await fetch(url, {
      next: { revalidate },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`CoinGecko API error: ${res.status} ${res.statusText}`);
    }

    const data: CryptoMarketData[] = await res.json();

    // Validate that we got data
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error(
      `Failed to fetch market data for ${coinId} from CoinGecko API:`,
      error
    );
    console.log('Falling back to mock data...');

    // Return mock data as fallback
    return mockMarketData.find((coin) => coin.id === coinId) || null;
  }
}
