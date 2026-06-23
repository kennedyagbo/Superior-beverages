import type { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Gallery | Superior Beverages',
  description: 'Browse photos of our manufacturing facility, products, distribution network, and events.',
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
