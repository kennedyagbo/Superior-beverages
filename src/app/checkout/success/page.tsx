'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order') || '';
  const txId = params.get('tx') || '';
  const [copied, setCopied] = useState(false);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Success Icon */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex w-24 h-24 rounded-full items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, #16a34a22, #16a34a11)' }}
          >
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Payment Submitted!</h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Thank you for your order. Our team will verify your bank transfer within <strong className="text-foreground">24 hours</strong> and confirm your order.
            </p>
          </motion.div>
        </div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-6 space-y-4"
        >
          <h2 className="font-serif font-bold text-foreground text-lg border-b border-muted pb-3">Order Details</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Order Reference</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-foreground">{orderId}</span>
                <button onClick={() => copy(orderId)} className="text-muted-foreground hover:text-foreground transition">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transaction Reference</span>
              <span className="font-mono font-semibold text-foreground text-right max-w-[60%] break-all">{txId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-yellow-500">Pending Verification</span>
            </div>
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 mb-8"
          style={{ borderLeft: '4px solid #C9A84C' }}
        >
          <h3 className="font-semibold text-foreground mb-4">What Happens Next?</h3>
          <div className="space-y-3">
            {[
              'Our team will verify your transaction within 24 hours',
              'You will receive a confirmation call or email once verified',
              'Your order will be prepared and dispatched after verification',
              'Keep your Order Reference and Transaction ID safe for follow-up',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-white" style={{ background: '#C9A84C' }}>{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/products" className="flex-1 btn-outline inline-flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <Link href="/contact" className="flex-1 btn-primary inline-flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full w-10 h-10 border-4 border-muted border-t-foreground" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
