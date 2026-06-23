import type { Metadata } from 'next';
import ManufacturingPageClient from './ManufacturingPageClient';

export const metadata: Metadata = {
  title: 'Manufacturing | Superior Beverages',
  description: 'Learn about our state-of-the-art production facility, quality control processes, and commitment to food safety.',
};

export default function ManufacturingPage() {
  return <ManufacturingPageClient />;
}
