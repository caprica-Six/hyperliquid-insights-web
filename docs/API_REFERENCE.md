# 🔌 API Reference

This document covers the CoinGecko API integration, including all available functions, configuration, error handling, and extension guides.

## CoinGecko API Integration

The application fetches real-time cryptocurrency data from the [CoinGecko API](https://www.coingecko.com/en/api). All API functions are located in `/lib/api/coingecko.ts` and include automatic fallback to mock data on failure.

### Configuration

Create a `.env.local` file in the root directory:

```bash
# CoinGecko API Base URL
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3

# Optional: API Key for higher rate limits
# COINGECKO_API_KEY=your_api_key_here
```

See `.env.local.example` for reference.

### API Functions

#### `getMarketData(options?)`

Fetches market overview data for the homepage cards.

**Parameters:**

- `options.perPage` (optional): Number of coins to fetch (default: `4`)
- `options.revalidate` (optional): Revalidation time in seconds (default: `60`)

**Returns:** `Promise<CryptoMarketData[]>`

**Usage:**

```typescript
const marketData = await getMarketData({
  perPage: 4,
  revalidate: 60,
});
```

**Used in:** `/app/page.tsx` (Homepage)

---

#### `getCoinDetail(coinId, options?)`

Fetches detailed coin information for coin detail pages.

**Parameters:**

- `coinId` (required): The coin ID (e.g., `'bitcoin'`, `'ethereum'`)
- `options.revalidate` (optional): Revalidation time in seconds (default: `60`)

**Returns:** `Promise<CoinDetailData | null>` (returns `null` if coin not found)

**Usage:**

```typescript
const coinDetail = await getCoinDetail('bitcoin', {
  revalidate: 60,
});
```

**Used in:** `/app/markets/coin/[slug]/page.tsx` (Coin detail page)

---

#### `getCoinMarketData(coinId, options?)`

Fetches market data for a specific coin (includes sparkline for charts).

**Parameters:**

- `coinId` (required): The coin ID (e.g., `'bitcoin'`, `'ethereum'`)
- `options.revalidate` (optional): Revalidation time in seconds (default: `60`)

**Returns:** `Promise<CryptoMarketData | null>` (returns `null` if coin not found)

**Usage:**

```typescript
const marketData = await getCoinMarketData('bitcoin', {
  revalidate: 60,
});
```

**Used in:** `/app/markets/coin/[slug]/page.tsx` (Coin detail page - for sparkline chart)

---

#### `getMarketsTableData(options?)`

Fetches market data for the markets table (up to 75 coins for 3 pages of pagination).

**Parameters:**

- `options.revalidate` (optional): Revalidation time in seconds (default: `60`)

**Returns:** `Promise<CryptoMarketData[]>` (max 75 items)

**Usage:**

```typescript
const tableData = await getMarketsTableData({
  revalidate: 60,
});
```

**Used in:** `/app/markets/page.tsx` (Markets table page)

**Note:** Fetches 75 items (3 pages × 25 items per page) to support pagination.

### Error Handling

All API functions include:

- ✅ **Automatic fallback** to mock data on API failure
- ✅ **Error logging** for debugging
- ✅ **Type-safe responses** with TypeScript
- ✅ **404 handling** for `getCoinDetail` and `getCoinMarketData` (returns `null`)
- ✅ **Data validation** to ensure response format is correct

### Caching Strategy

- **Server Components**: Uses Next.js `fetch` with `revalidate` option
- **Default**: 60 seconds revalidation
- **Configurable**: Per-function revalidation time
- **Next.js ISR**: Automatic static regeneration for optimal performance

### Mock Data Fallback

When API requests fail, the application automatically falls back to mock data located in `/lib/mock-data/`:

- `markets.ts` - Market data for homepage cards
- `coin-details.ts` - Detailed coin information
- `markets-table.ts` - Market data for table (25 items, duplicated to 75 for testing)

This ensures the application remains functional even when the API is unavailable.

## Extension Guide

To add new API functions:

1. Add the function to `/lib/api/coingecko.ts`
2. Include error handling and fallback logic
3. Export from the file
4. Use in components with proper TypeScript types

For client-side features requiring API routes, see [AI_INTEGRATION.md](AI_INTEGRATION.md).

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System design and data flow
- [AI_INTEGRATION.md](AI_INTEGRATION.md) - AI-ready features and API routes
