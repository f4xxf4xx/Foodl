import React from "react";
import styled from "styled-components";
import { Button } from "components/button";
import { Theme } from "theme";

const StyledButton = styled(Button)<{ theme: Theme }>`
  & + & {
    margin-left: ${({theme}) => theme.space.small};
  }
`;

interface Props { }

export const PublicNavActions: React.FC<Props> = props => (
  <>
    <StyledButton type="link" mode="normal" to="/login">Log In</StyledButton>
    <StyledButton type="link" mode="accent" to="/register">Register</StyledButton>
  </>
);
