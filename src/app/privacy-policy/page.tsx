import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Superior Beverages',
  description: 'Learn about how Superior Beverages collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-sm">Last updated: January 2025</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including when you fill out forms on our website, make inquiries, subscribe to our newsletter, or interact with our services. This may include your name, email address, phone number, company name, and business address.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to process your inquiries, provide customer support, send you marketing communications (with your consent), improve our website and services, and comply with legal obligations.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">3. Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share your information with service providers who assist in our business operations, or when required by law or legal process.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">5. Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though some features of our website may not function properly without them.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by contacting us or using the unsubscribe link in our emails.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@superiorbeverages.com or call +234 123 456 7890.</p>
        </div>
      </div>
    </div>
  );
}
