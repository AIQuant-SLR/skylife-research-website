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
  title: "Skylife Research | Quantitative Trading & Network Analysis",
  description: "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market.",
  keywords: "quantitative trading, network analysis, graph theory, algorithmic trading, Indian stock market, momentum clusters",
  authors: [{ name: "Skylife Research" }],
  openGraph: {
    title: "Skylife Research | Quantitative Trading & Network Analysis",
    description: "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market.",
    type: "website",
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
