
const ORDERS_KEY = 'sb_orders';
const AUTH_KEY = 'sb_admin_auth';
const ADMIN_PASSWORD = 'SB@Admin2024';

/* ── Orders ──────────────────────────────────────────── */

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') as Order[];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): boolean {
  try {
    const orders = getOrders();
    // Check for duplicates
    const exists = orders.find(o => o.id === order.id);
    if (exists) {
      console.warn('Duplicate order detected:', order.id);
      return false;
    }
    orders.unshift(order); // newest first
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error('Error saving order:', error);
    return false;
  }
}

export function updateOrderStatus(id: string, status: OrderStatus): boolean {
  try {
    const orders = getOrders();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      orders[idx].updatedAt = new Date().toISOString();
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

export function deleteOrder(id: string): boolean {
  try {
    const orders = getOrders();
    const filtered = orders.filter(o => o.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
}

export function getOrderById(id: string): Order | null {
  try {
    const orders = getOrders();
    return orders.find(o => o.id === id) || null;
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

export function getAdminCodes(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CODES_KEY) || '[]') as string[];
  } catch {
    return [];
  }
}

export function saveAdminCode(code: string): void {
  const codes = getAdminCodes();
  if (!codes.includes(code)) {
    codes.push(code);
    localStorage.setItem(CODES_KEY, JSON.stringify(codes));
  }
}

export function deleteAdminCode(code: string): void {
  const codes = getAdminCodes().filter((c) => c !== code);
  localStorage.setItem(CODES_KEY, JSON.stringify(codes));
}

