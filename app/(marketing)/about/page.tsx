import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Skylife Research',
  description: 'Learn about Skylife Research\'s quantitative investment strategies, network analysis techniques, and data-driven approach to portfolio management.',
  keywords: 'quantitative research, network analysis, investment strategies, portfolio management, algorithmic trading',
};

export default function AboutPage() {
  return <AboutContent />;
}
