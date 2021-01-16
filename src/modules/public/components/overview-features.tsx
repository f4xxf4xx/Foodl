import React, { forwardRef } from "react";
import styled from "styled-components";
import { Container } from "layout/container";
import { Feature } from "modules/public/components/feature";
import { OverviewFeaturesGraphics } from "modules/public/components/overview-features-graphics";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: grid;
  grid-gap: ${({theme}) => theme.space.large};
  padding: ${({theme}) => theme.space.large};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
      "graphics heading"
      "graphics feature1"
      "graphics feature2"
      "graphics feature3";
  justify-items: start;
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
    justify-items: center;
  }
`;

const StyledHeading = styled.h2`
  grid-area: heading;
`;

const StyledFeature1 = styled(Feature)`
  grid-area: feature1;
`;

const StyledFeature2 = styled(Feature)`
  grid-area: feature2;
`;

const StyledFeature3 = styled(Feature)`
  grid-area: feature3;
`;

const StyledParagraph = styled.p<{ theme: Theme }>`
  margin-top: ${({theme}) => theme.space.small};
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

export const OverviewFeatures = forwardRef<Element, Props>((_, ref) => (
  <StyledContainer ref={ref}>
    <StyledHeading>Features</StyledHeading>
    <StyledFeature1 title="1. Cookbooks are meant to be simple">
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
    <StyledFeature2 title="2. Groceries shouldn’t take all day">
      <StyledParagraph>
        Given your meal planning, Foodl can automatically build your grocery
        list and export it to your favourite list application.
      </StyledParagraph>
      <StyledParagraph>
        Home assistants can automatically add a recipe’s ingredients to your
        grocery list.
      </StyledParagraph>
    </StyledFeature2>
    <StyledFeature3 title="3. Food is all about sharing">
      <StyledParagraph>
        Invite friends or family to view and contribute to your cookbook.
      </StyledParagraph>
      <StyledParagraph>
        Home assistants can automatically share your cookbook with your
        contacts.
      </StyledParagraph>
    </StyledFeature3>
    <StyledOverviewFeaturesGraphics />
  </StyledContainer>
));
