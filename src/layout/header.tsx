import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "theme";
import { Container } from "layout/container";
import { Logo } from "components/logo";

import "./Styles/MainLayout.css";

const StyledHeader = styled(motion.header)<{ theme: Theme }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 48;
`;

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  max-width: ${({ theme }) => theme.sizes.headerWidth};

  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
`;

const StyledCenterContainer = styled.div`
  flex-grow: 1;
`;

const StyledRightContainer = styled.div<{ theme: Theme }>`
  flex-grow: 0;
  padding: 0 ${({ theme }) => theme.space.large};
`;

interface Props {
  className?: string;
  center: JSX.Element;
  right: JSX.Element;
}

export const Header: React.FC<Props> = props => (
  <StyledHeader className={props.className}>
    <StyledContainer>
      <Logo />
      <StyledCenterContainer>{ props.center }</StyledCenterContainer>
      <StyledRightContainer>{ props.right }</StyledRightContainer>
    </StyledContainer>
  </StyledHeader>
);
