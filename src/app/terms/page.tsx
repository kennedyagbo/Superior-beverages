import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Superior Beverages',
  description: 'Read the terms and conditions for using the Superior Beverages website and services.',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-sm">Last updated: January 2025</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using the Superior Beverages website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">2. Use of Website</h2>
          <p>You may use our website for lawful purposes only. You agree not to use the website in any way that could damage, disable, or impair the site or interfere with any other party&apos;s use and enjoyment of the site.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">3. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, images, and software, is the property of Superior Beverages and is protected by Nigerian and international copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">4. Product Information</h2>
          <p>We make every effort to ensure that product information on our website is accurate. However, we do not warrant that the information is error-free. Product images are for illustration purposes and may differ slightly from actual products.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">5. Wholesale Orders</h2>
          <p>Wholesale orders are subject to availability and our wholesale terms and conditions. Prices are subject to change without notice. All orders are subject to acceptance by Superior Beverages.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">6. Limitation of Liability</h2>
          <p>Superior Beverages shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">7. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">8. Contact</h2>
          <p>For questions about these Terms & Conditions, please contact us at legal@superiorbeverages.com or call +234 123 456 7890.</p>
        </div>
      </div>
    </div>
  );
}
