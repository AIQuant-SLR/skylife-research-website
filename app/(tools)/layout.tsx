import Link from 'next/link';
import UserMenu from '@/components/auth/UserMenu';
import { BarChart3, Network, TrendingUp } from 'lucide-react';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Skylife Research
              </Link>
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/portfolio-analyzer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                  <BarChart3 className="w-4 h-4" />
                  Portfolio Analyzer
                </Link>
                <Link
                  href="/network-graph"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                  <Network className="w-4 h-4" />
                  Network Graph
                </Link>
                <Link
                  href="/momentum-stocks"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                >
                  <TrendingUp className="w-4 h-4" />
                  Momentum Stocks
                </Link>
              </div>
            </div>
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Skylife Research. All rights reserved.</p>
          <p className="mt-2">AI-powered portfolio analysis for the Indian stock market</p>
        </div>
      </footer>
    </div>
  );
}
