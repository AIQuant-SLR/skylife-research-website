import { Metadata } from 'next';
import FAQContent from '@/components/faq/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ | Skylife Research',
  description: 'Find answers to frequently asked questions about Skylife Research\'s services, investment strategies, network analysis, and how to get started.',
  keywords: 'FAQ, questions, network analysis, investment strategies, quantitative finance, portfolio management',
};

export default function FAQPage() {
  return <FAQContent />;
}
