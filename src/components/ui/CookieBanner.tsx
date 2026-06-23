'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="w-6 h-6 text-gold flex-shrink-0" />
            <p className="text-sm text-foreground flex-1">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
              <a href="/privacy-policy" className="underline hover:text-burgundy">Learn more</a>
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={accept} className="btn-primary text-sm px-4 py-2">Accept</button>
              <button onClick={() => setVisible(false)} className="p-2 hover:bg-muted rounded-lg" aria-label="Dismiss">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
