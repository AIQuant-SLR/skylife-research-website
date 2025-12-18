"use client";

import { useState } from 'react';

export default function Services() {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const features = [
    "Daily 'Cluster Momentum' Reports",
    "Portfolio Risk Graph Visualization",
    "Co-Integrated Pairs Arbitrage Signals",
    "Peripheral Stock Breakout Alerts",
    "Real-time Network Analysis Dashboard",
    "API Access for Algorithmic Trading",
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Essential tools for individual traders',
      price: '₹999',
      period: '/month',
      features: features.slice(0, 3),
      color: 'from-slate-600 to-slate-700',
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Full API & Dashboard Access',
      price: '₹2,999',
      period: '/month',
      features: features.slice(0, 5),
      color: 'from-cyan-500 to-blue-600',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for institutions',
      price: 'Custom',
      period: '',
      features: features,
      color: 'from-purple-500 to-pink-600',
      popular: false,
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>
            PRICING & SERVICES
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Institutional Grade, <span className="gradient-text">Retail Accessible</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Whether you are a high-net-worth individual or a proprietary trading desk,
            our data feeds and reports give you the "Quant Advantage."
          </p>
        </div>

        {/* Features List */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              What You'll Get
            </h3>
            <ul className="space-y-6">
              {features.map((item, index) => (
                <li key={index} className="flex items-center text-slate-300 group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <ZapIcon className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-10 border-b border-cyan-400 text-cyan-400 pb-1 hover:text-cyan-300 transition-colors font-mono text-sm uppercase tracking-widest">
              Download Sample Report
            </button>
          </div>

          {/* Live Stats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transform rotate-3 rounded-2xl opacity-10 blur-xl"></div>
            <div className="relative glass-panel rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Live Platform Stats</h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Active Traders</span>
                  <span className="text-2xl font-bold text-cyan-400">1,247</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Signals Generated Today</span>
                  <span className="text-2xl font-bold text-green-400">342</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Avg. Signal Accuracy</span>
                  <span className="text-2xl font-bold text-purple-400">78.4%</span>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Server Capacity</span>
                    <span className="text-sm font-mono text-slate-400">72%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative card-hover ${
                selectedPlan === plan.id ? 'scale-105' : ''
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`relative overflow-hidden rounded-2xl border ${
                plan.popular ? 'border-cyan-500/50' : 'border-slate-800'
              } bg-slate-900/50 backdrop-blur p-8 h-full cursor-pointer`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5`}></div>

                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-300">
                        <CheckIcon className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}>
                    {plan.id === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </button>

                  {plan.id !== 'enterprise' && (
                    <p className="text-center text-xs text-slate-500 mt-4">
                      No credit card required for 7-day trial
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-4">
            Need a custom solution? We work with hedge funds and proprietary trading firms.
          </p>
          <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Schedule a Demo →
          </button>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      suppressHydrationWarning
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      suppressHydrationWarning
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}