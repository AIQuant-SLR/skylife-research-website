export interface Stock {
  symbol: string;
  name: string;
  sector?: string;
}

export interface StockInput {
  symbol: string;
  quantity: number;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
}
