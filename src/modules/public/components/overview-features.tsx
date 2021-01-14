import React from "react";
import styled from "styled-components";
import { Container } from "layout/container";
import { Feature } from "modules/public/components/feature";
import { OverviewFeaturesGraphics } from "modules/public/components/overview-features-graphics";
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

const StyledParagraph = styled.p<{ theme: Theme }>`
  margin-top: ${({theme}) => theme.space.small};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

interface Props {

}

export const OverviewFeatures: React.FC<Props> = props => (
  <StyledContainer>
    <StyledInnerContainer>
      <OverviewFeaturesGraphics />
    </StyledInnerContainer>
    <StyledInnerContainer>
      <h2>Features</h2>
      <Feature title="1. Cookbooks are meant to be simple">
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
      </Feature>
      <Feature title="2. Groceries shouldn’t take all day">
        <StyledParagraph>
          Given your meal planning, Foodl can automatically build your grocery
          list and export it to your favourite list application.
        </StyledParagraph>
        <StyledParagraph>
          Home assistants can automatically add a recipe’s ingredients to your
          grocery list.
        </StyledParagraph>
      </Feature>
      <Feature title="3. Food is all about sharing">
        <StyledParagraph>
          Invite friends or family to view and contribute to your cookbook.
        </StyledParagraph>
        <StyledParagraph>
          Home assistants can automatically share your cookbook with your
          contacts.
        </StyledParagraph>
      </Feature>
    </StyledInnerContainer>
  </StyledContainer>
);
