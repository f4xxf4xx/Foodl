import React, { useRef, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { Container } from "layout/container";
import { Price } from "components/price";
import { Button } from "components/button";
import { useHasBeenViewed } from "hooks/use-has-been-viewed";
import { useStaggerEffect } from "hooks/use-stagger-effect";
import { Pricing } from "modules/public/components/pricing";
import { OverviewPricingSpill1 } from "modules/public/components/overview-pricing-spill1";
import { OverviewPricingSpill2 } from "modules/public/components/overview-pricing-spill2";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)`
  display: grid;
  grid-gap: ${({theme}) => theme.space.large}px;
  padding: ${({theme}) => theme.space.large}px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
      "heading heading"
      "free chef";
  justify-items: start;
  align-items: start;

  @media (max-width: ${({theme}) => theme.breakpoints.large-1}px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "heading heading heading"
        ". free free"
        "chef chef .";
  }

  @media (max-width: ${({theme}) => theme.breakpoints.medium-1}px) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "heading"
        "free"
        "chef";
  }
`;

const StyledList = styled.ul<{ theme: Theme }>`
  margin: ${({theme}) => theme.space.large}px 0;
  padding-inline-start: ${({theme}) => theme.space.large}px;
  font-size: ${({theme}) => theme.fontSizes.medium};
  text-align: start;
`;

const StyledActions = styled.div<{ theme: Theme }>`
  margin-top: ${({theme}) => theme.space.large}px;
`;

const StyledHeading = styled(motion.h2)`
  grid-area: heading;
`;

const StyledFreePricing = styled(Pricing)`
  grid-area: free;
`;

const StyledChefPricing = styled(Pricing)`
  grid-area: chef;
`;

interface Props {

}

export const OverviewPricing: React.FC<Props> = props => {
  const getAnchor = rect => ({ x: rect.x, y: rect.y });
  const theme = useContext<Theme>(ThemeContext);
  const containerRef = useRef();
  const hasBeenViewed = useHasBeenViewed(containerRef);
  const headingStagger = useStaggerEffect<HTMLHeadingElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const { ref: freeRef, ...freeStagger } = useStaggerEffect<HTMLParagraphElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const { ref: chefRef, ...chefStagger } = useStaggerEffect<HTMLDivElement>(hasBeenViewed, theme, containerRef, getAnchor);

  return (
    <StyledContainer ref={containerRef}>
      <StyledHeading {...headingStagger}>Pricing</StyledHeading>
      <StyledFreePricing
        ref={freeRef}
        title="Free"
        description="Best for cooking enthusiasts wishing to save personal recipes"
        color="blue"
        motion={freeStagger}
        backgroundSpill={<OverviewPricingSpill1 color="blue" />}
      >
        <StyledList>
          <li>Unlimited cookbooks and recipes.</li>
          <li>Unlimited generations of grocery lists.</li>
          <li>Recipe importation from any sources.</li>
        </StyledList>
        <Price dollars={0} term="month" />
        <StyledActions>
          <Button type="link" mode="primary" to="/register">Join for free</Button>
        </StyledActions>
      </StyledFreePricing>
      <StyledChefPricing
        ref={chefRef}
        title="Chef"
        description="Best for friends and family wishing to share cookbooks"
        color="orange"
        motion={chefStagger}
        backgroundSpill={<OverviewPricingSpill2 color="orange" />}
      >
        <StyledList>
          <li>Everything included in Free.</li>
          <li>Unlimited access to shared recipes.</li>
          <li>Integration with any home assistant.</li>
        </StyledList>
        <Price dollars={1} cents={99} term="month" />
        <StyledActions>
          <Button type="link" mode="accent" to="/register">Continue with Chef</Button>
        </StyledActions>
      </StyledChefPricing>
    </StyledContainer>
  );
}