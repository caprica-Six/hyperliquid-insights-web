'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  FilterFn,
} from '@tanstack/react-table';
import { CryptoMarketData } from '@/types/crypto';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';

const columns: ColumnDef<CryptoMarketData>[] = [
  {
    accessorKey: 'market_cap_rank',
    header: 'Rank',
    size: 80,
  },
  {
    id: 'coin',
    header: 'Symbol',
    cell: ({ row }) => (
      <Link
        href={`/markets/coin/${row.original.id}`}
        className="flex items-center gap-3 hover:opacity-80"
      >
        <Image
          src={row.original.image}
          alt={row.original.name}
          className="w-8 h-8 rounded-full"
          width={32}
          height={32}
        />
        <div>
          <div className="font-medium">{row.original.symbol.toUpperCase()}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.name}
          </div>
        </div>
      </Link>
    ),
    size: 150,
  },
  {
    accessorKey: 'current_price',
    header: 'Price',
    cell: ({ getValue }) => {
      const value = getValue() as number | null | undefined;
      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      return `$${
        value >= 1
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : value.toFixed(6)
      }`;
    },
  },
  {
    accessorKey: 'price_change_percentage_24h',
    header: 'Change % 24h',
    cell: ({ getValue }) => {
      const value = getValue() as number | null | undefined;
      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      return (
        <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>
          {value >= 0 ? '+' : ''}
          {value.toFixed(2)}%
        </span>
      );
    },
  },
  {
    accessorKey: 'market_cap',
    header: 'Market cap',
    cell: ({ getValue }) => {
      const value = getValue() as number | null | undefined;
      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      if (value >= 1e12) return `${(value / 1e12).toFixed(2)} T`;
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
      return `$${value.toLocaleString()}`;
    },
  },
  {
    accessorKey: 'total_volume',
    header: 'Volume 24h',
    cell: ({ getValue }) => {
      const value = getValue() as number | null | undefined;
      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
      return `$${value.toLocaleString()}`;
    },
  },
  {
    accessorKey: 'circulating_supply',
    header: 'Circ supply',
    cell: ({ getValue }) => {
      const value = getValue() as number | null | undefined;
      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
      return value.toLocaleString();
    },
  },
  {
    id: 'volume_to_market_cap',
    header: 'Vol / Market Cap',
    cell: ({ row }) => {
      const ratio =
        row.original.total_volume && row.original.market_cap
          ? row.original.total_volume / row.original.market_cap
          : null;
      if (ratio === null) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      return ratio.toFixed(4);
    },
  },
  {
    id: 'social_dominance',
    header: 'Social dominance %',
    cell: () => {
      // This would come from additional API data
      return 'N/A';
    },
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }) => {
      // You can map this from your coin details data
      const categoryMap: Record<string, string> = {
        bitcoin: 'Cryptocurrencies, Layer 1',
        ethereum: 'Smart contract platforms, Layer 1',
        tether: 'Stablecoins, Asset-backed',
        solana: 'Smart contract platforms, Layer 1',
      };
      return (
        <span className="text-sm text-muted-foreground">
          {categoryMap[row.original.id] || 'Cryptocurrency'}
        </span>
      );
    },
  },
];

interface MarketsTableProps {
  data: CryptoMarketData[];
}

const globalFilterFn: FilterFn<CryptoMarketData> = (row, columnId, value) => {
  const filterValue = value as string;

  // If no filter value, show all rows
  if (
    !filterValue ||
    typeof filterValue !== 'string' ||
    filterValue.trim() === ''
  ) {
    return true;
  }

  const search = filterValue.toLowerCase().trim();
  const coin = row.original;

  // Check if search matches name, symbol, or id
  return (
    (coin.name?.toLowerCase().includes(search) ?? false) ||
    (coin.symbol?.toLowerCase().includes(search) ?? false) ||
    (coin.id?.toLowerCase().includes(search) ?? false)
  );
};

export function MarketsTable({ data }: MarketsTableProps) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(globalFilter);
    }, 300);

    return () => clearTimeout(timer);
  }, [globalFilter]);

  const validatedData = useMemo(() => {
    if (!Array.isArray(data)) {
      console.error('MarketsTable: Invalid data provided, expected array');
      return [];
    }
    return data.filter((item) => {
      return (
        item && typeof item === 'object' && item.id && item.name && item.symbol
      );
    });
  }, [data]);

  const table = useReactTable({
    data: validatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn,
    enableGlobalFilter: true,
    state: {
      globalFilter: debouncedFilter,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  // Reset to first page when filter changes
  useEffect(() => {
    table.setPageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

  // Early return: no data
  if (validatedData.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No market data available.</p>
      </div>
    );
  }

  // Get paginated rows (automatically applies filtering and pagination)
  const paginatedRows = table.getRowModel().rows;
  const filteredRowCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-4">
      {/* Search Box */}
      <div className="relative w-full max-w-sm my-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search coins..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredRowCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{' '}
            {filteredRowCount === 0
              ? 0
              : table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1}{' '}
            to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              filteredRowCount
            )}{' '}
            of {filteredRowCount} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-primary/20 hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-primary/20 hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
