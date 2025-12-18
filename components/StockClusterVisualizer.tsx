"use client";

import { useState, useEffect } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  cluster: number;
  momentum: string;
  size: number;
}

export default function StockClusterVisualizer() {
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data fetching - replace with real API call in production
  const mockFetchClusters = (): Promise<Node[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'BAJFINANCE', x: 50, y: 40, cluster: 1, momentum: '+12.4%', size: 30 },
          { id: 'TATASTEEL', x: 20, y: 60, cluster: 2, momentum: '+8.1%', size: 24 },
          { id: 'ADANIENT', x: 80, y: 30, cluster: 1, momentum: '+15.2%', size: 28 },
          { id: 'INFY', x: 60, y: 70, cluster: 3, momentum: '-2.1%', size: 26 },
          { id: 'HDFCBANK', x: 40, y: 20, cluster: 1, momentum: '+5.5%', size: 32 },
          { id: 'RELIANCE', x: 70, y: 55, cluster: 2, momentum: '+4.2%', size: 34 },
          { id: 'TCS', x: 30, y: 45, cluster: 3, momentum: '+7.8%', size: 30 },
          { id: 'ICICIBANK', x: 55, y: 25, cluster: 1, momentum: '+9.2%', size: 28 },
          { id: 'WIPRO', x: 45, y: 65, cluster: 3, momentum: '-1.5%', size: 22 },
          { id: 'AXISBANK', x: 65, y: 45, cluster: 2, momentum: '+6.3%', size: 26 },
        ]);
      }, 1500); // Simulating network latency
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchClusters();
        setNodes(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch market data", err);
        setError("Failed to load market graph.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getClusterColor = (cluster: number) => {
    const colors = {
      1: 'from-cyan-500 to-blue-500',
      2: 'from-purple-500 to-pink-500',
      3: 'from-green-500 to-emerald-500',
    };
    return colors[cluster as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="relative w-full h-[400px] bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50"></div>

      {/* Status Header */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center space-x-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
          <span className={`text-xs font-mono ${loading ? 'text-yellow-400' : 'text-green-400'}`}>
            {loading ? 'ESTABLISHING CONNECTION...' : 'LIVE MARKET GRAPH'}
          </span>
        </div>
        <h3 className="text-sm text-slate-400">Louvain Method: Cluster Detection</h3>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/20 backdrop-blur-sm">
          <div className="loader mb-4"></div>
          <span className="text-xs font-mono text-cyan-400">Fetching Node Data...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-red-400 text-sm font-mono">{error}</div>
        </div>
      )}

      {/* Interactive Nodes */}
      {!loading && !error && (
        <div className="relative w-full h-full">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map((node, i) => {
              return nodes.slice(i + 1).map((otherNode, j) => {
                if (node.cluster === otherNode.cluster) {
                  const opacity = activeNode?.cluster === node.cluster ? 0.3 : 0.1;
                  return (
                    <line
                      key={`${node.id}-${otherNode.id}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${otherNode.x}%`}
                      y2={`${otherNode.y}%`}
                      stroke="rgba(34, 211, 238, 0.5)"
                      strokeWidth="1"
                      strokeOpacity={opacity}
                      className="transition-opacity duration-300"
                    />
                  );
                }
                return null;
              });
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute cursor-pointer group transition-all duration-500 ease-out"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Node Circle */}
              <div
                className={`
                  rounded-full flex items-center justify-center border shadow-lg backdrop-blur-sm transition-all
                  ${activeNode?.id === node.id
                    ? 'scale-125 z-20 border-cyan-400'
                    : 'border-slate-600 hover:border-cyan-500/50'
                  }
                  ${activeNode && activeNode.cluster === node.cluster
                    ? 'border-cyan-500/50 bg-gradient-to-br ' + getClusterColor(node.cluster)
                    : 'bg-slate-800/80'
                  }
                `}
                style={{
                  width: node.size + 20 + 'px',
                  height: node.size + 20 + 'px',
                }}
              >
                <span className="text-[10px] font-bold text-white text-center leading-tight drop-shadow-lg">
                  {node.id}
                </span>
              </div>

              {/* Tooltip */}
              {activeNode?.id === node.id && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-36 bg-slate-950/95 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-xl z-30 animate-fade-in">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Symbol</span>
                      <span className="text-white font-mono">{node.id}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Cluster</span>
                      <span className="text-cyan-400 font-mono">#{node.cluster}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Momentum</span>
                      <span className={node.momentum.includes('+') ? 'text-green-400 font-mono' : 'text-red-400 font-mono'}>
                        {node.momentum}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-[10px] text-slate-500">
                        Network Centrality: {(Math.random() * 0.5 + 0.5).toFixed(3)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}