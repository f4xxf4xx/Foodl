import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Theme } from "theme";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

const StyledLink = styled(Link)<{ theme: Theme }>`
  position: relative;
  height: ${({theme}) => theme.fontSizes.h2};
  display: inline-flex;
  align-items: flex-end;
  padding: 0 ${({theme}) => theme.space.xsmall};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.medium};
  text-transform: uppercase;
  text-decoration: none;

  & + & {
    margin: 0;
    margin-left: ${({theme}) => theme.space.medium};
  }

  @media (max-width: ${({theme}) => theme.breakpoints.medium}px) {
    & + & {
      margin: 0;
      margin-top: ${({theme}) => theme.space.medium};
    }
  }
`;

const StyledUnderline = styled(motion.div)<{ theme: Theme }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({theme}) => theme.space.small};
  border-radius: ${({theme}) => theme.space.small};
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
  const location = useLocation();
  const active = isActive(props.to, location.pathname);
  return (
    <StyledLink to={props.to}>
      {props.children}
      {active && (<StyledUnderline
        layoutId={props.layoutId}
        initial={false}
        transition={spring}
      />)}
    </StyledLink>
  );
}
