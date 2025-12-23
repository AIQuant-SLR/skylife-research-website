import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://skyliferesearch.com'),
  title: {
    default: "Skylife Research | Quantitative Trading & Network Analysis",
    template: "%s | Skylife Research",
  },
  description: "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market. Discover momentum clusters, network correlations, and data-driven trading strategies.",
  keywords: [
    "quantitative trading",
    "network analysis",
    "graph theory",
    "algorithmic trading",
    "Indian stock market",
    "NSE",
    "BSE",
    "momentum clusters",
    "community detection",
    "stock correlation",
    "portfolio optimization",
    "market intelligence",
    "trading algorithms",
    "financial networks",
    "data-driven trading"
  ],
  authors: [{ name: "Skylife Research", url: "https://skyliferesearch.com" }],
  creator: "Skylife Research",
  publisher: "Skylife Research",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skyliferesearch.com",
    title: "Skylife Research | Quantitative Trading & Network Analysis",
    description: "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market.",
    siteName: "Skylife Research",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Skylife Research - Quantitative Trading & Network Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skylife Research | Quantitative Trading & Network Analysis",
    description: "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market.",
    images: ["/opengraph-image"],
    creator: "@skyliferesearch",
  },
  category: "Finance & Trading",
  classification: "Financial Technology",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
