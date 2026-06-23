import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieBanner } from "@/components/ui/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Superior Beverages | Premium Nigerian Beverage Manufacturer",
  description:
    "Superior Beverages is Nigeria's premier manufacturer of premium wines, champagne, and table water. Quality you can taste, trust you can count on.",
  keywords: "Superior Beverages, Nigerian wine, premium champagne, bottled water, wholesale beverages, Nigeria",
  openGraph: {
    title: "Superior Beverages | Premium Nigerian Beverage Manufacturer",
    description:
      "Nigeria's premier manufacturer of premium wines, champagne, and table water.",
    type: "website",
    locale: "en_NG",
    siteName: "Superior Beverages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superior Beverages | Premium Nigerian Beverage Manufacturer",
    description:
      "Nigeria's premier manufacturer of premium wines, champagne, and table water.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>
          <LoadingProvider>
            <SmoothScrollProvider>

              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <BackToTop />
              <CookieBanner />
            </SmoothScrollProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

