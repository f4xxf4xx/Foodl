import { RefObject, useState, useEffect } from "react";

export const useIntersecting = <T extends Element>(
  ref: RefObject<T>,
  threshold: number = 1
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      const observer = new IntersectionObserver(([{isIntersecting}]) => {
        setIntersecting(isIntersecting);
      }, { threshold: threshold });
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [ref, threshold]);
  return isIntersecting;
}
