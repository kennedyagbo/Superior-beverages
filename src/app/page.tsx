'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Award, Shield, Truck, Star, Droplets, Wine, GlassWater, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, testimonials, faqs, stats, blogPosts } from '@/lib/data';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

/* ========== HERO ========== */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F1A30 0%, #1B2A4A 30%, #722F37 70%, #9B2335 100%)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              background: 'rgba(201, 168, 76, 0.15)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block text-xs tracking-[0.4em] uppercase font-semibold px-4 py-2 rounded-full border" style={{ color: '#C9A84C', borderColor: 'rgba(201,168,76,0.3)' }}>
            Nigeria&apos;s Premier Beverage Manufacturer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
        >
          Taste the <span style={{ color: '#C9A84C' }}>Superior</span>
          <br />
          Difference
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed px-2"
        >
          From our premium champagnes to crystal-clear table water, every Superior product is crafted with passion, precision, and the highest quality standards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/products" className="btn-primary text-base px-8 py-4">
            Explore Our Products
          </Link>
          <Link href="/wholesale" className="btn-gold text-base px-8 py-4">
            Wholesale Inquiry
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== WHY CHOOSE ========== */
function WhyChoose() {
  const features = [
    { icon: Award, title: 'Premium Quality', description: 'Every product undergoes rigorous quality control, ensuring world-class standards in every bottle.' },
    { icon: Shield, title: 'NAFDAC Certified', description: 'All products are NAFDAC certified and meet international food safety standards.' },
    { icon: Truck, title: 'Nationwide Delivery', description: 'Reliable distribution across all 36 states with timely delivery to your doorstep.' },
    { icon: Star, title: '15+ Years Experience', description: 'Over a decade of expertise in crafting beverages that Nigerians love and trust.' },
    { icon: Droplets, title: 'Pure Ingredients', description: 'We source the finest ingredients and maintain strict purity standards throughout production.' },
    { icon: Wine, title: 'Award-Winning', description: 'Recognized for excellence in manufacturing, our products consistently exceed expectations.' },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="Excellence in Every Drop"
          subtitle="At Superior Beverages, we combine tradition, technology, and passion to deliver beverages that set the standard for quality in Nigeria."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <div className="glass-card p-8 text-center group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl flex items-center justify-center transition-colors group-hover:bg-burgundy/10" style={{ background: 'rgba(114,47,55,0.05)' }}>
                  <feature.icon className="w-7 h-7" style={{ color: '#722F37' }} />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-muted">
          {stats.map((stat) => (
            <StatsCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== FEATURED PRODUCTS ========== */
function FeaturedProducts() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--background) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Products"
          title="Crafted for Excellence"
          subtitle="Discover our range of premium beverages, each crafted with the finest ingredients and unwavering dedication to quality."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link href="/products" className="btn-outline inline-flex items-center gap-2">
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ========== MANUFACTURING EXCELLENCE ========== */
function ManufacturingExcellence() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1A30 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              label="Manufacturing"
              title="Where Quality Begins"
              subtitle="Our state-of-the-art production facility combines cutting-edge technology with rigorous quality control to deliver beverages you can trust."
              centered={false}
              light
            />
            <div className="mt-8 space-y-4">
              {[
                'ISO 22000 Certified Production Facility',
                'Multi-stage Water Purification System',
                'Temperature-Controlled Fermentation',
                'Advanced Quality Testing Laboratory',
                'Sustainable Manufacturing Practices',
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A84C' }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-8" direction="left">
              <Link href="/manufacturing" className="btn-gold inline-flex items-center gap-2 text-sm">
                Learn About Our Process <ChevronRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.3), rgba(27,42,74,0.3))' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <GlassWater className="w-20 h-20 mx-auto mb-4" style={{ color: '#C9A84C' }} />
                    <p className="text-white/60 text-sm">Manufacturing Facility</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl" style={{ background: 'linear-gradient(135deg, #C9A84C, #722F37)', opacity: 0.2 }} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ========== WHOLESALE SECTION ========== */
function WholesaleSection() {
  const partners = [
    { icon: '🏨', label: 'Hotels' },
    { icon: '🍽️', label: 'Restaurants' },
    { icon: '🍸', label: 'Bars' },
    { icon: '🏪', label: 'Retailers' },
    { icon: '📦', label: 'Distributors' },
    { icon: '🎊', label: 'Event Planners' },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Wholesale"
          title="Partner With Us"
          subtitle="Whether you run a hotel, restaurant, bar, or retail outlet, Superior Beverages offers competitive wholesale pricing and reliable supply."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
          {partners.map((partner, i) => (
            <ScrollReveal key={partner.label} delay={i * 0.1}>
              <div className="glass-card p-6 text-center group cursor-default">
                <span className="text-3xl mb-3 block">{partner.icon}</span>
                <span className="text-sm font-semibold text-foreground">{partner.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <div className="glass-card p-8 md:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(114,47,55,0.05), rgba(201,168,76,0.05))' }}>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Ready to Grow Your Business?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join hundreds of businesses across Nigeria that trust Superior Beverages for their wholesale supply. Get competitive pricing, reliable delivery, and premium products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/wholesale" className="btn-primary">
                Get Wholesale Pricing
              </Link>
              <Link href="/distributor-registration" className="btn-outline">
                Become a Distributor
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ========== TESTIMONIALS ========== */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, var(--background) 0%, var(--cream) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Partners Say"
          subtitle="Hear from the businesses and individuals who trust Superior Beverages."
        />

        <div className="max-w-3xl mx-auto mt-16">
          <ScrollReveal>
            <div className="glass-card p-6 md:p-8 text-center">
              <div className="flex items-center justify-center gap-1 mb-4 md:mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#C9A84C' }} />
                ))}
              </div>
              <p className="text-base md:text-xl text-foreground leading-relaxed mb-6 md:mb-8 italic">
                &ldquo;{testimonials[active].content}&rdquo;
              </p>
              <div>
                <p className="font-serif font-bold text-foreground">{testimonials[active].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[active].role}, {testimonials[active].company}</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === active ? 'w-8' : 'opacity-40 hover:opacity-70'}`}
                style={{ background: i === active ? '#722F37' : '#9A9590' }}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== HOME FAQ ========== */
function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our products, ordering, and distribution."
        />

        <div className="mt-12 space-y-3">
          {faqs.slice(0, 6).map((faq, i) => (
            <ScrollReveal key={faq.id} delay={i * 0.05}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-foreground text-sm">{faq.question}</span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 transition-transform text-muted-foreground"
                    style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-8">
          <Link href="/faq" className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#722F37' }}>
            View All FAQs <ChevronRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ========== NEWS & CTA ========== */
function NewsCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #722F37 0%, #5A252C 50%, #1B2A4A 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Latest News */}
        <SectionHeading label="Latest News" title="Stay Updated" light />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogPosts.slice(0, 3).map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="glass-card overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="h-48" style={{ background: `linear-gradient(135deg, rgba(201,168,76,0.2), rgba(114,47,55,0.2))` }}>
                    <div className="h-full flex items-center justify-center">
                      <Wine className="w-12 h-12 text-white/20" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs tracking-wider uppercase" style={{ color: '#C9A84C' }}>{post.category}</span>
                    <h3 className="text-base font-serif font-bold text-white mt-2 mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-white/50 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-20">
          <div className="text-center">
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4">
              Experience the Superior Difference Today
            </h3>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Contact us to place an order, become a distributor, or learn more about our premium beverage range.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-gold text-base px-8 py-4">
                Contact Us
              </Link>
              <a
                href="https://wa.me/2341234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-base hover:bg-white/5 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ========== HOME PAGE ========== */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <FeaturedProducts />
      <ManufacturingExcellence />
      <WholesaleSection />
      <Testimonials />
      <HomeFAQ />
      <NewsCTA />
    </>
  );
}

