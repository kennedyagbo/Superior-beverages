'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/products/${product.slug}`} className="block group">
        <div className="glass-card overflow-hidden">
          {/* Product Image Area */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: product.color }}>
                {product.subcategory}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-xs tracking-wider uppercase mb-2" style={{ color: '#C9A84C' }}>{product.tagline}</p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-burgundy transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
            <div className="flex items-center text-sm font-semibold" style={{ color: '#722F37' }}>
              Explore Product <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
