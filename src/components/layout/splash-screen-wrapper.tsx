'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './splash-screen';

export default function SplashScreenWrapper() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) return null;
  
  return <SplashScreen isVisible={isVisible} />;
} 