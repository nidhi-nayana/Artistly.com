'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  triggerOnce?: boolean;
}

export default function AnimatedSection({
  children,
  className,
  delay = '0s',
  triggerOnce = true,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        } else {
            if (!triggerOnce) {
                setIsVisible(false);
            }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [triggerOnce]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0', // Start invisible
        isVisible && 'animate-fade-up',
        className
      )}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
} 