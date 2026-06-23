'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Check, Upload, ChevronRight } from 'lucide-react';

const steps = ['Business Information', 'Documents', 'Review & Submit'];

export default function DistributorRegistrationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(step + 1); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-12" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)' }}><Check className="w-10 h-10 text-green-400" /></div>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Registration Submitted!</h2>
            <p className="text-white/60 mb-6">Thank you for your interest in becoming a Superior Beverages distributor. Our team will review your application and contact you within 5-7 business days.</p>
            <p className="text-sm text-white/40">You will receive a confirmation email shortly.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>Become a Partner</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Distributor Registration</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">Join our network of distributors across Nigeria and grow your business with premium products.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'text-white' : 'bg-muted text-muted-foreground'}`} style={i <= step ? { background: 'linear-gradient(135deg, #722F37, #9B2335)' } : {}}>
                  {i + 1}
                </div>
                <span className={`text-sm hidden sm:block ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
                {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-foreground mb-1">Business Name *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                    <div><label className="block text-sm font-medium text-foreground mb-1">CAC Registration No. *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-foreground mb-1">Contact Person *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                    <div><label className="block text-sm font-medium text-foreground mb-1">Designation *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><input type="email" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                    <div><label className="block text-sm font-medium text-foreground mb-1">Phone *</label><input type="tel" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">Business Address *</label><input type="text" required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">State *</label>
                    <select required className="w-full px-4 py-3 rounded-lg border border-muted bg-background text-sm focus:outline-none focus:border-burgundy">
                      <option value="">Select state</option><option>Lagos</option><option>Abuja (FCT)</option><option>Rivers</option><option>Kano</option><option>Oyo</option><option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary w-full">Next Step</button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Upload Documents</h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">CAC Certificate *</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-burgundy transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload CAC certificate (PDF, JPG)</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Valid ID *</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-burgundy transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload valid identification (PDF, JPG)</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Proof of Address</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-burgundy transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload utility bill or bank statement</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(0)} className="btn-outline flex-1">Back</button>
                    <button type="submit" className="btn-primary flex-1">Next Step</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Review & Submit</h3>
                  <p className="text-sm text-muted-foreground mb-4">Please review your information before submitting. By submitting, you agree to our terms and conditions for distributors.</p>
                  <div className="glass-card p-6 space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Business Name</span><span className="text-foreground font-medium">[As entered]</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">CAC Number</span><span className="text-foreground font-medium">[As entered]</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Contact Person</span><span className="text-foreground font-medium">[As entered]</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">State</span><span className="text-foreground font-medium">[As selected]</span></div>
                  </div>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm text-muted-foreground">I confirm that all information provided is accurate and I agree to the <a href="/terms" className="underline hover:text-burgundy">Terms & Conditions</a>.</span>
                  </label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>
                    <button type="submit" className="btn-primary flex-1">Submit Registration</button>
                  </div>
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
