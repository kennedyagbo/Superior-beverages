'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LogOut, Search, Shield, Package, Users, Clock, CheckCircle2, XCircle,
  Plus, Trash2, Key, Copy, Check, ChevronDown, BarChart3, RefreshCw, Download, Eye, Truck
} from 'lucide-react';
import {
  getOrders, updateOrderStatus, deleteOrder, isAdminAuthenticated, clearAdminAuth,
  getAdminCodes, saveAdminCode, deleteAdminCode
} from '@/lib/orders';
import { supabase } from '@/lib/supabase';
import type { Order, OrderStatus } from '@/types';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: '#92400e', bg: '#fef3c7', icon: Clock },
  confirmed: { label: 'Confirmed', color: '#065f46', bg: '#d1fae5', icon: CheckCircle2 },
  processing: { label: 'Processing', color: '#1e40af', bg: '#dbeafe', icon: Package },
  shipped: { label: 'Shipped', color: '#5b21b6', bg: '#ede9fe', icon: Truck },
  delivered: { label: 'Delivered', color: '#047857', bg: '#d1fae5', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: '#7f1d1d', bg: '#fee2e2', icon: XCircle },
  rejected: { label: 'Rejected', color: '#7f1d1d', bg: '#fee2e2', icon: XCircle },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [newCode, setNewCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'codes'>('orders');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

const loadData = useCallback(async () => {
  const ordersData = await getOrders();
  setOrders(ordersData);
  const codesData = await getAdminCodes();
  setCodes(codesData);
}, []);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace('/admin');
      return;
    }
    loadData();
    
    // Subscribe to real-time order updates
    const channel = supabase
      .channel('orders-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders(prev => [payload.new as Order, ...prev]);
        }
      )
      .subscribe();
    
    return () => { 
      supabase.removeChannel(channel); 
    };
  }, [router, loadData]);

  function handleLogout() {
    clearAdminAuth();
    router.replace('/admin');
  }

  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId);
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      loadData();
    }
    setUpdatingId(null);
  }

  async function handleDeleteOrder(orderId: string) {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
    const success = await deleteOrder(orderId);
    if (success) {
      loadData();
    }
  }

  function exportToCSV() {
    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Product', 'Quantity', 'Total', 'Status', 'Date'];
    const rows = orders.map(o => [
      o.id, o.customerName, o.customerEmail, o.customerPhone,
      o.productName, o.quantity, o.totalPrice, o.status,
      new Date(o.createdAt).toLocaleDateString()
    ]);
    
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleAddCode() {
    const code = newCode.trim();
    if (!code) { setCodeError('Please enter a code'); return; }
    if (code.length < 4) { setCodeError('Code must be at least 4 characters'); return; }
    if (codes.includes(code)) { setCodeError('This code already exists'); return; }
    saveAdminCode(code).then(() => {
      setNewCode('');
      setCodeError('');
      loadData();
    });
  }

  function handleDeleteCode(code: string) {
    deleteAdminCode(code).then(() => loadData());
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  const filtered = orders.filter((o) => {
    const matchSearch = search === '' ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.productName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    rejected: orders.filter(o => o.status === 'rejected').length,
    revenue: orders.filter(o => o.status === 'confirmed' || o.status === 'delivered').reduce((s, o) => s + o.totalPrice, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-800" style={{ background: 'linear-gradient(135deg, #1B2A4A, #722F37)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-yellow-300" />
            <div>
              <h1 className="text-white font-serif font-bold text-lg leading-none">Admin Panel</h1>
              <p className="text-white/50 text-xs">Superior Beverages</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportToCSV} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition" title="Export to CSV">
              <Download className="w-4 h-4" />
            </button>
            <button onClick={loadData} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.total, icon: Package, color: '#1B2A4A' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: '#d97706' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: '#059669' },
            { label: 'Processing', value: stats.processing, icon: Package, color: '#2563eb' },
            { label: 'Shipped', value: stats.shipped, icon: Truck, color: '#7c3aed' },
            { label: 'Delivered', value: stats.delivered, icon: CheckCircle2, color: '#047857' },
            { label: 'Revenue (₦)', value: `${stats.revenue.toLocaleString()}`, icon: BarChart3, color: '#722F37' },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl w-fit mb-6">
          {(['orders', 'codes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'orders' ? <span className="flex items-center gap-2"><Package className="w-4 h-4" />Orders ({orders.length})</span>
                : <span className="flex items-center gap-2"><Key className="w-4 h-4" />Access Codes ({codes.length})</span>}
            </button>
          ))}
        </div>

        {/* ===== ORDERS TAB ===== */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, transaction ID, order ID, product..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                  className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Orders Table */}
            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-16 text-center">
                <Users className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No orders found{search ? ' matching your search' : ''}.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        {['Order ID', 'Customer', 'Product', 'Qty', 'Total', 'Transaction ID', 'Date', 'Status', 'Action'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((order, i) => {
                        const cfg = STATUS_CONFIG[order.status];
                        const Icon = cfg.icon;
                        return (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                          >
                            <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">{order.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                              <p className="text-gray-400 text-xs">{order.customerEmail}</p>
                              <p className="text-gray-400 text-xs">{order.customerPhone}</p>
                            </td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-[150px]">
                              <p className="truncate">{order.productName}</p>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{order.quantity}</td>
                            <td className="px-4 py-3 font-bold whitespace-nowrap" style={{ color: '#722F37' }}>₦{order.totalPrice.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              {order.transactionId ? (
                                <span className="font-mono text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {order.transactionId}
                                </span>
                              ) : (
                                <span className="text-gray-300 text-xs italic">Not submitted</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                              {new Date(order.createdAt).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ color: cfg.color, background: cfg.bg }}>
                                <Icon className="w-3 h-3" />{cfg.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                disabled={updatingId === order.id}
                                className="px-2 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer disabled:opacity-50"
                              >
                                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                  <option key={key} value={key}>{config.label}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                                title="Delete order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800 text-xs text-gray-400">
                  Showing {filtered.length} of {orders.length} orders
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ===== ACCESS CODES TAB ===== */}
        {activeTab === 'codes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm mb-6">
              <h2 className="font-serif font-bold text-gray-900 dark:text-white text-lg mb-1">Create Access Code</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Create a custom code to grant users special access. You can share these codes with trusted partners or customers.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => { setNewCode(e.target.value); setCodeError(''); }}
                    placeholder="e.g. VIP2024, AGENT-KANO, PROMO50"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCode(); }}}
                  />
                </div>
                <button
                  onClick={handleAddCode}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #722F37, #9B2335)' }}
                >
                  <Plus className="w-4 h-4" /> Create Code
                </button>
              </div>
              {codeError && <p className="text-red-500 text-xs mt-2">{codeError}</p>}
            </div>

            {/* Codes List */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Active Access Codes ({codes.length})</h3>
              </div>
              {codes.length === 0 ? (
                <div className="p-12 text-center">
                  <Key className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No access codes yet. Create one above.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-50 dark:divide-gray-800">
                  {codes.map((code, i) => (
                    <motion.li
                      key={code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#722F3715' }}>
                          <Key className="w-4 h-4" style={{ color: '#722F37' }} />
                        </div>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyCode(code)}
                          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          title="Copy code"
                        >
                          {copiedCode === code ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteCode(code)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                          title="Delete code"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
