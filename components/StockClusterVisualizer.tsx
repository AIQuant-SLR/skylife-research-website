"use client";

import { useState, useEffect } from 'react';

interface ApiNode {
  id: string;
  cluster: number;
  momentum: string;
  returns_7days: number;
  returns_21days: number;
  size: number;
}

interface Node extends ApiNode {
  x: number;
  y: number;
  centrality: number;
}

export default function StockClusterVisualizer() {
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate positions for nodes based on their clusters
  const generateNodePositions = (apiNodes: ApiNode[]): Node[] => {
    // Group nodes by cluster
    const clusterGroups: { [key: number]: ApiNode[] } = {};
    apiNodes.forEach(node => {
      if (!clusterGroups[node.cluster]) {
        clusterGroups[node.cluster] = [];
      }
      clusterGroups[node.cluster].push(node);
    });

    const clusters = Object.keys(clusterGroups).map(k => parseInt(k));
    const clusterCount = clusters.length;

    // Assign cluster center positions in a circular pattern
    const clusterCenters: { [key: number]: { x: number; y: number } } = {};
    clusters.forEach((clusterId, index) => {
      const angle = (index / clusterCount) * 2 * Math.PI;
      clusterCenters[clusterId] = {
        x: 50 + Math.cos(angle) * 30, // 30% radius from center
        y: 50 + Math.sin(angle) * 30,
      };
    });

    // Position nodes around their cluster centers
    const positionedNodes: Node[] = [];
    Object.entries(clusterGroups).forEach(([clusterId, clusterNodes]) => {
      const center = clusterCenters[parseInt(clusterId)];
      clusterNodes.forEach((node, index) => {
        const angle = (index / clusterNodes.length) * 2 * Math.PI;
        const radius = 10 + Math.random() * 8; // Random radius for natural spread

        positionedNodes.push({
          ...node,
          x: Math.max(10, Math.min(90, center.x + Math.cos(angle) * radius)),
          y: Math.max(10, Math.min(90, center.y + Math.sin(angle) * radius)),
          centrality: Math.random() * 0.5 + 0.5, // Will be replaced with real data later
        });
      });
    });

    return positionedNodes;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stocks/clusters');

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const apiData: ApiNode[] = await response.json();
        const positionedData = generateNodePositions(apiData);
        setNodes(positionedData);
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
                  const opacity = activeNode?.cluster === node.cluster ? 0.8 : 0.65;
                  return (
                    <line
                      key={`${node.id}-${otherNode.id}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${otherNode.x}%`}
                      y2={`${otherNode.y}%`}
                      stroke="#a78bfa"
                      strokeWidth="2"
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
                        Network Centrality: {node.centrality.toFixed(3)}
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