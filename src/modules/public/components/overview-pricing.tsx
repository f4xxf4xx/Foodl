import React from "react";
import styled from "styled-components";
import { Container } from "layout/container";
import { Pricing } from "modules/public/components/pricing";
import { OverviewPricingSpill1 } from "modules/public/components/overview-pricing-spill1";
import { OverviewPricingSpill2 } from "modules/public/components/overview-pricing-spill2";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)`
  display: grid;
  grid-gap: ${({theme}) => theme.space.large};
  padding: ${({theme}) => theme.space.large};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
      "heading heading"
      "free chef";
  justify-items: start;
  align-items: start;
`;

const StyledList = styled.ul<{ theme: Theme }>`
  margin: ${({theme}) => theme.space.large} 0;
  padding-inline-start: ${({theme}) => theme.space.large};
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const StyledHeading = styled.h2`
  grid-area: heading;
`;

interface Props {

}

export const OverviewPricing: React.FC<Props> = props => (
  <StyledContainer>
    <StyledHeading>Pricing</StyledHeading>
    <Pricing
      title="Free"
      description="Best for cooking enthusiasts wishing to save personal recipes"
      color="blue"
      backgroundSpill={<OverviewPricingSpill1 color="blue" />}
    >
      <StyledList>
        <li>Unlimited cookbooks and recipes.</li>
        <li>Unlimited generations of grocery lists.</li>
        <li>Recipe importation from any sources.</li>
      </StyledList>
    </Pricing>
    <Pricing
      title="Chef"
      description="Best for friends and family wishing to share cookbooks"
      color="orange"
      backgroundSpill={<OverviewPricingSpill2 color="orange" />}
    >
      <StyledList>
        <li>Everything included in Free.</li>
        <li>Unlimited access to shared recipes.</li>
        <li>Integration with any home assistant.</li>
      </StyledList>
    </Pricing>
  </StyledContainer>
);