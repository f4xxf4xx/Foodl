import React from "react";
import styled from "styled-components";
import { SpinningBox } from "components/spinning-box";
import { Container } from "layout/container";
import { Theme } from "theme";
import EmptyPlate from "assets/empty-plate.svg";

const StyledContainer = styled(Container as any)`
  display: flex;
  flex-direction: column;
  height: 66vh;
  align-items: center;
  justify-content: center;
`;

const StyledCode = styled.span`
  font-size: 10rem;
`;

const StyledDescription = styled.p<{ theme: Theme}>`
  font-size: ${({theme}) => theme.fontSizes.large};
  margin: ${({theme}) => theme.space.large}px 0;
  text-transform: uppercase;
  text-align: center;
`;

export const NotFound: React.FC = () => (
  <StyledContainer>
    <SpinningBox>
      <StyledCode>404</StyledCode>
      <StyledDescription>This plate looks empty</StyledDescription>
      <img src={EmptyPlate} alt="Empty plate" />
    </SpinningBox>
  </StyledContainer>
);

