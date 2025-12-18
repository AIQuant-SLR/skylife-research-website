import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    platform: [
      { label: 'Market Lab', href: '#market-lab' },
      { label: 'Momentum Screeners', href: '#' },
      { label: 'API Docs', href: '#' },
      { label: 'Pricing', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy Policy', href: '#' },
    ],
    resources: [
      { label: 'Blog', href: '#' },
      { label: 'Research Papers', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'Support', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: <TwitterIcon /> },
    { name: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
    { name: 'GitHub', href: '#', icon: <GitHubIcon /> },
  ];

  return (
    <footer id="about" className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <NetworkIcon className="text-white w-5 h-5" />
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

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" suppressHydrationWarning>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
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

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" suppressHydrationWarning>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}