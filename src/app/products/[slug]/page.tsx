import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then((p) => {
    const product = products.find((pr) => pr.slug === p.slug);
    if (!product) return { title: 'Product Not Found' };
    return {
      title: `${product.name} | Superior Beverages`,
      description: product.description,
    };
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
