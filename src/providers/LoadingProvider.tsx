'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 30 ? 5 : prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment + Math.random() * 3, 100);
      });
    }, 50);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center justify-center gap-8">
              {/* Animated Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-royal-gold text-lg tracking-[0.3em] uppercase font-sans mb-2"
                    style={{ color: '#C9A84C' }}
                  >
                    Superior
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-white text-4xl md:text-5xl font-serif font-bold tracking-wide"
                  >
                    Beverages
                  </motion.h1>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="h-[2px] w-32 mx-auto mt-3"
                    style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
                  />
                </div>

                {/* Background particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 4 + i * 2,
                      height: 4 + i * 2,
                      background: '#C9A84C',
                      opacity: 0.3,
                    }}
                    animate={{
                      y: [-20 - i * 10, 20 + i * 10],
                      x: [-10 + i * 5, 10 - i * 5],
                      opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="w-64 md:w-80"
              >
                <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #722F37, #C9A84C)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/40 text-xs tracking-widest">LOADING</span>
                  <span className="text-white/60 text-xs font-mono">{Math.round(progress)}%</span>
                </div>
              </motion.div>
            </div>

            {/* Liquid fill background effect */}
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              style={{ background: 'linear-gradient(to top, rgba(114,47,55,0.15), transparent)' }}
              initial={{ height: '0%' }}
              animate={{ height: `${progress * 0.4}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
}
