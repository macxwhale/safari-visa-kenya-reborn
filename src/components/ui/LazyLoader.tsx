
import { useState, useEffect, useRef, ReactNode } from 'react';
import { LoadingSkeleton } from './loading-skeleton';

interface LazyLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export const LazyLoader = ({ 
  children, 
  fallback, 
  rootMargin = '50px',
  threshold = 0.1,
  className 
}: LazyLoaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, hasLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : (fallback || <LoadingSkeleton className="h-20" />)}
    </div>
  );
};
