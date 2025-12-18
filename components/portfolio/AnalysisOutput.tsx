'use client';

import { useState } from 'react';
import { PortfolioAnalysisResponse } from '@/lib/types/portfolio';
import { TrendingUp, AlertTriangle, Target, Download, Share2, BarChart3 } from 'lucide-react';

interface Props {
  data: PortfolioAnalysisResponse;
}

type TabType = 'overview' | 'risk' | 'recommendations';

export default function AnalysisOutput({ data }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: BarChart3 },
    { id: 'risk' as TabType, label: 'Risk Analysis', icon: AlertTriangle },
    { id: 'recommendations' as TabType, label: 'Recommendations', icon: Target },
  ];

  return (
    <div className="mt-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden">
      {/* Header with actions */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Portfolio Analysis Results
            </h2>
            {data.timestamp && (
              <p className="text-slate-400 text-sm mt-1">
                Generated on {new Date(data.timestamp).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
              onClick={() => alert('Download PDF feature coming soon!')}
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download PDF</span>
            </button>
            <button
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
              onClick={() => alert('Share feature coming soon!')}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 border-b border-slate-800 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 pt-2 px-4 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-b-2 border-cyan-500 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Executive Summary */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Executive Summary
              </h3>
              <p className="text-slate-300 leading-relaxed">{data.analysis}</p>
            </div>

            {/* Holdings Table */}
            {data.holdings && data.holdings.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-lg">Portfolio Holdings</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-slate-400">
                          Stock
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-slate-400">
                          Sector
                        </th>
                        <th className="text-right py-3 px-2 text-sm font-semibold text-slate-400">
                          Quantity
                        </th>
                        <th className="text-right py-3 px-2 text-sm font-semibold text-slate-400">
                          Price
                        </th>
                        <th className="text-right py-3 px-2 text-sm font-semibold text-slate-400">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.holdings.map((holding, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 px-2 font-semibold text-white">
                            {holding.stock}
                          </td>
                          <td className="py-3 px-2 text-slate-400">{holding.sector}</td>
                          <td className="py-3 px-2 text-right text-slate-300">
                            {holding.quantity}
                          </td>
                          <td className="py-3 px-2 text-right text-slate-300">
                            ₹{holding.current_price.toFixed(2)}
                          </td>
                          <td className="py-3 px-2 text-right font-semibold text-white">
                            ₹{holding.total_value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-slate-800/30 font-bold">
                        <td colSpan={4} className="py-3 px-2 text-right">
                          Total Portfolio Value:
                        </td>
                        <td className="py-3 px-2 text-right text-cyan-400">
                          ₹{data.holdings.reduce((sum, h) => sum + h.total_value, 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sector Allocation */}
            {data.sector_allocation && Object.keys(data.sector_allocation).length > 0 && (
              <div>
                <h4 className="font-semibold mb-4 text-lg">Sector Allocation</h4>
                <div className="space-y-3">
                  {Object.entries(data.sector_allocation)
                    .sort(([, a], [, b]) => b - a)
                    .map(([sector, percentage]) => (
                      <div key={sector}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-slate-300 font-medium">{sector}</span>
                          <span className="font-semibold text-white">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            {/* Risk Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Portfolio Risk
                </div>
                <div className="text-3xl font-bold">
                  {data.risk_metrics.portfolio_risk.toFixed(2)}%
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Lower is better
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Diversification Score
                </div>
                <div className="text-3xl font-bold">
                  {data.risk_metrics.diversification_score.toFixed(1)}
                  <span className="text-lg text-slate-400">/10</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Higher is better
                </p>
              </div>
            </div>

            {/* Risk Factors */}
            {data.risk_factors && data.risk_factors.length > 0 && (
              <div>
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Risk Factors
                </h4>
                <ul className="space-y-3">
                  {data.risk_factors.map((factor, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg"
                    >
                      <span className="text-amber-400 text-lg flex-shrink-0">⚠</span>
                      <span className="text-slate-300">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sector Concentration */}
            {data.risk_metrics.sector_concentration && (
              <div>
                <h4 className="font-semibold mb-3 text-lg">Sector Concentration Risk</h4>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-400 text-sm mb-3">
                    High concentration in any sector increases portfolio risk
                  </p>
                  <div className="space-y-2">
                    {Object.entries(data.risk_metrics.sector_concentration)
                      .sort(([, a], [, b]) => b - a)
                      .map(([sector, percentage]) => (
                        <div key={sector} className="flex justify-between text-sm">
                          <span className="text-slate-300">{sector}</span>
                          <span className={percentage > 30 ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {/* Immediate Actions */}
            {data.immediate_actions && data.immediate_actions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-400" />
                  Immediate Actions
                </h4>
                <ul className="space-y-3">
                  {data.immediate_actions.map((action, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-500/20 rounded-lg"
                    >
                      <span className="text-red-400 text-lg flex-shrink-0">→</span>
                      <span className="text-slate-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medium-Term Strategy */}
            {data.medium_term_actions && data.medium_term_actions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Medium-Term Strategy
                </h4>
                <ul className="space-y-3">
                  {data.medium_term_actions.map((action, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg"
                    >
                      <span className="text-blue-400 text-lg flex-shrink-0">→</span>
                      <span className="text-slate-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All Recommendations */}
            {data.recommendations && data.recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  General Recommendations
                </h4>
                <ul className="space-y-3">
                  {data.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-green-500/5 border border-green-500/20 rounded-lg"
                    >
                      <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                      <span className="text-slate-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
