import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "theme";
import { Container } from "layout/container";
import { Logo } from "components/logo";
import { BurgerButton } from "./burger-button";

const StyledHeader = styled(motion.header)<{ theme: Theme }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 48;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  max-width: ${({ theme }) => theme.sizes.headerWidth};
  padding: 0 ${({ theme }) => theme.space.large};

  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1024;

  @media (max-width: ${({theme}) => theme.breakpoints.medium}px) {
    max-width: initial;
  }
`;

const StyledBurgerButton = styled(BurgerButton)<{ theme: Theme }>`
  display: none;

  @media (max-width: ${({theme}) => theme.breakpoints.medium}px) {
    display: inline-flex;
    flex: 0 0 auto;
  }
`;

const StyledLogoWrapper = styled.div<{ theme: Theme }>`
  flex: 0 0 auto;
  text-align: center;

  @media (max-width: ${({theme}) => theme.breakpoints.medium}px) {
    flex: 1 0 auto;
    margin-right: 50px;
  }
`;

const StyledDrawer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 0 0;

  @media (max-width: ${({theme}) => theme.breakpoints.medium}px) {
    position: fixed;
    top: ${({theme}) => theme.sizes.headerHeight};
    left: 0;
    width: ${({theme}) => theme.sizes.drawerWidth};
    height: calc(100vh - ${({theme}) => theme.sizes.headerHeight});
    padding: ${({theme}) => theme.space.large} 0;

    background: ${({theme}) => theme.colors.background};
    flex-direction: column;
    align-items: start;
    transform: translateX(-${({theme}) => theme.sizes.drawerWidth});
    transition: transform .2s ease-out;
    
    &.drawer-open {
      transform: translateX(0);
    }
  }
`;

interface Props {
  className?: string;
  isDrawerOpened: boolean;
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Header: React.FC<Props> = props => (
  <StyledHeader className={props.className}>
    <StyledContainer>
      <StyledBurgerButton onClick={props.onMenuClick} />
      <StyledLogoWrapper children={<Logo />} />
      <StyledDrawer
        className={props.isDrawerOpened && "drawer-open"}
        aria-hidden={!props.isDrawerOpened}
      >
        { props.children }
      </StyledDrawer>
    </StyledContainer>
  </StyledHeader>
);