export default function Features() {
  const features = [
    {
      icon: <NetworkIcon className="w-8 h-8 text-cyan-400" />,
      title: "Community Detection",
      description: "We don't just look at price. We map the relationships between stocks. When a 'Leader' moves, the 'Cluster' follows.",
      gradient: "from-cyan-500/10 to-blue-500/10",
      borderColor: "hover:border-cyan-500/30",
    },
    {
      icon: <LayersIcon className="w-8 h-8 text-purple-400" />,
      title: "Cluster Analysis",
      description: "Identify which sectors are acting in unison. Our algorithms group stocks by momentum behavior, not just industry definitions.",
      gradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "hover:border-purple-500/30",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-400" />,
      title: "Institutional Risk",
      description: "Move beyond Stop-Loss. Use Centrality Measures to understand if your portfolio is exposed to a single failure point.",
      gradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "hover:border-green-500/30",
    },
  ];

  return (
    <section id="methodology" className="py-24 bg-slate-950 relative">
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            ADVANCED METHODOLOGY
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Beyond Technical Analysis
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Most traders use charts. We use <span className="text-cyan-400 font-semibold">Mathematics</span>.
            Our proprietary engine builds a live graph of the Indian market to find inefficiencies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-panel glass-panel-hover card-hover p-8 rounded-xl border border-slate-800 ${feature.borderColor} transition-all group`}
            >
              {/* Icon Container */}
              <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>

              {/* Decorative Element */}
              <div className="mt-6 pt-6 border-t border-slate-800/50">
                <div className="flex items-center text-xs font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-green-500/50 mr-2"></span>
                  Algorithm Status: Active
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 rounded-xl border border-slate-800 bg-slate-900/30 backdrop-blur">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Stocks Tracked", icon: <TrendingUpIcon className="w-4 h-4" /> },
              { value: "18", label: "Clusters Identified", icon: <NetworkIcon className="w-4 h-4" /> },
              { value: "2.8s", label: "Analysis Time", icon: <ZapIcon className="w-4 h-4" /> },
              { value: "24/7", label: "Real-time Risk Monitoring", icon: <ActivityIcon className="w-4 h-4" /> },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-center text-cyan-400 mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function NetworkIcon({ className }: { className?: string }) {
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
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
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
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

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