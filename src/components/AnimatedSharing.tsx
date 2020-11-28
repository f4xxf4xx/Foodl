import React, { useEffect, useRef, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { AnimatedSvgWrapper } from "components/AnimatedSvgWrapper";

export const AnimatedSharing: React.FC = () => {
  const ref = useRef<HTMLDivElement>();
  const [scrollStart, setScrollStart] = useState(null);
  const [scrollHalf, setScrollHalf] = useState(null);
  const { scrollY } = useViewportScroll();
  const translateLayer2 = useTransform(scrollY, [scrollStart, scrollHalf], [4, 0]);
  const translateLayer3 = useTransform(scrollY, [scrollStart, scrollHalf], [8, 0]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const elementScrollStart = rect.top - window.innerHeight + rect.height;
    const elementScrollEnd = rect.top;
    const elementScrollHalf = (elementScrollStart + elementScrollEnd) / 2;

    setScrollStart(elementScrollStart);
    setScrollHalf(elementScrollHalf);
  }, []);

  return (
    <AnimatedSvgWrapper ref={ref}>
      <svg xmlns="http://www.w3.org/2000/svg" width="192" height="156" viewBox="0 0 192 156">
        <path id="Path_62" data-name="Path 62" d="M-1148,1365v-22h-70.165A12,12,0,0,1-1230,1353a12,12,0,0,1-12-12,12,12,0,0,1,12-12,12,12,0,0,1,11.835,10H-1148v-30.167A12,12,0,0,1-1158,1297a12,12,0,0,1,12-12,12,12,0,0,1,12,12,12,12,0,0,1-10,11.834V1319h66.166A12,12,0,0,1-1066,1309a12,12,0,0,1,12,12,12,12,0,0,1-12,12,12,12,0,0,1-11.835-10H-1144v42Z" transform="translate(1246 -1281)" fill="#264653"/>
        <path id="Path_61" data-name="Path 61" d="M4,0H76a4,4,0,0,1,4,4V68a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(60 84)" fill="#cecece"/>
        <motion.g id="layer2" x={translateLayer2} y={translateLayer2} transition={{ duration: 1 }}>
          <path id="Path_60" data-name="Path 60" d="M0,0H80V52a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4Z" transform="translate(56 96)" fill="#fafafa"/>
          <path id="Path_2" data-name="Path 2" d="M31.8,96c-8.747,0-16.386,5.325-20.637,9.881l-8.49-6.422a1.617,1.617,0,0,0-2.639,1.425l2.351,10.671L.033,122.228a1.617,1.617,0,0,0,2.639,1.425l8.49-6.422c4.252,4.555,11.891,9.88,20.638,9.88,13.364,0,24.2-12.444,24.2-15.556S45.164,96,31.8,96Zm8.5,17.889a2.333,2.333,0,1,1,2.333-2.333A2.334,2.334,0,0,1,40.3,113.889Z" transform="translate(68.001 12)" fill="#e76f51"/>
          <path id="Path_54" data-name="Path 54" d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0Z" transform="translate(164 24)" fill="#5698b2"/>
          <path id="Path_52" data-name="Path 52" d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0Z" transform="translate(84)" fill="#5698b2"/>
          <path id="Path_51" data-name="Path 51" d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0Z" transform="translate(0 44)" fill="#5698b2"/>
        </motion.g>
        <motion.g id="layer3" x={translateLayer3} y={translateLayer3} transition={{ duration: 1 }}>
          <path id="Path_1" data-name="Path 1" d="M31.8,96c-8.747,0-16.386,5.325-20.637,9.881l-8.49-6.422a1.617,1.617,0,0,0-2.639,1.425l2.351,10.671L.033,122.228a1.617,1.617,0,0,0,2.639,1.425l8.49-6.422c4.252,4.555,11.891,9.88,20.638,9.88,13.364,0,24.2-12.444,24.2-15.556S45.164,96,31.8,96Zm8.5,17.889a2.333,2.333,0,1,1,2.333-2.333A2.334,2.334,0,0,1,40.3,113.889Z" transform="translate(64.001 8)" fill="#f0a491"/>
          <path id="Path_50" data-name="Path 50" d="M4,0H76a4,4,0,0,1,4,4V16H0V4A4,4,0,0,1,4,0Z" transform="translate(52 76)" fill="#f0f0f0"/>
        </motion.g>
      </svg>
    </AnimatedSvgWrapper>
  );
};
