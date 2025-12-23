export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export interface MomentumStock {
  symbol: string;
  name?: string;
  return_7d: number;
  return_21d: number;
  cluster?: string;
  momentum?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}
