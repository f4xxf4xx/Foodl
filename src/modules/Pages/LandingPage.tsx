import React from "react";
import styled from "styled-components";
import { Article } from "components/Article";
import { Container } from "components/Container";
import { Headline } from "components/Headline";
import { AnimatedCookbook } from "components/AnimatedCookbook";
import { AnimatedSharing } from "components/AnimatedSharing";
import { AnimatedGroceries } from "components/AnimatedGroceries";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    flex-grow: 1;
    flex-basis: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    flex-direction: row;
    &.inverted {
      flex-direction: row-reverse;
    }
  }
`;

export const LandingPage: React.FC = () => (
  <>
    <Article colorMode="green">
      <StyledContainer className="inverted">
        <Headline>
          <h2>Cookbooks are meant to be simple.</h2>
          <p>
            Foodl is your virtual cookbook. It helps you organize your
            recipes in the most simple and intuitive way.
          </p>
        </Headline>
        <AnimatedCookbook />
      </StyledContainer>
    </Article>
    <Article>
      <StyledContainer>
        <Headline>
          <h2>Food is all about sharing.</h2>
          <p>
            Foodl brings you closer to friends and family. It enables you
            to share your entire cookbook to the ones you love.
          </p>
        </Headline>
        <AnimatedSharing />
      </StyledContainer>
    </Article>
    <Article colorMode="yellow">
      <StyledContainer className="inverted">
        <Headline>
          <h2>Groceries shouldn’t take all day.</h2>
          <p>
            Foodl saves time by building your grocery list. Spend less
            time planning and more time cooking.
          </p>
        </Headline>
        <AnimatedGroceries />
      </StyledContainer>
    </Article>
    <Article>
      <StyledContainer>
        <Headline>
          <h5>Register now!</h5>
          <p>
            or login with your favourite social media.
          </p>
        </Headline>
      </StyledContainer>
    </Article>
  </>
);
