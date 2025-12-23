'use client';

import { useState } from 'react';
import useSWR from 'swr';
import D3NetworkGraph from '@/components/network/D3NetworkGraph';
import StockClusters from '@/components/network/StockClusters';
import { NetworkGraphData, NetworkNode } from '@/lib/types/network';
import { Network, Info, RefreshCw, Layers } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function NetworkGraphPage() {
  const { data, error, isLoading, mutate } = useSWR<NetworkGraphData>(
    '/api/network-graph',
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: false,
    }
  );

  const [showClusters, setShowClusters] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [minWeight, setMinWeight] = useState(0.55); // Minimum correlation weight to display

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-lg mb-2">Loading network graph...</p>
          <p className="text-slate-500 text-sm">Analyzing stock correlations</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Network className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Network Graph</h2>
          <p className="text-slate-400 mb-6">
            Unable to fetch network graph data. Please try again.
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

  // Filter links by minimum weight
  const filteredData = data && data.nodes && data.links ? {
    nodes: data.nodes,
    links: data.links.filter(link => link.weight >= minWeight),
  } : { nodes: [], links: [] };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Stock Correlation Network
                </h1>
              </div>
              <p className="text-slate-400 text-lg">
                Interactive visualization of stock correlations and market clusters
              </p>
              {data?.timestamp && (
                <p className="text-slate-500 text-sm mt-1">
                  Last updated: {new Date(data.timestamp).toLocaleString()}
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
                onClick={() => setShowClusters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">View Clusters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Minimum Correlation: {minWeight.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.5"
                max="0.8"
                step="0.05"
                value={minWeight}
                onChange={(e) => setMinWeight(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0.50 (Weak)</span>
                <span>0.80 (Strong)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Cluster 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-slate-400">Cluster 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400">Cluster 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Total Stocks</div>
            <div className="text-3xl font-bold text-white">{data?.nodes?.length || 0}</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Connections</div>
            <div className="text-3xl font-bold text-cyan-400">{filteredData?.links?.length || 0}</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Avg Correlation</div>
            <div className="text-3xl font-bold text-purple-400">
              {filteredData?.links?.length > 0
                ? (filteredData.links.reduce((sum, link) => sum + link.weight, 0) / filteredData.links.length).toFixed(2)
                : '0.00'}
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Clusters</div>
            <div className="text-3xl font-bold text-green-400">
              {data?.nodes ? new Set(data.nodes.map(n => n.cluster)).size : 0}
            </div>
          </div>
        </div>

        {/* Graph Container */}
        <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          {data && (
            <div className="flex justify-center">
              <D3NetworkGraph
                data={filteredData}
                width={1000}
                height={600}
                onNodeClick={setSelectedNode}
              />
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="mt-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white mb-2">How to Use</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• <strong className="text-slate-300">Hover over nodes</strong> to see stock information and highlight connections</li>
                <li>• <strong className="text-slate-300">Drag nodes</strong> to reposition them in the graph</li>
                <li>• <strong className="text-slate-300">Scroll</strong> to zoom in/out</li>
                <li>• <strong className="text-slate-300">Click and drag</strong> the background to pan around</li>
                <li>• <strong className="text-slate-300">Adjust the slider</strong> to filter by correlation strength</li>
                <li>• Line thickness indicates correlation strength between stocks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Selected Node Info */}
        {selectedNode && (
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              {selectedNode.id}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-slate-400 mb-1">Connections</div>
                <div className="text-2xl font-bold text-white">
                  {filteredData.links.filter(l =>
                    (typeof l.source === 'object' ? l.source.id : l.source) === selectedNode.id ||
                    (typeof l.target === 'object' ? l.target.id : l.target) === selectedNode.id
                  ).length}
                </div>
              </div>
              <div>
                <div className="text-slate-400 mb-1">Avg Correlation</div>
                <div className="text-2xl font-bold text-cyan-400">
                  {(() => {
                    const connectedLinks = filteredData.links.filter(l =>
                      (typeof l.source === 'object' ? l.source.id : l.source) === selectedNode.id ||
                      (typeof l.target === 'object' ? l.target.id : l.target) === selectedNode.id
                    );
                    if (connectedLinks.length === 0) return '0.00';
                    const avg = connectedLinks.reduce((sum, l) => sum + l.weight, 0) / connectedLinks.length;
                    return avg.toFixed(2);
                  })()}
                </div>
              </div>
              {selectedNode.momentum && (
                <div>
                  <div className="text-slate-400 mb-1">Momentum</div>
                  <div className="text-2xl font-bold text-purple-400">{selectedNode.momentum}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Clusters Modal */}
      {data && (
        <StockClusters
          data={filteredData}
          isOpen={showClusters}
          onClose={() => setShowClusters(false)}
        />
      )}
    </div>
  );
}
