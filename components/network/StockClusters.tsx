'use client';

import { NetworkGraphData } from '@/lib/types/network';
import { X } from 'lucide-react';

interface Props {
  data: NetworkGraphData;
  isOpen: boolean;
  onClose: () => void;
}

interface Cluster {
  level: string;
  stocks: string[];
  correlation_range: string;
  color: string;
}

export default function StockClusters({ data, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  // Group stocks by cluster
  const clusterMap = new Map<number, string[]>();
  data.nodes.forEach(node => {
    const clusterId = node.cluster || 0;
    if (!clusterMap.has(clusterId)) {
      clusterMap.set(clusterId, []);
    }
    clusterMap.get(clusterId)!.push(node.id);
  });

  // Calculate correlation statistics from links
  const correlationStats = data.links.reduce((acc, link) => {
    const weight = link.weight;
    if (weight >= 0.7) acc.high++;
    else if (weight >= 0.65) acc.moderate++;
    else if (weight >= 0.6) acc.weak++;
    else acc.low++;
    return acc;
  }, { high: 0, moderate: 0, weak: 0, low: 0 });

  const clusters: Cluster[] = [
    {
      level: 'Highly Correlated',
      stocks: data.links
        .filter(link => link.weight >= 0.7)
        .flatMap(link => [
          typeof link.source === 'object' ? link.source.id : link.source,
          typeof link.target === 'object' ? link.target.id : link.target,
        ])
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 20),
      correlation_range: '≥ 0.70',
      color: '#22d3ee',
    },
    {
      level: 'Moderately Correlated',
      stocks: data.links
        .filter(link => link.weight >= 0.65 && link.weight < 0.7)
        .flatMap(link => [
          typeof link.source === 'object' ? link.source.id : link.source,
          typeof link.target === 'object' ? link.target.id : link.target,
        ])
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 20),
      correlation_range: '0.65 - 0.69',
      color: '#8b5cf6',
    },
    {
      level: 'Weakly Correlated',
      stocks: data.links
        .filter(link => link.weight >= 0.6 && link.weight < 0.65)
        .flatMap(link => [
          typeof link.source === 'object' ? link.source.id : link.source,
          typeof link.target === 'object' ? link.target.id : link.target,
        ])
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 20),
      correlation_range: '0.60 - 0.64',
      color: '#10b981',
    },
    {
      level: 'Low Correlation',
      stocks: data.links
        .filter(link => link.weight < 0.6)
        .flatMap(link => [
          typeof link.source === 'object' ? link.source.id : link.source,
          typeof link.target === 'object' ? link.target.id : link.target,
        ])
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 20),
      correlation_range: '< 0.60',
      color: '#f59e0b',
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:right-4 md:top-4 md:bottom-4 md:w-[500px] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Stock Correlation Clusters</h2>
            <p className="text-sm text-slate-400 mt-1">
              {data.nodes.length} stocks • {data.links.length} connections
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-3 p-6 border-b border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">
              {correlationStats.high}
            </div>
            <div className="text-xs text-slate-400 mt-1">High Correlation</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              {correlationStats.moderate}
            </div>
            <div className="text-xs text-slate-400 mt-1">Moderate</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {correlationStats.weak}
            </div>
            <div className="text-xs text-slate-400 mt-1">Weak</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-amber-400">
              {correlationStats.low}
            </div>
            <div className="text-xs text-slate-400 mt-1">Low</div>
          </div>
        </div>

        {/* Clusters List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {clusters.map((cluster, idx) => (
            cluster.stocks.length > 0 && (
              <div key={idx} className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cluster.color }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{cluster.level}</div>
                    <div className="text-xs text-slate-400">
                      Correlation: {cluster.correlation_range}
                    </div>
                  </div>
                  <div className="bg-slate-700 px-2 py-1 rounded text-xs font-semibold">
                    {cluster.stocks.length}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cluster.stocks.slice(0, 15).map((stock, stockIdx) => (
                    <span
                      key={stockIdx}
                      className="px-2 py-1 bg-slate-900 text-slate-300 text-xs rounded font-mono"
                    >
                      {stock}
                    </span>
                  ))}
                  {cluster.stocks.length > 15 && (
                    <span className="px-2 py-1 text-slate-500 text-xs">
                      +{cluster.stocks.length - 15} more
                    </span>
                  )}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          Correlations calculated from recent market data. Higher values indicate stronger co-movement.
        </div>
      </div>
    </>
  );
}
