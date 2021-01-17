import React, { useRef, RefObject } from "react";
import { OverviewHeadline } from "modules/public/components/overview-headline";
import { OverviewFeatures } from "modules/public/components/overview-features";
import { OverviewPricing } from "modules/public/components/overview-pricing";

function scrollTo<T extends Element>(ref: RefObject<T>): void {
  const element = ref.current;
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
  }
}

export const OverviewView: React.FC = props => {
  const nextArticleRef = useRef<Element>();
  return (
    <>
      <OverviewHeadline onScrollToNext={() => scrollTo(nextArticleRef)} />
      <OverviewFeatures ref={nextArticleRef} />
      <OverviewPricing />
    </>
  );
};
