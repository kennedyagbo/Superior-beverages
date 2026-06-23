'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Copy, Check, Building2, CreditCard, AlertCircle, ChevronRight } from 'lucide-react';
import { getOrders, getOrderById, saveOrder } from '@/lib/orders';
import type { Order } from '@/types';

const BANK_DETAILS = {
  bankName: 'Zenith Bank',
  accountName: 'Superior Beverages Ltd',
  accountNumber: '1234567890',
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [txId, setTxId] = useState('');
  const [txError, setTxError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const found = await getOrderById(orderId);
      if (!found) { router.push('/products'); return; }
      setOrder(found);
    };
    fetchOrder();
  }, [orderId, router]);

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!txId.trim()) { setTxError('Please enter your Transaction Reference / ID'); return; }
    if (txId.trim().length < 5) { setTxError('Transaction ID seems too short — please double-check'); return; }
    if (!order) return;
    setSubmitting(true);

    // Update order with transaction ID
    const orders = await getOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      orders[idx].transactionId = txId.trim();
      // Update in Supabase
      await saveOrder(orders[idx]);
    }

    router.push(`/checkout/success?order=${orderId}&tx=${encodeURIComponent(txId.trim())}`);
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full w-10 h-10 border-4 border-muted border-t-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-28 pb-10 px-4" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #722F37 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-white transition">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Checkout</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#C9A84C' }}>Secure Payment</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">Complete Your Order</h1>
            <p className="text-white/60 mt-2 text-sm">Order Reference: <span className="text-yellow-300 font-mono font-bold">{orderId}</span></p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#722F37' }}>1</div>
            <span className="text-sm font-semibold text-foreground">Make Transfer</span>
          </div>
          <div className="flex-1 h-px bg-muted" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#C9A84C' }}>2</div>
            <span className="text-sm font-semibold text-foreground">Submit Reference</span>
          </div>
          <div className="flex-1 h-px bg-muted" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-muted text-muted-foreground">3</div>
            <span className="text-sm text-muted-foreground">Confirmed</span>
          </div>
        </div>

        {/* Order Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-6 border-l-4" style={{ borderColor: '#C9A84C' }}>
          <h2 className="font-serif font-bold text-foreground text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Product</span><span className="font-medium text-foreground">{order.productName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium text-foreground">{order.customerName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span className="font-medium text-foreground">{order.quantity}</span></div>
            <div className="border-t border-muted mt-3 pt-3 flex justify-between text-base font-bold">
              <span className="text-foreground">Total Amount</span>
              <span className="text-2xl" style={{ color: '#722F37' }}>₦{order.totalPrice.toLocaleString()}.00</span>
            </div>
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#722F37' }}>1</div>
            <h2 className="text-xl font-serif font-bold text-foreground">Make Your Bank Transfer</h2>
          </div>

          {/* Alert */}
          <div className="rounded-xl p-4 mb-5 flex gap-3 text-sm" style={{ background: '#C9A84C15', border: '1px solid #C9A84C40' }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
            <div>
              <p className="font-semibold text-foreground mb-1">Important — Transfer Exactly</p>
              <p className="text-muted-foreground">Transfer exactly <strong className="text-foreground">₦{order.totalPrice.toLocaleString()}.00</strong> to the account below. Any different amount may delay processing.</p>
            </div>
          </div>

          {/* Bank Card */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg, #1B2A4A, #2d4a7a)' }}>
              <div className="flex items-center justify-between mb-6">
                <Building2 className="w-6 h-6 text-white/70" />
                <CreditCard className="w-6 h-6 text-white/70" />
              </div>
              <p className="text-white/50 text-xs tracking-widest uppercase mb-1">Bank Name</p>
              <p className="text-xl font-bold text-white mb-4">{BANK_DETAILS.bankName}</p>
              <p className="text-white/50 text-xs tracking-widest uppercase mb-1">Account Name</p>
              <p className="text-lg font-semibold text-white mb-4">{BANK_DETAILS.accountName}</p>
              <p className="text-white/50 text-xs tracking-widest uppercase mb-1">Account Number</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-mono font-bold tracking-widest" style={{ color: '#C9A84C' }}>{BANK_DETAILS.accountNumber}</p>
                <button onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'acc')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition">
                  {copied === 'acc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'acc' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between" style={{ background: '#C9A84C' }}>
              <span className="text-white text-sm font-semibold">Amount to Transfer</span>
              <span className="text-white text-xl font-bold font-mono">₦{order.totalPrice.toLocaleString()}.00</span>
            </div>
          </div>

          {/* Step-by-step guide */}
          <div className="mt-6 space-y-3">
            {[
              'Open your bank app or visit any bank branch / ATM',
              `Select "Transfer" and choose ${BANK_DETAILS.bankName}`,
              `Enter account number: ${BANK_DETAILS.accountNumber}`,
              `Enter exactly ₦${order.totalPrice.toLocaleString()}.00 as the amount`,
              'Complete the transfer and note your Transaction Reference / ID from the receipt',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#722F37' }}>{i + 1}</span>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transaction ID Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#C9A84C' }}>2</div>
            <h2 className="text-xl font-serif font-bold text-foreground">Enter Your Transaction Reference</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            After completing your transfer, copy the <strong>Transaction Reference / ID</strong> from your bank receipt or SMS confirmation and paste it below.
          </p>

          <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Transaction Reference / ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={txId}
                onChange={(e) => { setTxId(e.target.value); setTxError(''); }}
                placeholder="e.g. TRF2024061912345 or 010203040506"
                className="w-full px-4 py-3 rounded-xl border border-muted bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 text-sm"
                style={{ '--tw-ring-color': '#722F37' } as React.CSSProperties}
              />
              {txError && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2">
                  <AlertCircle className="w-3 h-3" />{txError}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                You can find this on your bank app transfer receipt, SMS alert, or email confirmation.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #722F37, #9B2335)' }}
            >
              {submitting ? (
                <><span className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />Submitting...</>
              ) : (
                'Submit Payment Reference →'
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
