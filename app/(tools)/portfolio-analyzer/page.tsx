'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StockInputForm from '@/components/portfolio/StockInputForm';
import AnalysisOutput from '@/components/portfolio/AnalysisOutput';
import { PortfolioAnalysisResponse } from '@/lib/types/portfolio';
import { TrendingUp, BarChart3, Target, Sparkles } from 'lucide-react';

export default function PortfolioAnalyzerPage() {
  const [analysisData, setAnalysisData] = useState<PortfolioAnalysisResponse | null>(null);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Analysis
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Portfolio Analyzer
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get comprehensive AI-powered analysis of your stock portfolio with personalized risk metrics,
              sector insights, and actionable recommendations
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-semibold mb-2">Risk Analysis</h3>
              <p className="text-slate-400 text-sm">
                Comprehensive risk metrics and diversification scoring
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Sector Allocation</h3>
              <p className="text-slate-400 text-sm">
                Detailed breakdown of your portfolio by industry sector
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-slate-400 text-sm">
                AI-generated insights and actionable investment strategies
              </p>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-8 mb-8">
            <StockInputForm onAnalysisComplete={setAnalysisData} />
          </div>

          {/* Analysis Results */}
          {analysisData && <AnalysisOutput data={analysisData} />}

          {/* Help Text */}
          {!analysisData && (
            <div className="text-center text-slate-500 text-sm mt-8">
              <p>💡 Tip: Add up to 5 stocks to analyze your portfolio</p>
              <p className="mt-2">Analysis takes 15-30 seconds and includes risk metrics, sector analysis, and AI recommendations</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
