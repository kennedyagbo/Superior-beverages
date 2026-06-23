'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass py-3 shadow-lg'
            : 'bg-transparent py-5'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Superior Beverages Home">
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #722F37, #C9A84C)' }}>
                  <span className="text-white font-bold text-lg font-serif">S</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: '#C9A84C' }}>Superior</span>
                <span className={cn('text-sm font-serif font-bold tracking-wide', isScrolled ? 'text-foreground' : 'text-white')}>Beverages</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1',
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-gold'
                        : isScrolled
                          ? 'text-foreground hover:text-burgundy'
                          : 'text-white/90 hover:text-white'
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className={cn('w-3 h-3 transition-transform', activeDropdown === link.label && 'rotate-180')} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 py-2 min-w-[200px] glass rounded-xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground hover:text-burgundy hover:bg-burgundy/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'
                  )}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-gold" />
                  ) : (
                    <Moon className={cn('w-4 h-4', isScrolled ? 'text-foreground' : 'text-white')} />
                  )}
                </button>
              )}

              {/* CTA button */}
              <Link
                href="/wholesale"
                className="hidden md:inline-flex btn-primary text-sm"
              >
                Order Wholesale
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors',
                  isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'
                )}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? (
                  <X className={cn('w-5 h-5', isScrolled ? 'text-foreground' : 'text-white')} />
                ) : (
                  <Menu className={cn('w-5 h-5', isScrolled ? 'text-foreground' : 'text-white')} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <motion.div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl overflow-y-auto">
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          'block px-4 py-3 min-h-[44px] rounded-lg text-base font-medium transition-colors',
                          pathname === link.href
                            ? 'bg-burgundy/10 text-burgundy'
                            : 'text-foreground hover:bg-muted'
                        )}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 flex flex-col gap-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 min-h-[44px] text-sm text-muted-foreground hover:text-burgundy transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-muted">
                  <Link href="/wholesale" className="btn-primary w-full text-center block min-h-[44px]">
                    Order Wholesale
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
