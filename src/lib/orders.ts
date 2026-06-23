// Temporary placeholder - Order system will be reimplemented
export function getOrders(): any[] {
  return [];
}

export function saveOrder(order: any): boolean {
  console.log('Order system temporarily disabled');
  return false;
}

export function updateOrderStatus(id: string, status: string): boolean {
  return false;
}

export function deleteOrder(id: string): boolean {
  return false;
}

export function getOrderById(id: string): any | null {
  return null;
}

export function generateOrderId(): string {
  return 'SB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

/* ── Admin Auth ──────────────────────────────────────── */

const AUTH_KEY = 'sb_admin_auth';
const ADMIN_PASSWORD = 'SB@Admin2024';

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
  return [];
}

export function saveAdminCode(code: string): void {
  console.log('Admin codes temporarily disabled');
}

export function deleteAdminCode(code: string): void {
  console.log('Admin codes temporarily disabled');
}
