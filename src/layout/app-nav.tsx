import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AnimateSharedLayout } from "framer-motion";
import { Button } from "components/button";
import { NavLink } from "layout/nav-link";
import { logOut } from "modules/user/store/user-slice";
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
  const dispatch = useDispatch();

  const onSignOutClick = () => {
    dispatch(logOut());
  };

  return (
    <>
      <StyledNav className={className}>
        <AnimateSharedLayout>
          <NavLink to="/app" layoutId="nav-link">Home</NavLink>
          <NavLink to="/app/cookbooks" layoutId="nav-link">My cookbooks</NavLink>
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
