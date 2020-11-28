import React from "react";
import styled from "styled-components";
import { Section } from "components/Section";
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
    <Section colorMode="inverted">
      <StyledContainer className="inverted">
        <Headline>
          <h5>Cookbooks are meant to be simple.</h5>
          <p>
            Foodl is your virtual cookbook. It helps you organize your
            recipes in the most simple and intuitive way.
          </p>
        </Headline>
        <AnimatedCookbook />
      </StyledContainer>
    </Section>
    <Section>
      <StyledContainer>
        <Headline>
          <h5>Food is all about sharing.</h5>
          <p>
            Foodl brings you closer to friends and family. It enables you
            to share your entire cookbook to the ones you love.
          </p>
        </Headline>
        <AnimatedSharing />
      </StyledContainer>
    </Section>
    <Section colorMode="inverted">
      <StyledContainer className="inverted">
        <Headline>
          <h5>Groceries shouldn’t take all day.</h5>
          <p>
            Foodl saves time by building your grocery list. Spend less
            time planning and more time cooking.
          </p>
        </Headline>
        <AnimatedGroceries />
      </StyledContainer>
    </Section>
    <Section>
      <StyledContainer>
        <Headline>
          <h5>Register now!</h5>
          <p>
            or login with your favourite social media.
          </p>
        </Headline>
      </StyledContainer>
    </Section>
  </>
);
