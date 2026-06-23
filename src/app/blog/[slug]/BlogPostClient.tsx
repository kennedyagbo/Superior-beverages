'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock, User, Wine } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { BlogPost } from '@/types';

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <>
      <section className="relative pt-32 pb-10" style={{ background: 'linear-gradient(135deg, #722F37 0%, #5A252C 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs tracking-wider uppercase" style={{ color: '#C9A84C' }}>{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-3 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="aspect-video rounded-2xl mb-10 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.1), rgba(201,168,76,0.1))' }}>
              <Wine className="w-20 h-20" style={{ color: '#722F37', opacity: 0.2 }} />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <article className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-6">{paragraph}</p>
              ))}
            </article>
          </ScrollReveal>
          <ScrollReveal className="mt-12 pt-8 border-t border-muted">
            <div className="flex items-center justify-between">
              <Link href="/blog" className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#722F37' }}>
                &larr; Back to Blog
              </Link>
              <span className="text-sm text-muted-foreground">By {post.author}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
