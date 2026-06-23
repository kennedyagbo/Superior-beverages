'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Hotel, UtensilsCrossed, Wine, Store, Truck, PartyPopper, Building2, Check, ChevronDown } from 'lucide-react';

export default function WholesalePageClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const partners = [
    { icon: Hotel, title: 'Hotels', desc: 'Premium beverages for room service, minibars, events, and restaurants.' },
    { icon: UtensilsCrossed, title: 'Restaurants', desc: 'Quality wine and water selections that complement your menu.' },
    { icon: Wine, title: 'Bars & Lounges', desc: 'Stock your bar with Nigeria\'s finest champagnes and wines.' },
    { icon: Store, title: 'Retailers', desc: 'Competitive wholesale pricing with reliable supply chain.' },
    { icon: Truck, title: 'Distributors', desc: 'Exclusive territory opportunities with marketing support.' },
    { icon: PartyPopper, title: 'Event Planners', desc: 'Bulk orders for weddings, conferences, and celebrations.' },
    { icon: Building2, title: 'Corporate Buyers', desc: 'Custom branding and corporate gifting solutions.' },
  ];

  const process = [
    { step: '1', title: 'Inquiry', desc: 'Submit your wholesale inquiry with your business details.' },
    { step: '2', title: 'Consultation', desc: 'Our team contacts you to discuss your specific needs.' },
    { step: '3', title: 'Quotation', desc: 'Receive a customized quote based on your volume requirements.' },
    { step: '4', title: 'Order', desc: 'Place your order and arrange delivery logistics.' },
    { step: '5', title: 'Delivery', desc: 'Receive your products with our reliable nationwide delivery.' },
  ];

  const faqs = [
    { q: 'What is the minimum wholesale order?', a: 'Our minimum wholesale order is 10 cartons. For specific product minimums, please contact our wholesale team for a customized quotation.' },
    { q: 'Do you offer credit terms?', a: 'Yes, we offer credit terms for established businesses after a credit assessment. New customers typically start with cash on delivery (COD) terms.' },
    { q: 'How quickly can I receive my order?', a: 'Orders in Lagos are typically delivered within 24-48 hours. Other major cities receive delivery within 2-4 business days.' },
    { q: 'Can I get custom labeling?', a: 'Custom labeling is available for orders of 50+ cartons. Our design team can work with your brand guidelines to create bespoke labels.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>
            Wholesale
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Partner With Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">
            Competitive wholesale pricing, reliable delivery, and premium products for businesses across Nigeria.
          </motion.p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Who We Serve" title="Our Wholesale Partners" subtitle="We supply premium beverages to businesses of all sizes across Nigeria." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {partners.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.08}>
                <div className="glass-card p-6 text-center group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: 'rgba(114,47,55,0.08)' }}>
                    <p.icon className="w-7 h-7" style={{ color: '#722F37' }} />
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--background) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="How It Works" title="Wholesale Process" />
          <div className="mt-16 space-y-6">
            {process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: 'linear-gradient(135deg, #722F37, #9B2335)' }}>
                    {step.step}
                  </div>
                  <div className="glass-card p-5 flex-1">
                    <h3 className="font-serif font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Form */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Get Started" title="Request Wholesale Pricing" subtitle="Fill out the form below and our wholesale team will contact you within 24 hours." />
          <ScrollReveal className="mt-12">
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Inquiry Received!</h3>
                <p className="text-muted-foreground">Our wholesale team will contact you within 24 hours with a customized quote.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Business Type *</label>
                  <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy">
                    <option value="">Select business type</option>
                    <option>Hotel</option><option>Restaurant</option><option>Bar/Lounge</option><option>Retailer</option><option>Distributor</option><option>Event Planner</option><option>Corporate</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full">Submit Inquiry</button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, var(--background) 0%, var(--cream) 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="FAQ" title="Common Questions" />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 text-left flex items-center justify-between gap-4" aria-expanded={openFaq === i}>
                    <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : '' }} />
                  </button>
                  <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link href="/distributor-registration" className="btn-primary inline-flex items-center gap-2">
              Become a Distributor <Check className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
