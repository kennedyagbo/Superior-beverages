'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { X, ChevronLeft, ChevronRight, Factory, Wine, Warehouse, Truck, Calendar, Camera } from 'lucide-react';

const categories = ['All', 'Factory', 'Products', 'Warehouse', 'Distribution', 'Events'];

const galleryItems = [
  { id: 1, category: 'Factory', title: 'Production Line', icon: Factory, color: '#722F37' },
  { id: 2, category: 'Factory', title: 'Quality Control Lab', icon: Factory, color: '#9B2335' },
  { id: 3, category: 'Products', title: 'Champagne Bottling', icon: Wine, color: '#C9A84C' },
  { id: 4, category: 'Products', title: 'Wine Production', icon: Wine, color: '#722F37' },
  { id: 5, category: 'Products', title: 'Water Processing', icon: Wine, color: '#1B2A4A' },
  { id: 6, category: 'Warehouse', title: 'Main Warehouse', icon: Warehouse, color: '#722F37' },
  { id: 7, category: 'Warehouse', title: 'Cold Storage', icon: Warehouse, color: '#1B2A4A' },
  { id: 8, category: 'Distribution', title: 'Delivery Fleet', icon: Truck, color: '#722F37' },
  { id: 9, category: 'Distribution', title: 'Loading Bay', icon: Truck, color: '#9B2335' },
  { id: 10, category: 'Events', title: 'Product Launch 2024', icon: Calendar, color: '#C9A84C' },
  { id: 11, category: 'Events', title: 'Trade Fair Exhibition', icon: Calendar, color: '#722F37' },
  { id: 12, category: 'Factory', title: 'Bottling Machine', icon: Factory, color: '#1B2A4A' },
];

export default function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #722F37 0%, #1B2A4A 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>
            Visual Tour
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore our facilities, products, and operations through our curated photo collection.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'text-white shadow-lg' : 'text-muted-foreground hover:text-foreground bg-muted/50'}`}
                style={activeCategory === cat ? { background: 'linear-gradient(135deg, #722F37, #9B2335)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer group"
                  onClick={() => setLightbox(item.id)}
                >
                  <div className="aspect-square rounded-xl overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <item.icon className="w-12 h-12 transition-transform group-hover:scale-110" style={{ color: item.color, opacity: 0.4 }} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-white/50 text-xs">{item.category}</p>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setLightbox(null)} aria-label="Close lightbox">
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full aspect-video rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1B2A4A, #722F37)' }} onClick={(e) => e.stopPropagation()}>
              {(() => {
                const item = galleryItems.find((g) => g.id === lightbox);
                if (!item) return null;
                return (
                  <div className="text-center">
                    <item.icon className="w-24 h-24 mx-auto mb-4" style={{ color: item.color, opacity: 0.5 }} />
                    <h3 className="text-2xl font-serif font-bold text-white">{item.title}</h3>
                    <p className="text-white/50 mt-2">{item.category}</p>
                  </div>
                );
              })()}
            </div>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox > 1 ? lightbox - 1 : galleryItems.length); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox < galleryItems.length ? lightbox + 1 : 1); }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
