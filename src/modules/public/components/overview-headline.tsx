import React, { useRef, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { Button } from "components/button";
import { Container } from "layout/container";
import { useHasBeenViewed } from "hooks/use-has-been-viewed";
import { useStaggerEffect } from "hooks/use-stagger-effect";
import { ScrollDownIndicator } from "modules/public/components/scroll-down-indicator";
import { OverviewHeadlineGraphics } from "modules/public/components/overview-headline-graphics";
import { OverviewHeadlineSpill } from "modules/public/components/overview-headline-spill";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{theme: Theme}>`
  display: grid;
  grid-gap: ${({theme}) => theme.space.large}px;
  padding: ${({theme}) => theme.space.large}px;
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

const StyledHeadline = styled(motion.h1)`
  grid-area: headline;
`;

const StyledDescription = styled(motion.p)<{ theme: Theme }>`
  grid-area: description;
  font-size: ${({theme}) => theme.fontSizes.medium};
`;

const StyledButtonContainer = styled(motion.div)`
  grid-area: get-started;
`;

const StyledScrollDown = styled(motion.p)<{ theme: Theme }>`
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
  top: -${({theme}) => theme.space.large}px;
  right: -${({theme}) => theme.space.large}px;
  bottom: -${({theme}) => theme.space.large}px;
  z-index: -1;
  height: calc(100% + ${({theme}) => theme.space.large * 2}px);
  width: auto;
`;

interface Props {
  onScrollToNext: () => void;
}

export const OverviewHeadline: React.FC<Props> = props => {
  const getAnchor = rect => ({ x: rect.x, y: rect.y });
  const theme = useContext<Theme>(ThemeContext);
  const containerRef = useRef();
  const hasBeenViewed = useHasBeenViewed(containerRef);
  const headlineStagger = useStaggerEffect<HTMLHeadingElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const descriptionStagger = useStaggerEffect<HTMLParagraphElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const getStartedStagger = useStaggerEffect<HTMLDivElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const scrollDownStagger = useStaggerEffect<HTMLParagraphElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const scrollIndicatorStagger = useStaggerEffect<HTMLAnchorElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const graphicsStagger = useStaggerEffect<SVGSVGElement>(hasBeenViewed, theme, containerRef, getAnchor);

  return (
    <StyledContainer ref={containerRef}>
      <StyledHeadline {...headlineStagger}>
        Your Personal Cookbook <StyledAccent>Digitalized.</StyledAccent>
      </StyledHeadline>
      <StyledDescription {...descriptionStagger}>
        Foodl saves your personal recipes, helps you with groceries and
        facilitates sharing with friends and family.
      </StyledDescription>
      <StyledButtonContainer {...getStartedStagger}>
        <Button type="link" mode="accent" to="/register">
          Get started
        </Button>
      </StyledButtonContainer>
      <StyledScrollDown {...scrollDownStagger}>
        or scroll down to learn more
      </StyledScrollDown>
      <ScrollDownIndicator onClick={props.onScrollToNext} {...scrollIndicatorStagger} />
      <StyledGraphics>
        <StyledOverviewHeadlineGraphics {...graphicsStagger} />
        <StyledOverviewHeadlineSpill />
      </StyledGraphics>
    </StyledContainer>
  );
}
