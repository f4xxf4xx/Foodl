import React, { useEffect, useRef, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { AnimatedSvgWrapper } from "pages/LandingPage/AnimatedSvgWrapper";

export const AnimatedGroceries: React.FC = () => {
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
        <path id="layer1" d="M4,0H180a4,4,0,0,1,4,4V144a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(8 8)" fill="#cecece"/>
        <motion.g id="layer2" x={translateLayer2} y={translateLayer2} transition={{ duration: 1 }}>
          <path id="Path_79" data-name="Path 79" d="M0,0H184V128a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4Z" transform="translate(4 20)" fill="#fff"/>
          <path id="Path_77" data-name="Path 77" d="M4,0h8a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(104 104)" fill="#cecece"/>
          <path id="Path_76" data-name="Path 76" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(128 104)" fill="#cecece"/>
          <path id="Path_74" data-name="Path 74" d="M4,0h8a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(104 128)" fill="#cecece"/>
          <path id="Path_73" data-name="Path 73" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(128 128)" fill="#cecece"/>
          <path id="Path_71" data-name="Path 71" d="M4,0h8a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(104 32)" fill="#cecece"/>
          <path id="Path_70" data-name="Path 70" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(128 32)" fill="#cecece"/>
          <path id="Path_68" data-name="Path 68" d="M4,0h8a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(104 56)" fill="#cecece"/>
          <path id="Path_67" data-name="Path 67" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(128 56)" fill="#cecece"/>
          <path id="Path_65" data-name="Path 65" d="M4,0h8a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(104 80)" fill="#cecece"/>
          <path id="Path_64" data-name="Path 64" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(128 80)" fill="#cecece"/>
          <path id="path_5" data-name="path 5" d="M23.345,12.236A9.706,9.706,0,0,0,11.609,14.8l4.313,4.313a1.249,1.249,0,1,1-1.766,1.766l-3.922-3.922L.225,37.48a1.772,1.772,0,0,0,0,1.539,1.757,1.757,0,0,0,2.344.8L13.008,34.73,9.164,30.886a1.24,1.24,0,0,1,0-1.766,1.254,1.254,0,0,1,1.766,0l4.454,4.454,7.97-3.891a9.706,9.706,0,0,0-.008-17.447Zm7.2-2.727A7.765,7.765,0,0,0,28.173,0a7.739,7.739,0,0,0-.617,11.868l.625.625a7.738,7.738,0,0,0,11.868-.617,7.765,7.765,0,0,0-9.509-2.367Z" transform="translate(19.951 32)" fill="#f4a261"/>
          <path id="path_3" data-name="path 3" d="M38.206,1.794C36.4-.01,33.957-.463,32.339.479c-4.6,2.681-14.16-4.147-25.084,6.777S3.159,27.738.479,32.339C-.463,33.957-.01,36.4,1.794,38.206s4.249,2.257,5.867,1.315c4.6-2.68,14.16,4.147,25.083-6.777s4.1-20.482,6.777-25.084c.942-1.617.489-4.062-1.315-5.867ZM19.053,7.463C14.507,8.6,8.6,14.506,7.463,19.053a1.25,1.25,0,1,1-2.425-.606C6.4,13,12.993,6.4,18.447,5.037a1.25,1.25,0,0,1,.606,2.425Z" transform="translate(20 104)" fill="#e9c46a"/>
          <path id="path_9" data-name="path 9" d="M2.124.652A1.08,1.08,0,0,1,4.09.568,11.91,11.91,0,0,0,14.5,6.645h5.556A13.338,13.338,0,0,1,33.391,19.98a13.731,13.731,0,0,1-.1,1.424c-4.431-3.174-10.827-5.869-19.9-5.869a1.111,1.111,0,0,0,0,2.222c17.46,0,24.863,10.7,26.5,14.724a2.225,2.225,0,0,1-4.118,1.688,18.272,18.272,0,0,0-4.994-6.292,13.305,13.305,0,0,1-12.147,5.362C7.729,32.446.055,22.668.055,10.694A25.255,25.255,0,0,1,2.124.652Z" transform="translate(55.945 72.024)" fill="#2a9d8f"/>
        </motion.g>
        <motion.g id="layer3" x={translateLayer3} y={translateLayer3} transition={{ duration: 1 }}>
          <path id="Path_78" data-name="Path 78" d="M4,0H180a4,4,0,0,1,4,4V16H0V4A4,4,0,0,1,4,0Z" fill="#f0f0f0"/>
          <path id="Path_75" data-name="Path 75" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(124 100)" fill="#f0f0f0"/>
          <path id="Path_72" data-name="Path 72" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(124 124)" fill="#f0f0f0"/>
          <path id="Path_69" data-name="Path 69" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(124 28)" fill="#f0f0f0"/>
          <path id="Path_66" data-name="Path 66" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(124 52)" fill="#f0f0f0"/>
          <path id="path_8" data-name="path 8" d="M5.435,76.8l-5.2-5.2a.8.8,0,0,1,0-1.131l1.131-1.131a.8.8,0,0,1,1.131,0l3.5,3.5,7.5-7.5a.8.8,0,0,1,1.131,0l1.131,1.131a.8.8,0,0,1,0,1.131l-9.2,9.2a.8.8,0,0,1-1.131,0Z" transform="translate(100 -35.098)" fill="#5698b2"/>
          <path id="path_7" data-name="path 7" d="M5.435,76.8l-5.2-5.2a.8.8,0,0,1,0-1.131l1.131-1.131a.8.8,0,0,1,1.131,0l3.5,3.5,7.5-7.5a.8.8,0,0,1,1.131,0l1.131,1.131a.8.8,0,0,1,0,1.131l-9.2,9.2a.8.8,0,0,1-1.131,0Z" transform="translate(100 -11.098)" fill="#5698b2"/>
          <path id="Path_63" data-name="Path 63" d="M4,0H40a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(124 76)" fill="#f0f0f0"/>
          <path id="path_6" data-name="path 6" d="M5.435,76.8l-5.2-5.2a.8.8,0,0,1,0-1.131l1.131-1.131a.8.8,0,0,1,1.131,0l3.5,3.5,7.5-7.5a.8.8,0,0,1,1.131,0l1.131,1.131a.8.8,0,0,1,0,1.131l-9.2,9.2a.8.8,0,0,1-1.131,0Z" transform="translate(100 12.902)" fill="#5698b2"/>
          <path id="path_4" data-name="path 4" d="M23.345,12.236A9.706,9.706,0,0,0,11.609,14.8l4.313,4.313a1.249,1.249,0,1,1-1.766,1.766l-3.922-3.922L.225,37.48a1.772,1.772,0,0,0,0,1.539,1.757,1.757,0,0,0,2.344.8L13.008,34.73,9.164,30.886a1.24,1.24,0,0,1,0-1.766,1.254,1.254,0,0,1,1.766,0l4.454,4.454,7.97-3.891a9.706,9.706,0,0,0-.008-17.447Zm7.2-2.727A7.765,7.765,0,0,0,28.173,0a7.739,7.739,0,0,0-.617,11.868l.625.625a7.738,7.738,0,0,0,11.868-.617,7.765,7.765,0,0,0-9.509-2.367Z" transform="translate(15.951 28)" fill="#f8c59c"/>
          <path id="path_2" data-name="path 2" d="M38.206,1.794C36.4-.01,33.957-.463,32.339.479c-4.6,2.681-14.16-4.147-25.084,6.777S3.159,27.738.479,32.339C-.463,33.957-.01,36.4,1.794,38.206s4.249,2.257,5.867,1.315c4.6-2.68,14.16,4.147,25.083-6.777s4.1-20.482,6.777-25.084c.942-1.617.489-4.062-1.315-5.867ZM19.053,7.463C14.507,8.6,8.6,14.506,7.463,19.053a1.25,1.25,0,1,1-2.425-.606C6.4,13,12.993,6.4,18.447,5.037a1.25,1.25,0,0,1,.606,2.425Z" transform="translate(16 100)" fill="#f1da9f"/>
          <path id="path_1" data-name="path 1" d="M2.124.652A1.08,1.08,0,0,1,4.09.568,11.91,11.91,0,0,0,14.5,6.645h5.556A13.338,13.338,0,0,1,33.391,19.98a13.731,13.731,0,0,1-.1,1.424c-4.431-3.174-10.827-5.869-19.9-5.869a1.111,1.111,0,0,0,0,2.222c17.46,0,24.863,10.7,26.5,14.724a2.225,2.225,0,0,1-4.118,1.688,18.272,18.272,0,0,0-4.994-6.292,13.305,13.305,0,0,1-12.147,5.362C7.729,32.446.055,22.668.055,10.694A25.255,25.255,0,0,1,2.124.652Z" transform="translate(51.945 68.024)" fill="#62d5c8"/>
        </motion.g>
      </svg>
    </AnimatedSvgWrapper>
  );
};
