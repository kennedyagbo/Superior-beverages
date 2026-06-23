import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Superior Beverages',
  description: 'Get in touch with Superior Beverages. Find our phone numbers, email, business hours, and location.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
