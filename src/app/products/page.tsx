import type { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'Products | Superior Beverages',
  description: 'Explore our range of premium beverages including Champagne, Classic Wine, Non-Alcoholic Wine, and Premium Table Water.',
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
