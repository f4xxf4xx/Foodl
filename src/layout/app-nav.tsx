import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AnimateSharedLayout } from "framer-motion";
import { Button } from "components/button";
import { NavLink } from "layout/nav-link";
import { firebase } from "config";
import { Theme } from "theme";

const StyledNav = styled.nav<{ theme: Theme}>`
  display: flex;
  flex-direction: inherit;
  padding: 0 0 0 ${({ theme }) => theme.space.large}px;
  flex: 1 0 0;
  align-items: start;
`;

const StyledActions = styled.div<{ theme: Theme}>`
  padding: 0 0 0 ${({ theme }) => theme.space.large}px;
  flex: 0 0 auto;
`;

const StyledButton = styled(Button)<{ theme: Theme }>`
  & + & {
    margin-left: ${({theme}) => theme.space.small}px;
  }
`;
interface Props {
  className?: string;
}

export const AppNav: React.FC<Props> = ({className}) => {
  const history = useHistory();

  const onSignOutClick = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <>
      <StyledNav className={className}>
        <AnimateSharedLayout>
          <NavLink to="/app" layoutId="nav-link">Home</NavLink>
          <NavLink to="/app/recipes" layoutId="nav-link">Recipes</NavLink>
          <NavLink to="/app/cart" layoutId="nav-link">Cart</NavLink>
        </AnimateSharedLayout>
      </StyledNav>
      <StyledActions>
        <StyledButton type="button" mode="normal" onClick={onSignOutClick}>
          Sign out
        </StyledButton>
      </StyledActions>
    </>
  );
}
