import { supabase } from './supabase';
import type { Order, OrderStatus } from '@/types';

const CODES_KEY = 'sb_admin_codes';
const AUTH_KEY = 'sb_admin_auth';
const ADMIN_PASSWORD = 'SB@Admin2024';

/* ── Orders ──────────────────────────────────────────── */

export async function getOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return (data || []) as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function saveOrder(order: Order): Promise<boolean> {
  try {
    // Prevent duplicate orders
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('id', order.id)
      .single();
    
    if (existing) {
      console.warn('Duplicate order detected:', order.id);
      return false;
    }
    
    const { error } = await supabase
      .from('orders')
      .insert({
        id: order.id,
        product_slug: order.productSlug,
        product_name: order.productName,
        quantity: order.quantity,
        total_price: order.totalPrice,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        delivery_address: order.deliveryAddress || null,
        payment_method: order.paymentMethod || 'bank_transfer',
        payment_status: order.paymentStatus || 'pending',
        transaction_id: order.transactionId || null,
        status: order.status,
        created_at: order.createdAt,
      });
    
    if (error) {
      console.error('Error saving order:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error saving order:', error);
    return false;
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating order status:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

export async function deleteOrder(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting order:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      return null;
    }
    return data as Order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export function generateOrderId(): string {
  return 'SB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

/* ── Admin Auth ──────────────────────────────────────── */

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminAuth(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, 'true');
  }
}

export function clearAdminAuth(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

/* ── Access Codes ────────────────────────────────────── */

export async function getAdminCodes(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('admin_codes')
      .select('code')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching admin codes:', error);
      return [];
    }
    return (data || []).map(row => row.code);
  } catch (error) {
    console.error('Error fetching admin codes:', error);
    return [];
  }
}

export async function saveAdminCode(code: string): Promise<boolean> {
  try {
    const codes = await getAdminCodes();
    if (codes.includes(code)) {
      return false; // Already exists
    }
    
    const { error } = await supabase
      .from('admin_codes')
      .insert({ code });
    
    if (error) {
      console.error('Error saving admin code:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error saving admin code:', error);
    return false;
  }
}

export async function deleteAdminCode(code: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('admin_codes')
      .delete()
      .eq('code', code);
    
    if (error) {
      console.error('Error deleting admin code:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error deleting admin code:', error);
    return false;
  }
}

