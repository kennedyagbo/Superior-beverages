'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #722F37 0%, #1B2A4A 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>Get In Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">We would love to hear from you. Reach out through any of the channels below.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}><Check className="w-8 h-8 text-green-500" /></div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-foreground mb-1">Full Name *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                    <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><input type="email" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-foreground mb-1">Phone</label><input type="tel" className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                    <div><label className="block text-sm font-medium text-foreground mb-1">Subject *</label>
                      <select required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy">
                        <option value="">Select subject</option><option>General Inquiry</option><option>Wholesale</option><option>Distributor Registration</option><option>Product Information</option><option>Complaints</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">Message *</label><textarea rows={5} required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy resize-none" /></div>
                  <button type="submit" className="btn-primary w-full">Send Message</button>
                </form>
              )}
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,47,55,0.08)' }}><MapPin className="w-5 h-5" style={{ color: '#722F37' }} /></div>
                  <div><h3 className="font-semibold text-foreground text-sm">Address</h3><p className="text-sm text-muted-foreground">15 Industrial Layout, Oregun Road, Ikeja, Lagos, Nigeria</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,47,55,0.08)' }}><Phone className="w-5 h-5" style={{ color: '#722F37' }} /></div>
                  <div><h3 className="font-semibold text-foreground text-sm">Phone</h3><p className="text-sm text-muted-foreground">+234 123 456 7890<br />+234 801 234 5678</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,47,55,0.08)' }}><Mail className="w-5 h-5" style={{ color: '#722F37' }} /></div>
                  <div><h3 className="font-semibold text-foreground text-sm">Email</h3><p className="text-sm text-muted-foreground">info@superiorbeverages.com<br />wholesale@superiorbeverages.com</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,47,55,0.08)' }}><Clock className="w-5 h-5" style={{ color: '#722F37' }} /></div>
                  <div><h3 className="font-semibold text-foreground text-sm">Business Hours</h3><p className="text-sm text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,211,102,0.1)' }}><FaWhatsapp className="w-5 h-5 text-green-600" /></div>
                  <div><h3 className="font-semibold text-foreground text-sm">WhatsApp</h3><a href="https://wa.me/2341234567890" className="text-sm text-muted-foreground hover:text-burgundy">+234 123 456 7890</a></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 hover:bg-burgundy hover:text-white transition-colors text-muted-foreground"><Icon className="w-4 h-4" /></a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, var(--background) 0%, var(--cream) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="aspect-[16/7] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(27,42,74,0.1), rgba(114,47,55,0.1))' }}>
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3" style={{ color: '#722F37', opacity: 0.3 }} />
                  <p className="text-muted-foreground">15 Industrial Layout, Oregun Road, Ikeja, Lagos</p>
                  <a href="https://maps.google.com/?q=Ikeja,Lagos,Nigeria" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold mt-2 inline-block" style={{ color: '#722F37' }}>Open in Google Maps</a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
