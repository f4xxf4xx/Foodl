import React, { createRef, RefObject, useEffect, useState, ReactElement, ComponentType, forwardRef } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { AccentBackground, BackgroundEffect, NO_EFFECT } from "pages/LandingPage/AccentBackground";

export interface WithEffectProps {
  calculateEffect: () => BackgroundEffect;
}

export const withEffect= <P extends object>(Component: ComponentType<P>) => (
  forwardRef((props: (P & WithEffectProps), ref) => {
    const {calculateEffect, ...others} = props;
    return (<Component ref={ref} {...others as P} />);
  })
)

interface Props {
  children: ReactElement<Partial<WithEffectProps>>[];
}

function useRefArray<T>(length: number): RefObject<T>[] {
  const [refs, setRefs] = React.useState<RefObject<T>[]>([]);
  useEffect(() => {
    setRefs(oldRefs => (
      Array(length).fill(undefined).map((_, i) => oldRefs[i] || createRef<T>())
    ));
  }, [length]);
  return refs;
}

function useCurrentArticleIndex<T extends HTMLElement>(refs: RefObject<T>[]): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (refs && refs.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({isIntersecting, target}) => {
          if(isIntersecting && target && target instanceof HTMLElement) {
            setIndex(+target.dataset.index);
          }
        })
      }, { rootMargin: "-49% 0%"});
      refs.forEach(ref => {
        const element = ref.current;
        if (element) {
          observer.observe(element);
        }
      })
      return () => observer.disconnect();
    }
  }, [refs])

  return index;
}

function useCurrentEffect(
  children: ReactElement<Partial<WithEffectProps>>[], index: number
): BackgroundEffect {
  const [effect, setEffect] = useState(NO_EFFECT);

  useEffect(() => {
    const child = children[index];
    const fn = child.props.calculateEffect || (() => NO_EFFECT);
    setEffect(fn());
  }, [children, index]);

  return effect;
}

export const ArticleList: React.FC<Props> = props => {
  const refs = useRefArray<HTMLDivElement>(props.children.length);
  const index = useCurrentArticleIndex(refs);
  const effect = useCurrentEffect(props.children, index);

  return (
    <AnimateSharedLayout>
      {props.children.map((child, i) => (
        <article key={i} ref={refs[i]} data-index={i}>
          {child}
        </article>
      ))}
      <AccentBackground effect={effect} />
    </AnimateSharedLayout>
  );
}