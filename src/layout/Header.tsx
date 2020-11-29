import React, { useState, useLayoutEffect, useRef } from "react";
import { useViewportScroll } from "framer-motion";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "theme";
import { Container } from "components/Container";
import { Logo } from "components/Logo";

import "./Styles/MainLayout.css";

const StyledHeader = styled(motion.header)<{ theme: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  overflow: hidden;

  & .opaque-effect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: ${({ theme }) => theme.colors.dark.yellow};
  }
`;

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  position: relative;

  & > .spacer {
    flex-grow: 1;
  }
`;

const opaqueEffect = {
  opaque: (headerWidth) => ({
    clipPath: `circle(${headerWidth * 2}px at 0 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  transparent: {
    clipPath: "circle(0px at 0 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      restDelta: 2
    }
  }
};

interface Props {
  className?: string;
  children?: any;
}

export const Header: React.FC<Props> = props => {
  const ref = useRef<HTMLElement>();
  const [headerOpaque, setHeaderOpaque] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(0);
  const { scrollY } = useViewportScroll();

  useLayoutEffect(() =>{
    const headerElement = ref.current;
    if (headerElement) {
      setHeaderWidth(headerElement.offsetWidth);
    }
    scrollY.onChange(y => {setHeaderOpaque(!!y)});
  }, [ scrollY ]);

  return (
    <StyledHeader ref={ref}
      className={props.className}
      initial={false}
      animate={headerOpaque ? "opaque" : "transparent"}
    >
      <StyledContainer>
        <Logo />
        <div className="spacer"></div>
        { props.children }
      </StyledContainer>
      <motion.div className="opaque-effect" custom={headerWidth} variants={opaqueEffect}></motion.div>
    </StyledHeader>
  );
}
