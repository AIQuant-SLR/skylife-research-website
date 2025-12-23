import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    platform: [
      { label: 'Portfolio Analyzer', href: '/portfolio-analyzer' },
      { label: 'Network Graph', href: '/network-graph' },
      { label: 'Momentum Stocks', href: '/momentum-stocks' },
      { label: 'Pricing', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/skylife_research/', icon: <InstagramIcon /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kedu/', icon: <LinkedInIcon /> },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <NetworkIcon className="w-10 h-10" />
              </div>
              <span className="text-xl font-bold text-white">
                SKYLIFE <span className="text-slate-400 font-light">RESEARCH</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mb-6">
              Skylife Research is a quantitative research firm specializing in graph theory
              and network analysis for the Indian Stock Market. We provide data-driven insights,
              not financial advice.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-slate-900 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Stay Updated with Market Insights
              </h3>
              <p className="text-sm text-slate-500">
                Get weekly reports on momentum clusters and network patterns.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; 2025 Skylife Research. All rights reserved.</p>
          <p className="mt-2 md:mt-0 max-w-lg text-center md:text-right">
            <span className="text-yellow-500">⚠</span> Disclaimer: Trading in financial markets involves risk.
            Past performance of graph models is not indicative of future results.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-6 text-xs font-mono">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span className="text-slate-500">API Status: Online</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
              <span className="text-slate-500">Version: 2.0.4</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
              <span className="text-slate-500">Build: Production</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
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

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" suppressHydrationWarning>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" suppressHydrationWarning>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}