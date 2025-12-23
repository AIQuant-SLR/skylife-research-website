import NetworkBackground from './NetworkBackground';
import StockClusterVisualizer from './StockClusterVisualizer';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden">
      <NetworkBackground />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            SYSTEM ONLINE: V2.0 BETA
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Trade the <br />
            <span className="gradient-text text-glow-strong">
              Hidden Network
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8 leading-relaxed border-l-2 border-slate-700 pl-6">
            Conventional indicators lag. We use <strong className="text-white">Graph Theory</strong> and{' '}
            <strong className="text-white">Community Detection</strong> algorithms to identify momentum
            clusters in the Indian Market before price action follows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/portfolio-analyzer" className="group bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-lg font-bold transition-all btn-glow flex items-center justify-center">
              Analyze My Portfolio
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/network-graph" className="px-8 py-4 rounded-lg border border-slate-700 hover:bg-slate-800 hover:border-slate-500 text-slate-300 font-medium transition-all flex items-center justify-center">
              <ActivityIcon className="mr-2 w-5 h-5 text-slate-500" />
              View Live Data
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-slate-500 text-sm font-mono">
            <div>
              <span className="block text-white font-bold text-xl">₹240Cr+</span>
              <span>Assets Modeled</span>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div>
              <span className="block text-white font-bold text-xl">90ms</span>
              <span>Cluster Latency</span>
            </div>
          </div>
        </div>

        {/* Right Content - Terminal Mockup */}
        <div className="hidden lg:block animate-float">
          <div className="glass-panel p-1 rounded-2xl shadow-2xl">
            <div className="bg-slate-950/80 rounded-xl p-6">
              {/* Terminal Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                </div>
                <span className="font-mono text-xs text-slate-500">
                  /usr/bin/market_graph --live
                </span>
              </div>

              {/* Stock Cluster Visualizer */}
              <StockClusterVisualizer />

              {/* Terminal Output */}
              <div className="mt-4 font-mono text-xs space-y-1 text-slate-400">
                <p>
                  <span className="text-green-500">➜</span> Analyzing NIFTY50 nodes...
                </p>
                <p>
                  <span className="text-green-500">➜</span> Louvain Modularity: 0.452 (Optimized)
                </p>
                <p>
                  <span className="text-cyan-500">➜</span> Detected 4 major momentum communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function ArrowRightIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}