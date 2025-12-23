import { StockInput } from './stock';

export interface PortfolioAnalysisRequest {
  stocks: StockInput[];
  email: string;
  uid: string;
  custom_instructions?: string;
  market_context?: boolean;
}

export interface PortfolioHolding {
  stock: string;
  sector: string;
  quantity: number;
  current_price: number;
  total_value: number;
}

export interface RiskMetrics {
  portfolio_risk: number;
  diversification_score: number;
  sector_concentration?: Record<string, number>;
}

export interface PortfolioAnalysisResponse {
  analysis: string;
  holdings: PortfolioHolding[];
  sector_allocation: Record<string, number>;
  risk_metrics: RiskMetrics;
  recommendations: string[];
  immediate_actions: string[];
  medium_term_actions: string[];
  risk_factors: string[];
  timestamp?: string;
}
