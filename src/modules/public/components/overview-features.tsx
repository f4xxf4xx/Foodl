import React, { useContext, RefObject } from "react";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useStaggerEffect } from "hooks/use-stagger-effect";
import { useHasBeenViewed } from "hooks/use-has-been-viewed";
import { Container } from "layout/container";
import { OverviewFeaturesGraphics } from "modules/public/components/overview-features-graphics";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: grid;
  grid-gap: ${({theme}) => theme.space.large}px;
  padding: ${({theme}) => theme.space.large}px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
      "graphics heading"
      "graphics feature1"
      "graphics feature2"
      "graphics feature3";
  justify-items: normal;
  align-items: start;

  @media (max-width: ${({theme}) => theme.breakpoints.large-1}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "graphics heading"
        "graphics feature1"
        "feature2 feature3";
  }

  @media (max-width: ${({theme}) => theme.breakpoints.medium-1}px) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "heading"
        "feature1"
        "feature2"
        "feature3"
        "graphics";
  }
`;

const StyledHeading = styled(motion.h2)`
  grid-area: heading;
`;

const FeatureHeading = styled.h3<{ theme: Theme }>`
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: -${({theme}) => theme.space.xsmall}px;
    top: calc(1em - ${({theme}) => theme.space.small / 2}px);
    width: 33%;
    height: ${({theme}) => theme.space.small}px;
    border-radius: ${({theme}) => theme.space.small}px;
    background-color: ${({theme}) => theme.colors.xlight.orange};
    z-index: -1;
  }
`;

const StyledFeature1 = styled(motion.div)`
  grid-area: feature1;
`;

const StyledFeature2 = styled(motion.div)`
  grid-area: feature2;
`;

const StyledFeature3 = styled(motion.div)`
  grid-area: feature3;
`;

const StyledParagraph = styled.p<{ theme: Theme }>`
  margin-top: ${({theme}) => theme.space.small}px;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const StyledOverviewFeaturesGraphics = styled(OverviewFeaturesGraphics)`
  grid-area: graphics;
  align-self: center;
  width: 100%;
  height: auto;
`;

interface Props {

}

export const OverviewFeatures = React.forwardRef<HTMLDivElement, Props>((_, ref) => {
  const getAnchor = rect => ({ x: rect.x + rect.width, y: rect.y });
  const theme = useContext<Theme>(ThemeContext);
  const containerRef = ref as RefObject<HTMLDivElement>;
  const hasBeenViewed = useHasBeenViewed(containerRef);
  const headingStagger = useStaggerEffect<HTMLHeadingElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const feature1Stagger = useStaggerEffect<HTMLDivElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const feature2Stagger = useStaggerEffect<HTMLDivElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const feature3Stagger = useStaggerEffect<HTMLDivElement>(hasBeenViewed, theme, containerRef, getAnchor);

  return (
    <StyledContainer ref={ref}>
      <StyledHeading {...headingStagger}>
        Features
      </StyledHeading>
      <StyledFeature1 {...feature1Stagger}>
        <FeatureHeading>Cookbooks are meant to be simple</FeatureHeading>
        <StyledParagraph>
          Foodl organizes your recipes by ingredients, activity and custom
          tags. This enables you to efficiently search your saved recipes.
        </StyledParagraph>
        <StyledParagraph>
          The rich recipe editor automatically builds the ingredient list, for
          your convenience.
        </StyledParagraph>
        <StyledParagraph>
          The recipe viewer can display the amount of ingredients directly
          into the preparation section.
        </StyledParagraph>
        <StyledParagraph>
          Home assistants can assist you during the preparation. 
        </StyledParagraph>
      </StyledFeature1>
      <StyledFeature2 {...feature2Stagger}>
        <FeatureHeading>Groceries shouldn’t take all day</FeatureHeading>
        <StyledParagraph>
          Given your meal planning, Foodl can automatically build your grocery
          list and export it to your favourite list application.
        </StyledParagraph>
        <StyledParagraph>
          Home assistants can automatically add a recipe’s ingredients to your
          grocery list.
        </StyledParagraph>
      </StyledFeature2>
      <StyledFeature3 {...feature3Stagger}>
        <FeatureHeading>Food is all about sharing</FeatureHeading>
        <StyledParagraph>
          Invite friends or family to view and contribute to your cookbook.
        </StyledParagraph>
        <StyledParagraph>
          Home assistants can automatically share your cookbook with your
          contacts.
        </StyledParagraph>
      </StyledFeature3>
      <StyledOverviewFeaturesGraphics relativeToRef={containerRef} isVisible={hasBeenViewed} getAnchorPoint={getAnchor} />
    </StyledContainer>
  );
});
