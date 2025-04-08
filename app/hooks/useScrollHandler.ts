import { useState, useCallback, useRef, useEffect } from 'react';

export const useScrollHandler = () => {
  const [isCompact, setIsCompact] = useState(false);
  const animationFrameRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;
      const scrollDifference = Math.abs(currentScrollY - lastScrollYRef.current);
      
      if (scrollDifference > 50) {
        setIsCompact(currentScrollY > scrollThreshold);
        lastScrollYRef.current = currentScrollY;
      }
    });
  }, []);

  useEffect(() => {
    const scrollListener = () => handleScroll();
    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollListener);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleScroll]);

  return { isCompact };
};