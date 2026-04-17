'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FallingPattern } from "@/components/ui/falling-pattern";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 900);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-[9999] bg-black"
        >
          <div className="w-full relative min-h-screen">
            <FallingPattern className="h-screen [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-mono text-7xl md:text-9xl font-extrabold tracking-tighter text-white"
              >
                BHAVESH
              </motion.h1>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
