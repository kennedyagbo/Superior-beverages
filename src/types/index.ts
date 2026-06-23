// Superior Beverages - Type Definitions

export interface Product {
  slug: string;
  name: string;
  category: 'alcoholic-wine' | 'non-alcoholic-wine' | 'bottled-water';
  subcategory: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  packaging: PackagingOption[];
  benefits: string[];
  servingSuggestions: string[];
  images: string[];
  color: string;
}

export interface PackagingOption {
  size: string;
  type: string;
  unitsPerCarton: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'rejected';

export interface Order {
  id: string;
  productSlug: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionId: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}
