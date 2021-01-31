import { useRef, useMemo, RefObject } from "react";
import { MotionProps } from "framer-motion";
import { Theme } from "theme";

export type Point = { x: number, y: number };
export type AnyElement = HTMLElement | SVGElement;

function _getMiddleAnchorPoint(rect: DOMRect): Point {
  return {
    x: rect.x + (rect.width / 2),
    y: rect.y + (rect.height / 2)
  };
}

function _getAnchorPointOrNoop<T extends AnyElement>(
  ref: RefObject<T>,
  getAnchorPoint: (element: DOMRect) => Point
): Point {
  const el = ref ? ref.current : null;
  const rect = el ? el.getBoundingClientRect() : null
  return rect ? getAnchorPoint(rect) : null;
}

export function useStaggerEffect<T extends AnyElement>(
  isVisible: boolean,
  theme: Theme,
  relativeToRef?: RefObject<AnyElement>,
  getAnchorPoint: (rect: DOMRect) => Point = _getMiddleAnchorPoint
): { ref: RefObject<T> } & MotionProps {
  const timeDistanceRatio = 0.001;
  const ref = useRef<T>();
  const point = _getAnchorPointOrNoop(ref, getAnchorPoint);
  const relPoint = _getAnchorPointOrNoop(relativeToRef, getAnchorPoint);

  const delay = useMemo(() => {
    if (point && relPoint) {
      const dx = point.x - relPoint.x;
      const dy = point.y - relPoint.y;
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) * timeDistanceRatio;
    } else {
      return 0;
    }
  }, [point, relPoint]);
  
  console.log('useStaggerEffect', delay, point, relPoint, ref ? ref.current : null);
  
  return {
    ref,
    animate: isVisible ? "visible" : "hidden",
    initial: false,
    variants: theme.animations.appear,
    transition: {
      ...theme.animations.transition,
      delay
    }
  };
}
