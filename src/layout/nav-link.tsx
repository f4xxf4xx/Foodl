import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Theme } from "theme";

const StyledLink = styled(Link)<{ theme: Theme }>`
  position: relative;
  height: ${({theme}) => theme.fontSizes.h2};
  display: inline-flex;
  align-items: flex-end;
  padding: 0 ${({theme}) => theme.space.xsmall}px;
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.medium};
  text-transform: uppercase;
  text-decoration: none;

  & + & {
    margin: 0;
    margin-left: ${({theme}) => theme.space.medium}px;
  }

  @media (max-width: ${({theme}) => theme.breakpoints.medium-1}px) {
    & + & {
      margin: 0;
      margin-top: ${({theme}) => theme.space.medium}px;
    }
  }
`;

const StyledUnderline = styled(motion.div)<{ theme: Theme }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({theme}) => theme.space.small}px;
  border-radius: ${({theme}) => theme.space.small}px;
  background-color: ${({theme}) => theme.colors.xlight.orange};
  z-index: -1;
`;

function isActive(target, path): boolean {
  return !!matchPath(target, { path, exact: true });
}

interface Props {
  to: string;
  layoutId?: string;
}

export const NavLink: React.FC<Props> = props => {
  const theme = useContext<Theme>(ThemeContext);
  const location = useLocation();
  const active = isActive(props.to, location.pathname);
  return (
    <StyledLink to={props.to}>
      {props.children}
      <AnimatePresence>
        {active && (<StyledUnderline
          layoutId={props.layoutId}
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 24, opacity: 0 }}
          transition={theme.animations.transition}
        />)}
      </AnimatePresence>
    </StyledLink>
  );
}
