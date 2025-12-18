'use client';

import { motion } from 'framer-motion';
import {
  ChartBar,
  TrendingUp,
  Cpu,
  Briefcase,
  Network,
  Brain,
  Cloud,
  Database
} from 'lucide-react';

const features = [
  {
    name: 'Quantitative Research',
    description: [
      'Our research team specializes in exploring advanced concepts like Community Detection, Network Analysis, and Centrality Measures to uncover hidden patterns in financial markets.',
      'We utilize state-of-the-art algorithms such as Louvain and Newman methods to build comprehensive market graphs, offering unique insights into market structure and dynamics.',
    ],
    icon: ChartBar,
  },
  {
    name: 'Data-Driven Investment Strategies',
    description: [
      'Our proprietary trading models are designed to capitalize on market inefficiencies. Strategies include:',
    ],
    strategies: [
      {
        name: 'Co-Integrated Pairs Arbitrage',
        desc: 'Exploiting statistical relationships between stocks for mean reversion opportunities.',
      },
      {
        name: 'Peripheral Stocks Strategy',
        desc: 'Using graph theory to identify and capitalize on undervalued stocks on the market\'s periphery.',
      },
    ],
    icon: TrendingUp,
  },
  {
    name: 'Innovative Tools and Technology',
    description: [
      'We integrate cutting-edge technologies like machine learning, GARCH models, and Relative Rotation Graphs (RRG) to provide actionable insights.',
      'Our robust backtesting engines ensure that every strategy is thoroughly validated for reliability and performance.',
    ],
    icon: Cpu,
  },
  {
    name: 'Custom Portfolio Management',
    description: [
      'Skylife Research offers bespoke portfolio solutions tailored to each client\'s goals and risk appetite.',
      'Our emphasis on risk-adjusted returns ensures sustainable growth over time.',
    ],
    icon: Briefcase,
  },
];

const technologies = [
  {
    name: 'Network Analysis',
    description: 'Creating market maps to identify clusters, central stocks, and peripheral opportunities.',
    icon: Network,
  },
  {
    name: 'Machine Learning',
    description: 'Using predictive models to identify trends and anomalies.',
    icon: Brain,
  },
  {
    name: 'AWS-Powered Infrastructure',
    description: 'Scalable cloud-based solutions for efficient data storage and processing.',
    icon: Cloud,
  },
  {
    name: 'Historical Data Integration',
    description: 'Leveraging Angel One data to build comprehensive models and trading strategies.',
    icon: Database,
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-semibold text-cyan-400 mb-2">What We Do</h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                About Us
              </h1>
              <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto">
                Pioneering quantitative research and network analysis to unlock market opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Technologies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Our Core Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{tech.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            What Sets Us Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-8 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">{feature.name}</h4>
                </div>
                <div className="space-y-3">
                  {feature.description.map((desc, i) => (
                    <p key={i} className="text-slate-400 text-sm leading-relaxed">
                      {desc}
                    </p>
                  ))}
                  {feature.strategies && (
                    <ul className="mt-4 space-y-3">
                      {feature.strategies.map((strategy, i) => (
                        <li key={i} className="ml-4">
                          <strong className="text-cyan-400">{strategy.name}:</strong>{' '}
                          <span className="text-slate-400 text-sm">{strategy.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-slate-800 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Investment Strategy?
            </h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Discover how our quantitative research and network analysis can help you make smarter investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get in Touch
              </a>
              <a
                href="/portfolio-analyzer"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 hover:border-cyan-500 transition-all duration-200"
              >
                Try Our Tools
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
