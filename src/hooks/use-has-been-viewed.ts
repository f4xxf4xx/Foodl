import { RefObject, useState, useEffect } from "react";

export function useHasBeenViewed<T extends Element>(ref: RefObject<T>): boolean {
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      let viewed = false;
      const observer = new IntersectionObserver(([{isIntersecting}]) => {
        if (isIntersecting && !viewed)
          setHasBeenViewed(viewed = isIntersecting);
      }, { threshold: .1, rootMargin: "0% 0% -20% 0%" });
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return hasBeenViewed;
}
