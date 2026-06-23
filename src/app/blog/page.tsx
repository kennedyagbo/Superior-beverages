import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog & News | Superior Beverages',
  description: 'Stay updated with the latest news, wine education, industry insights, and healthy living tips from Superior Beverages.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
