import React from "react";
import styled from "styled-components";
import { AnimateSharedLayout } from "framer-motion";
import { Button } from "components/button";
import { NavLink } from "layout/nav-link";
import { Theme } from "theme";

const StyledNav = styled.nav<{ theme: Theme}>`
  display: flex;
  flex-direction: inherit;
  padding: 0 0 0 ${({ theme }) => theme.space.large};
  flex: 1 0 0;
  align-items: start;
`;

const StyledActions = styled.div<{ theme: Theme}>`
  padding: 0 0 0 ${({ theme }) => theme.space.large};
  flex: 0 0 auto;
`;

const StyledButton = styled(Button)<{ theme: Theme }>`
  & + & {
    margin-left: ${({theme}) => theme.space.small};
  }
`;
interface Props {
  className?: string;
}

export const PublicNav: React.FC<Props> = ({className}) => (
  <>
    <StyledNav className={className}>
      <AnimateSharedLayout>
        <NavLink to="/" layoutId="nav-link">Overview</NavLink>
        <NavLink to="/features" layoutId="nav-link">Features</NavLink>
        <NavLink to="/pricing" layoutId="nav-link">Pricing</NavLink>
      </AnimateSharedLayout>
    </StyledNav>
    <StyledActions>
      <StyledButton type="link" mode="normal" to="/login">Log In</StyledButton>
      <StyledButton type="link" mode="accent" to="/register">Register</StyledButton>
    </StyledActions>
  </>
);
