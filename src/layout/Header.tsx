import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "theme";
import { Logo } from "components/Logo";

import "./Styles/MainLayout.css";

const StyledHeader = styled(motion.header)<{ theme: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 48;
  padding: ${({ theme }) => theme.space.large};
`;

const StyledContainer = styled.div<{ theme: Theme }>`
  position: relative;
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  max-width: ${({ theme }) => theme.sizes.headerWidth};
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;

  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.space.small};
  box-shadow: ${({ theme }) => theme.shadows.panel};

  & > .spacer {
    flex-grow: 1;
    padding: 0 ${({ theme }) => theme.space.medium};
    border-radius: ${({ theme }) => theme.space.small};
  }
`;

interface Props {
  className?: string;
  children?: any;
}

export const Header: React.FC<Props> = props => (
  <StyledHeader className={props.className}>
    <StyledContainer>
      <Logo />
      <div className="spacer"><i>Search recipes</i></div>
      { props.children }
    </StyledContainer>
  </StyledHeader>
);
