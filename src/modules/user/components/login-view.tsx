import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button } from "components/button";
import { Container } from "layout/container";
import { logInWithGoogle } from "modules/user/store/user-slice";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({theme}) => theme.space.large}px;
`;

export const LoginView: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <StyledContainer>
      <Button
        type="button"
        mode="accent"
        onClick={() => dispatch(logInWithGoogle())}
      >
        Log in with Google
      </Button>
    </StyledContainer>
  )
};
