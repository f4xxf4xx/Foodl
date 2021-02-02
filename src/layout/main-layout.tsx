import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from 'react-responsive'
import { Header } from "layout/header";
import { Footer } from "layout/footer";
import { Theme } from "theme";
import "layout/Styles/MainLayout.css";

const StyledHeader = styled(Header)`
  flex: 0 0 auto;
`;

const StyledBackdrop = styled(motion.div)<{ theme: Theme }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({theme}) => theme.colors.dark.blue};
  z-index: 24;
`;

const StyledContent = styled(motion.main)<{theme: Theme}>`
  flex: 1 0 auto;
`;

const StyledFooter = styled(Footer)`
  flex: 0 0 auto;
`;

function setIsWindowScrollable(isScrollable: boolean) {
  const html = document.documentElement;
  if (html) {
    html.style['overflow'] = isScrollable ? 'auto' : 'hidden';
  }
}

interface Props {
  homePath: string;
  nav: JSX.Element;
}

export const MainLayout: React.FC<Props> = (props) => {
  const theme = useContext<Theme>(ThemeContext);
  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.medium-1}px)`
  });
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  useEffect(() => setIsWindowScrollable(!isDrawerOpened), [isDrawerOpened]);
  
  return (
    <>
      <StyledHeader
        mode={isMobile ? "drawer" : "header"}
        isDrawerOpened={isDrawerOpened}
        homePath={props.homePath}
        onMenuClick={() => setIsDrawerOpened(!isDrawerOpened)}
        children={props.nav}
      />
      <AnimatePresence>
        {isDrawerOpened && <StyledBackdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: .12 }}
          exit={{ opacity: 0 }}
          transition={theme.animations.transition}
          onClick={() => setIsDrawerOpened(false)}
        />}
      </AnimatePresence>
      <StyledContent
        initial="visible"
        animate={isDrawerOpened ? "hidden" : "visible"}
        variants={{
          visible: {x: 0},
          hidden: {x: -24}
        }}
        transition={theme.animations.transition}
      >
        { props.children }
      </StyledContent>
      <StyledFooter />
    </>
  );
};
