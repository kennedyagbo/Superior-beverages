'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/lib/data';
import { ChevronDown, Search } from 'lucide-react';

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter((f) => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #722F37 0%, #5A252C 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Frequently Asked Questions</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-white/70 max-w-2xl mx-auto mb-8">Find answers to common questions about our products and services.</motion.p>
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="text" placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/30" aria-label="Search FAQs" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'text-white shadow-lg' : 'text-muted-foreground hover:text-foreground bg-muted/50'}`} style={activeCategory === cat ? { background: 'linear-gradient(135deg, #722F37, #9B2335)' } : {}}>
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <ScrollReveal key={faq.id} delay={i * 0.05}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-6 py-5 text-left flex items-center justify-between gap-4" aria-expanded={openIndex === i}>
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform" style={{ transform: openIndex === i ? 'rotate(180deg)' : '' }} />
                  </button>
                  <motion.div initial={false} animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground">No questions found matching your search.</div>}
        </div>
      </section>
    </>
  );
}
