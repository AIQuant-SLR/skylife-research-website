export interface NetworkNode {
  id: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  cluster?: number;
  momentum?: string;
  size?: number;
}

export interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  weight: number;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  links: NetworkLink[];
  timestamp?: string;
}

export interface StockCluster {
  level: string;
  stocks: string[];
  correlation_range: string;
}
