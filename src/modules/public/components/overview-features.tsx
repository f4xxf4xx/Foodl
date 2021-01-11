import React from "react";
import styled from "styled-components";
import { Container } from "layout/container";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  padding: ${({theme}) => theme.space.large};
`;

const StyledInnerContainer = styled.div<{ theme: Theme }>`
  flex-grow: 1;
  flex-basis: 0;
  
  & + & {
    margin-left: ${({theme}) => theme.space.large};
  }
`;

interface Props {

}

export const OverviewFeatures: React.FC<Props> = props => (
  <StyledContainer>
    <StyledInnerContainer></StyledInnerContainer>
    <StyledInnerContainer>
      <h2>Features</h2>
    </StyledInnerContainer>
  </StyledContainer>
);
