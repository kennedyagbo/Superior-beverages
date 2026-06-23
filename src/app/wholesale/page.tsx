import type { Metadata } from 'next';
import WholesalePageClient from './WholesalePageClient';

export const metadata: Metadata = {
  title: 'Wholesale | Superior Beverages',
  description: 'Partner with Superior Beverages for competitive wholesale pricing on premium wines, champagne, and table water. Available for hotels, restaurants, retailers, and distributors.',
};

export default function WholesalePage() {
  return <WholesalePageClient />;
}
