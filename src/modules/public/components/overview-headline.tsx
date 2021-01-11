import React from "react";
import styled from "styled-components";
import { Button } from "components/button";
import { Container } from "layout/container";
import { ScrollDownIndicator } from "modules/public/components/scroll-down-indicator";
import { OverviewHeadlineGraphics } from "modules/public/components/overview-headline-graphics";
import { OverviewHeadlineSpill } from "modules/public/components/overview-headline-spill";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{theme: Theme}>`
  display: grid;
  grid-gap: ${({theme}) => theme.space.large};
  padding: ${({theme}) => theme.space.large};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
      "headline graphics"
      "description graphics"
      "get-started graphics"
      "scroll-down graphics"
      "scroll-indicator graphics";
  justify-items: start;
  align-items: center;

  @media (max-width: ${({theme}) => theme.breakpoints.medium-1}px) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "headline"
        "description"
        "graphics"
        "get-started"
        "scroll-down"
        "scroll-indicator";
    justify-items: center;
  }
`;

const StyledAccent = styled.b<{ theme: Theme }>`
  font-weight: inherit;
  color: ${({theme}) => theme.colors.primary};
`;

const StyledHeadline = styled.h1`
  grid-area: headline;
`;

const StyledDescription = styled.p<{ theme: Theme }>`
  grid-area: description;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const StyledButton = styled(Button as any)`
  grid-area: get-started;
`;

const StyledScrollDown = styled.p<{ theme: Theme }>`
  grid-area: scroll-down;
  font-size: ${({theme}) => theme.fontSizes.regular};
`;

const StyledGraphics = styled.div`
  position: relative;
  width: 100%;
  grid-area: graphics;
`

const StyledOverviewHeadlineGraphics = styled(OverviewHeadlineGraphics)`
  width: 100%;
  height: auto;
`;

const StyledOverviewHeadlineSpill = styled(OverviewHeadlineSpill)<{theme: Theme}>`
  position: absolute;
  top: -${({theme}) => theme.space.large};
  right: -${({theme}) => theme.space.large};
  bottom: -${({theme}) => theme.space.large};
  z-index: -1;
  height: calc(100% + ${({theme}) => theme.space.large} * 2);
  width: auto;
`;

interface Props {

}

export const OverviewHeadline: React.FC<Props> = props => {
  return (
    <StyledContainer>
      <StyledHeadline>
        Your Personal Cookbook <StyledAccent>Digitalized.</StyledAccent>
      </StyledHeadline>
      <StyledDescription>
        Foodl saves your personal recipes, helps you with groceries and
        facilitates sharing with friends and family.
      </StyledDescription>
      <StyledButton type="link" mode="accent" to="/register">
        Get started
      </StyledButton>
      <StyledScrollDown>
        or scroll down to learn more
      </StyledScrollDown>
      <ScrollDownIndicator onClick={() => {}} />
      <StyledGraphics>
        <StyledOverviewHeadlineGraphics />
        <StyledOverviewHeadlineSpill />
      </StyledGraphics>
    </StyledContainer>
  );
}
