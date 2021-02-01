import React, { useContext, useMemo, ComponentType } from "react";
import { useSelector } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "theme";
import { Container } from "layout/container";
import { Logo } from "components/logo";
import { BurgerButton } from "layout/burger-button";
import { AppNav } from "layout/app-nav";
import { PublicNav } from "layout/public-nav";
import { ApplicationState } from "index";

const StyledHeader = styled(motion.header)<{ theme: Theme }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 48;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  min-height: ${({ theme }) => theme.sizes.headerHeight}px;
  max-width: ${({ theme }) => theme.sizes.headerWidth};
  padding: 0 ${({ theme }) => theme.space.large}px;

  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1024;

  @media (max-width: ${({theme}) => theme.breakpoints.medium-1}px) {
    max-width: initial;
  }
`;

const StyledBurgerButton = styled(BurgerButton)<{ theme: Theme }>`
  flex: 0 0 auto;
`;

const StyledLogoWrapper = styled.div<{ theme: Theme }>`
  flex: 0 0 auto;
  text-align: center;

  @media (max-width: ${({theme}) => theme.breakpoints.medium-1}px) {
    flex: 1 0 auto;
    margin-right: 50px;
  }
`;

const StyledHeaderNav = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 0 0;
`;

const StyledDrawerNav = styled(motion.div)<{ theme: Theme }>`
  position: fixed;
  top: ${({theme}) => theme.sizes.headerHeight}px;
  left: 0;
  display: flex;
  width: ${({theme}) => theme.sizes.drawerWidth}px;
  height: calc(100vh - ${({theme}) => theme.sizes.headerHeight}px);
  padding: ${({theme}) => theme.space.large}px 0;

  background: ${({theme}) => theme.colors.background};
  flex-direction: column;
  align-items: start;
`;

function useNavType(props: Props): [ComponentType<any>, any] {
  const { mode, isDrawerOpened } = props;
  const theme = useContext<Theme>(ThemeContext);
  const drawerWidth = theme.sizes.drawerWidth;
  const transition = theme.animations.transition;

  return useMemo(() => {
    if (mode === "header") {
      return [StyledHeaderNav, {}]
    } else {
      return [StyledDrawerNav, {
        variants: {
          drawerOpened: { x: 0 },
          drawerClosed: { x: -drawerWidth }
        },
        'aria-hidden': !isDrawerOpened,
        transition
      }];
    }
  }, [mode, isDrawerOpened, drawerWidth, transition]);
}

interface Props {
  mode: 'header' | 'drawer';
  isDrawerOpened: boolean;
  className?: string;
  onMenuClick?: (isDrawerOpened: boolean) => void;
}

export const Header: React.FC<Props> = (props) => {
  const [Nav, extraProps] = useNavType(props);
  const isDrawerMode = props.mode === 'drawer';
  const isAuthenticated = useSelector(
    (state: ApplicationState) => !!state.user.profile
  );
  
  return (
    <StyledHeader
      className={props.className}
      initial="drawerClosed"
      animate={props.isDrawerOpened ? "drawerOpened" : "drawerClosed"}
    >
      <StyledContainer>
        {isDrawerMode && <StyledBurgerButton 
          isOpen={props.isDrawerOpened}
          onClick={() => props.onMenuClick(props.isDrawerOpened)}
        />}
        <StyledLogoWrapper>
          <Logo homePath={isAuthenticated ? "/app" : "/"} />
        </StyledLogoWrapper>
        <Nav {...extraProps}>
          {isAuthenticated ? <AppNav /> : <PublicNav />}
        </Nav>
      </StyledContainer>
    </StyledHeader>
  );
}
