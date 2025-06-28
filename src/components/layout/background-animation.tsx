'use client';

import { useState, useEffect } from 'react';

// Custom SVG components for a futuristic, musical feel
const shapes = [
  // Eighth Note
  ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 3v10.55A4.001 4.001 0 0 0 10 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6Z" />
    </svg>
  ),
  // Quarter Note
  ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14 3v9.55a4 4 0 1 0-4 3.9V3h4Z"/>
    </svg>
  ),
  // Sound Wave
  ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10v4M9 8v8M15 5v14M21 10v4"/>
    </svg>
  ),
];

const themeColors = [
    'hsl(320 100% 55% / 0.9)', // Neon Pink
    'hsl(270 100% 60% / 0.9)', // Neon Purple
    'hsl(195 100% 50% / 0.9)', // Neon Blue
];

export default function BackgroundAnimation() {
  const [elements, setElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generatedElements = Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 4 + 2; // 2rem to 6rem
      const mainAnimationDuration = Math.random() * 15 + 10; // 10s to 25s
      const pulseDuration = Math.random() * 4 + 2; // 2s to 6s
      
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}vw`,
        width: `${size}rem`,
        height: `${size}rem`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${mainAnimationDuration}s, ${pulseDuration}s`,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        // Custom property for horizontal drift
        ['--drift-x' as any]: `${(Math.random() - 0.5) * 40}vw`,
      };

      const Shape = shapes[Math.floor(Math.random() * shapes.length)];
      return (
        <div key={i} className="shape" style={style}>
            <Shape className="w-full h-full" />
        </div>
      );
    });
    setElements(generatedElements);
  }, []);

  return <div className="dynamic-background">{elements}</div>;
}
