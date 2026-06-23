import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers | Superior Beverages',
  description: 'Join the Superior Beverages team. Explore open positions and build your career with Nigeria\'s premier beverage manufacturer.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
