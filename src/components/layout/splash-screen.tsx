'use client';

import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState, useEffect } from 'react';

const shapes = [
    ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 3v10.55A4.001 4.001 0 0 0 10 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6Z" />
      </svg>
    ),
    ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 3v9.55a4 4 0 1 0-4 3.9V3h4Z"/>
      </svg>
    ),
];

const themeColors = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
];

export default function SplashScreen({ isVisible }: { isVisible: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animatedElements = useMemo(() => {
    if (!mounted) return []; // Return empty array during SSR to prevent hydration mismatch
    
    return Array.from({ length: 20 }, (_, i) => {
      const Shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      
      return (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            width: `${1.5 + Math.random() * 3}rem`,
            height: `${1.5 + Math.random() * 3}rem`,
            animation: `float-up ${3 + Math.random() * 5}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 2}s`,
            color,
            opacity: 0.1 + Math.random() * 0.4,
          }}
        >
          <Shape />
        </div>
      );
    });
  }, [mounted]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        {animatedElements}
      </div>
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Music className="h-12 w-12 text-primary animate-pulse" />
          <h1 className="text-4xl font-brand text-foreground">Artistly</h1>
        </div>
        <div className="text-muted-foreground animate-pulse">
          Connecting artists with opportunities...
        </div>
      </div>
    </div>
  );
} 