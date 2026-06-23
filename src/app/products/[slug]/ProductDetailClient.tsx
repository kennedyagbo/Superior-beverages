'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight, Download, Package, Check, GlassWater, ShoppingCart, ShoppingBag, User, Mail, Phone, Hash, AlertCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/lib/data';
import { saveOrder, generateOrderId } from '@/lib/orders';
import type { Product } from '@/types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const orderFormRef = useRef<HTMLDivElement>(null);

  // Order form state
  const [orderForm, setOrderForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    quantity: 1, 
    deliveryAddress: '',
    paymentMethod: 'bank_transfer',
    notes: ''
  });
  const [orderErrors, setOrderErrors] = useState<Record<string, string>>({});
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const PRICE_PER_UNIT = 100;
  const total = orderForm.quantity * PRICE_PER_UNIT;

  function scrollToOrderForm() {
    orderFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateFormField(field: string, value: string) {
    setOrderForm({ ...orderForm, [field]: value });
    setOrderErrors({ ...orderErrors, [field]: '' });
    // Dismiss success/error messages when user starts typing again
    if (orderSuccess) setOrderSuccess(false);
    if (orderError) setOrderError('');
  }

  function validateOrder() {
    const errs: Record<string, string> = {};
    if (!orderForm.name.trim()) errs.name = 'Full name is required';
    if (!orderForm.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(orderForm.email)) errs.email = 'Valid email is required';
    if (!orderForm.phone.trim()) errs.phone = 'Phone number is required';
    if (orderForm.quantity < 1) errs.quantity = 'Quantity must be at least 1';
    if (!orderForm.deliveryAddress.trim()) errs.deliveryAddress = 'Delivery address is required';
    return errs;
  }

  async function handleOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateOrder();
    if (Object.keys(errs).length > 0) { 
      setOrderErrors(errs); 
      setOrderError('');
      return; 
    }
    
    setOrderLoading(true);
    setOrderError('');
    
    // Prepare form data for Formspree
    const formData = {
      name: orderForm.name,
      email: orderForm.email,
      phone: orderForm.phone,
      product: product.name,
      product_slug: product.slug,
      quantity: orderForm.quantity,
      unit_price: PRICE_PER_UNIT,
      total_amount: total,
      delivery_address: orderForm.deliveryAddress,
      payment_method: orderForm.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash on Delivery',
      notes: orderForm.notes || 'None',
      order_date: new Date().toLocaleString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    try {
      const response = await fetch('https://formspree.io/f/xzdlpwpz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Success
        setOrderSuccess(true);
        setOrderForm({
          name: '',
          email: '',
          phone: '',
          quantity: 1,
          deliveryAddress: '',
          paymentMethod: 'bank_transfer',
          notes: ''
        });
        
        // Scroll to top of form to show success message
        orderFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Formspree returned an error
        const result = await response.json();
        setOrderError(result.error || 'Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Formspree submission error:', error);
      setOrderError('Network error. Please check your connection and try again.');
    } finally {
      setOrderLoading(false);
    }
  }

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
                    onClick={scrollToOrderForm}
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Now
                  </button>
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

      {/* ===== ORDER FORM ===== */}
      <section ref={orderFormRef} className="py-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#C9A84C' }}>Place Your Order</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">Order {product.name}</h2>
              <p className="text-white/70 mt-3">Fill in your details below and submit your order. Price: <span className="text-yellow-300 font-bold">₦100 per unit</span></p>
            </div>

            {/* Success Message */}
            {orderSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-5 rounded-xl border border-green-400/30" 
                style={{ background: 'rgba(34, 197, 94, 0.15)' }}
              >
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Order Submitted Successfully!</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Thank you for your order! We have received your details and will contact you shortly to confirm payment and delivery. Please check your email for a confirmation message.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {orderError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-5 rounded-xl border border-red-400/30" 
                style={{ background: 'rgba(239, 68, 68, 0.15)' }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Submission Failed</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{orderError}</p>
                    <button 
                      onClick={() => setOrderError('')}
                      className="mt-3 text-sm text-white underline hover:no-underline"
                    >
                      Dismiss and try again
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleOrderSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={orderForm.name}
                    onChange={(e) => updateFormField('name', e.target.value)}
                    placeholder="e.g. Chidi Okonkwo"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                {orderErrors.name && <p className="text-red-300 text-xs mt-1">{orderErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => updateFormField('email', e.target.value)}
                    placeholder="e.g. chidi@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                {orderErrors.email && <p className="text-red-300 text-xs mt-1">{orderErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => updateFormField('phone', e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                {orderErrors.phone && <p className="text-red-300 text-xs mt-1">{orderErrors.phone}</p>}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Delivery Address *</label>
                <textarea
                  value={orderForm.deliveryAddress}
                  onChange={(e) => updateFormField('deliveryAddress', e.target.value)}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400 transition resize-none"
                />
                {orderErrors.deliveryAddress && <p className="text-red-300 text-xs mt-1">{orderErrors.deliveryAddress}</p>}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Payment Method *</label>
                <select
                  value={orderForm.paymentMethod}
                  onChange={(e) => updateFormField('paymentMethod', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition cursor-pointer"
                >
                  <option value="bank_transfer" className="bg-gray-900 text-white">Bank Transfer</option>
                  <option value="cash_on_delivery" className="bg-gray-900 text-white">Cash on Delivery</option>
                </select>
                <p className="text-white/50 text-xs mt-1.5">
                  {orderForm.paymentMethod === 'bank_transfer' 
                    ? 'You will receive bank account details after order submission'
                    : 'Pay when your order is delivered'}
                </p>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Additional Notes (Optional)</label>
                <textarea
                  value={orderForm.notes}
                  onChange={(e) => updateFormField('notes', e.target.value)}
                  placeholder="Any special instructions or notes about your order"
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400 transition resize-none"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5">Quantity *</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="number"
                    min={1}
                    value={orderForm.quantity}
                    onChange={(e) => updateFormField('quantity', String(Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                {orderErrors.quantity && <p className="text-red-300 text-xs mt-1">{orderErrors.quantity}</p>}
              </div>

              {/* Order Summary */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Unit Price</span><span>₦100.00</span>
                </div>
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Quantity</span><span>{orderForm.quantity}</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-white text-lg">
                  <span>Total</span><span style={{ color: '#C9A84C' }}>₦{total.toLocaleString()}.00</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={orderLoading}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-60 flex items-center justify-center gap-2 min-h-[44px]"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #a07d2e)' }}
              >
                {orderLoading ? (
                  <><span className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />Submitting Order...</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" />Place Order</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
