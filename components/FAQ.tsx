"use client";

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'What makes Skylife Research unique?',
    answer:
      'Skylife Research combines advanced network analysis and quantitative finance techniques to deliver high-performance investment strategies. Our focus on community detection and graph theory sets us apart in the financial industry.',
  },
  {
    question: 'What is network analysis, and how does it benefit investors?',
    answer:
      'Network analysis involves mapping relationships between stocks to identify clusters and patterns. This approach uncovers hidden market dynamics, helping investors make more informed decisions.',
  },
  {
    question: 'How does Skylife Research ensure the reliability of its strategies?',
    answer:
      'We use robust backtesting engines and rigorous validation methods to ensure our strategies are reliable, risk-adjusted, and scalable in real-world market conditions.',
  },
  {
    question: 'What types of clients do you work with?',
    answer:
      'We cater to individual investors, institutional clients, and portfolio managers looking for innovative, data-driven investment solutions tailored to their unique goals.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Got Questions? <span className="gradient-text">We've Got Answers</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Learn more about our approach and how we can help you make better trading decisions.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl border border-slate-800 overflow-hidden transition-all hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center group"
                >
                  <span className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <MinusIcon className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <PlusIcon className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View All FAQs Link */}
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              View All FAQs
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function PlusIcon({ className }: { className?: string }) {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

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
