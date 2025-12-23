'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

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
  {
    question: 'How can I get started with Skylife Research?',
    answer:
      'Contact us through our website or email to discuss your investment goals. Our team will guide you through our process and help you design a strategy that aligns with your objectives.',
  },
];

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto">
                Find answers to common questions about our services, strategies, and approach
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="w-full flex justify-center">
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl"
        >
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="border-b border-slate-800 last:border-b-0 pb-6 last:pb-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left group"
                >
                  <span className="pr-4 text-base sm:text-lg lg:text-xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 group-hover:bg-cyan-500/20 flex items-center justify-center transition-all duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-slate-400 leading-relaxed text-sm sm:text-base lg:text-lg pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-slate-400 mb-6">
              We're here to help. Contact us and our team will get back to you shortly.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
