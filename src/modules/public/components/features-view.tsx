import React, { createRef } from "react";
import styled, { withTheme } from "styled-components";
import { Theme } from "theme";

const StyledContainer = styled.div<{theme: Theme}>`
  display: flex;
  min-height: 84vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  margin: 0 auto;

  & > * {
    flex-grow: 1;
    flex-basis: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    padding: 0 ${({ theme }) => theme.space.large};
    flex-direction: row;

    &.inverted {
      flex-direction: row-reverse;
    }
  }
`;

const FeaturesView: React.FC<{ theme?: Theme }> = ({ theme }) => {
  const nextArticleRef = createRef<HTMLDivElement>();
  return (
    <>
      <StyledContainer id="overview" title="Overview" />
      <StyledContainer id="features" title="Features" />
      <StyledContainer id="pricing" title="Pricing" />
    </>
  );
};

const ThemedFeaturesView = withTheme(FeaturesView)
export { ThemedFeaturesView as FeaturesView };
