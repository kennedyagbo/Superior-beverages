import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Superior Beverages',
  description: 'Learn about Superior Beverages - Nigeria\'s premier beverage manufacturer. Our story, mission, values, and commitment to quality since 2009.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
