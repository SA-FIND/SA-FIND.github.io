import { useEffect, useRef, useState } from 'react';

/**
 * Custom IntersectionObserver hook for scroll-triggered animations.
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.once - If true, only triggers once (stays true)
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}

/**
 * Hook to stagger multiple children animations.
 * Returns isInView for the container + a delay calculator.
 */
export function useStaggeredInView(options = {}) {
  const { ref, isInView } = useInView(options);
  const getDelay = (index, base = 80) => `${index * base}ms`;
  return { ref, isInView, getDelay };
}
