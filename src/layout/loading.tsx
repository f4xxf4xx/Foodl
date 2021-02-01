import React from "react";
import styled from "styled-components";
import { SpinningBox } from "components/spinning-box";
import { Container } from "layout/container";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)`
  display: flex;
  flex-direction: column;
  height: 66vh;
  align-items: center;
  justify-content: center;
`;

const StyledDescription = styled.p<{ theme: Theme}>`
  font-size: ${({theme}) => theme.fontSizes.large};
  text-transform: uppercase;
  text-align: center;
`;

export const Loading: React.FC = () => (
  <StyledContainer>
    <SpinningBox>
      <StyledDescription>Loading</StyledDescription>
    </SpinningBox>
  </StyledContainer>
);
