import type { Metadata } from 'next';
import DistributorRegistrationClient from './DistributorRegistrationClient';

export const metadata: Metadata = {
  title: 'Distributor Registration | Superior Beverages',
  description: 'Register to become a Superior Beverages distributor. Join our network and grow your business with premium Nigerian beverages.',
};

export default function DistributorRegistrationPage() {
  return <DistributorRegistrationClient />;
}
