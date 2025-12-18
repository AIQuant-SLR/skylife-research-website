'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Calendar, Package } from 'lucide-react';

export interface MomentumStock {
  date: string;
  stocks: string;
  cluster?: number;
  returns_21days: number;
  returns_7days: number;
}

interface Props {
  data: MomentumStock[];
  onExportCSV?: () => void;
}

type SortField = 'date' | 'returns_7days' | 'returns_21days';
type SortDirection = 'asc' | 'desc';

export default function StocksTable({ data, onExportCSV }: Props) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new field
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];

    sorted.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'returns_7days':
          aValue = a.returns_7days;
          bValue = b.returns_7days;
          break;
        case 'returns_21days':
          aValue = a.returns_21days;
          bValue = b.returns_21days;
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [data, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-slate-500" />;
    }
    return sortDirection === 'asc'
      ? <ArrowUp className="w-4 h-4 text-cyan-400" />
      : <ArrowDown className="w-4 h-4 text-cyan-400" />;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatReturn = (value: number) => {
    const formatted = value.toFixed(2);
    const isPositive = value >= 0;
    return (
      <div className={`flex items-center justify-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="font-semibold">{isPositive ? '+' : ''}{formatted}%</span>
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
        <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 text-lg">No momentum stocks data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-2 font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Date
                  <SortIcon field="date" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 font-semibold text-slate-300">
                  <Package className="w-4 h-4" />
                  Top Momentum Stocks
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <button
                  onClick={() => handleSort('returns_7days')}
                  className="flex items-center justify-center gap-2 font-semibold text-slate-300 hover:text-cyan-400 transition-colors mx-auto"
                >
                  7-Day Return
                  <SortIcon field="returns_7days" />
                </button>
              </th>
              <th className="px-6 py-4 text-center">
                <button
                  onClick={() => handleSort('returns_21days')}
                  className="flex items-center justify-center gap-2 font-semibold text-slate-300 hover:text-cyan-400 transition-colors mx-auto"
                >
                  21-Day Return
                  <SortIcon field="returns_21days" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((stock, index) => (
              <tr
                key={`${stock.date}-${index}`}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{formatDate(stock.date)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-300 text-sm leading-relaxed">
                    {stock.stocks}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {formatReturn(stock.returns_7days)}
                </td>
                <td className="px-6 py-4 text-center">
                  {formatReturn(stock.returns_21days)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Stats */}
      <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div>
            Showing <span className="text-white font-semibold">{sortedData.length}</span> entries
          </div>
          <div className="flex items-center gap-4">
            <div>
              Avg 7-Day: <span className="text-cyan-400 font-semibold">
                {(sortedData.reduce((sum, s) => sum + s.returns_7days, 0) / sortedData.length).toFixed(2)}%
              </span>
            </div>
            <div>
              Avg 21-Day: <span className="text-purple-400 font-semibold">
                {(sortedData.reduce((sum, s) => sum + s.returns_21days, 0) / sortedData.length).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
