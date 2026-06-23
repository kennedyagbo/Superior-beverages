'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Wine, Search, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/data';

const categories = ['All', 'Wine Education', 'Healthy Living', 'Industry Updates', 'Company News', 'Product Launches'];

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #722F37 0%, #5A252C 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>Insights & Stories</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Blog & News</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">Stay informed with the latest from Superior Beverages.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'text-white shadow-lg' : 'text-muted-foreground hover:text-foreground bg-muted/50'}`} style={activeCategory === cat ? { background: 'linear-gradient(135deg, #722F37, #9B2335)' } : {}}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg border border-muted bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-burgundy w-full md:w-64" aria-label="Search articles" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="glass-card overflow-hidden">
                    <div className="h-48 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.1), rgba(201,168,76,0.1))' }}>
                      <Wine className="w-12 h-12" style={{ color: '#722F37', opacity: 0.3 }} />
                    </div>
                    <div className="p-6">
                      <span className="text-xs tracking-wider uppercase" style={{ color: '#C9A84C' }}>{post.category}</span>
                      <h3 className="text-base font-serif font-bold text-foreground mt-2 mb-2 group-hover:text-burgundy transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground">No articles found.</div>}
        </div>
      </section>
    </>
  );
}
