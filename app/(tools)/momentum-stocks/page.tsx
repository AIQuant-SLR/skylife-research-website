'use client';

import { useState } from 'react';
import useSWR from 'swr';
import StocksTable, { MomentumStock } from '@/components/momentum/StocksTable';
import { TrendingUp, RefreshCw, Download, Info } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MomentumStocksPage() {
  const { data, error, isLoading, mutate } = useSWR<MomentumStock[]>(
    '/api/stocks/list',
    fetcher,
    {
      refreshInterval: 300000, // Auto-refresh every 5 minutes
      revalidateOnFocus: false,
    }
  );

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;

    // Create CSV content
    const headers = ['Date', 'Top Momentum Stocks', '7-Day Return (%)', '21-Day Return (%)'];
    const rows = data.map(stock => [
      stock.date,
      stock.stocks,
      stock.returns_7days.toFixed(2),
      stock.returns_21days.toFixed(2),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `momentum-stocks-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-lg mb-2">Loading momentum stocks...</p>
          <p className="text-slate-500 text-sm">Fetching latest market data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Data</h2>
          <p className="text-slate-400 mb-6">
            Unable to fetch momentum stocks data. Please try again.
          </p>
          <button
            onClick={() => mutate()}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const avgReturn7Days = data && data.length > 0
    ? data.reduce((sum, s) => sum + s.returns_7days, 0) / data.length
    : 0;

  const avgReturn21Days = data && data.length > 0
    ? data.reduce((sum, s) => sum + s.returns_21days, 0) / data.length
    : 0;

  const maxReturn7Days = data && data.length > 0
    ? Math.max(...data.map(s => s.returns_7days))
    : 0;

  const maxReturn21Days = data && data.length > 0
    ? Math.max(...data.map(s => s.returns_21days))
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Top Momentum Stocks
                </h1>
              </div>
              <p className="text-slate-400 text-lg">
                Network cluster-based momentum analysis for superior risk-adjusted returns
              </p>
              {data && data.length > 0 && (
                <p className="text-slate-500 text-sm mt-1">
                  Last updated: {new Date().toLocaleString()} • Auto-refreshes every 5 minutes
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => mutate()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleExportCSV}
                disabled={!data || data.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Total Entries</div>
            <div className="text-3xl font-bold text-white">{data?.length || 0}</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Avg 7-Day Return</div>
            <div className={`text-3xl font-bold ${avgReturn7Days >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {avgReturn7Days >= 0 ? '+' : ''}{avgReturn7Days.toFixed(2)}%
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Avg 21-Day Return</div>
            <div className={`text-3xl font-bold ${avgReturn21Days >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
              {avgReturn21Days >= 0 ? '+' : ''}{avgReturn21Days.toFixed(2)}%
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Peak 21-Day Return</div>
            <div className={`text-3xl font-bold ${maxReturn21Days >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
              {maxReturn21Days >= 0 ? '+' : ''}{maxReturn21Days.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-2">About Network Cluster Analysis</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">
                Our clustering approach leverages network analysis to group stocks with similar momentum patterns,
                enabling targeted investment strategies with superior risk-adjusted returns.
              </p>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• <strong className="text-slate-300">Network-based clustering</strong> identifies stocks with correlated momentum</li>
                <li>• <strong className="text-slate-300">7-day returns</strong> show short-term performance trends</li>
                <li>• <strong className="text-slate-300">21-day returns</strong> indicate medium-term momentum strength</li>
                <li>• Click column headers to sort by different metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stocks Table */}
        {data && <StocksTable data={data} onExportCSV={handleExportCSV} />}
      </div>
    </div>
  );
}
