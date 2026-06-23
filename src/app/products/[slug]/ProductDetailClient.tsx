'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Download, Package, Check, GlassWater, ShoppingCart } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/lib/data';
import type { Product } from '@/types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const inquiryFormRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section className="relative pt-32 pb-10" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{product.subcategory}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#C9A84C' }}>{product.tagline}</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-3">{product.name}</h1>
          </motion.div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <ScrollReveal direction="left">
              <div>
                {/* Main Image */}
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src={product.images[activeImage]}
                    alt={`${product.name} - image ${activeImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden relative transition-all ${i === activeImage ? 'ring-2 ring-offset-2' : 'opacity-50 hover:opacity-80'}`}
                      style={i === activeImage ? { outline: `2px solid ${product.color}`, outlineOffset: '2px' } : {}}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4" style={{ background: product.color }}>
                  {product.subcategory}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">{product.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{product.longDescription}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C9A84C' }} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging */}
                <div className="mb-8">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" style={{ color: '#722F37' }} /> Packaging Options
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.packaging.map((pkg) => (
                      <div key={pkg.size} className="glass-card p-4">
                        <div className="text-base font-bold text-foreground">{pkg.size}</div>
                        <div className="text-xs text-muted-foreground">{pkg.type} | {pkg.unitsPerCarton} units/carton</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { setInquirySent(true); setTimeout(() => setInquirySent(false), 3000); }}
                    className="btn-outline inline-flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inquirySent ? 'Inquiry Sent!' : 'Wholesale Inquiry'}
                  </button>
                  <button className="btn-outline inline-flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Brochure
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits & Serving */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--background) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ScrollReveal>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Benefits</h3>
              <div className="space-y-3">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 glass-card p-4">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#C9A84C' }} />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Serving Suggestions</h3>
              <div className="space-y-3">
                {product.servingSuggestions.map((suggestion) => (
                  <div key={suggestion} className="flex items-start gap-3 glass-card p-4">
                    <GlassWater className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#722F37' }} />
                    <span className="text-sm text-foreground">{suggestion}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="You May Also Like" title="Related Products" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ORDER FORM - TEMPORARILY DISABLED ===== */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center">
              <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#C9A84C' }}>Order System</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">Coming Soon</h2>
              <p className="text-white/70 mt-4 text-lg">We're working on our online ordering system. Please contact us directly to place orders.</p>
              <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20">
                <span className="text-white/60 text-sm">Contact us at:</span>
                <a href="mailto:info@superiorbeverages.com" className="text-yellow-400 font-semibold hover:underline">info@superiorbeverages.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
