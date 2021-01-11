import React, { useEffect, useRef } from "react";
import styled, { withTheme } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { Headline } from "components/headline";
import { Container } from "layout/container"
import { useIntersecting } from "hooks/use-intersecting";
import { useAnimationSequence } from "hooks/use-animation-sequence";
import { ScrollDownIndicator } from "modules/public/components/scroll-down-indicator";
import { MainHeadlineMockup } from "pages/LandingPage/MainHeadlineMockup";
import { Theme } from "theme";

const StyledContainer = styled(Container as any)<{theme: Theme}>`
  min-height: 84vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledAccent = styled.b<{theme: Theme}>`
  color: ${({ theme }) => theme.colors.modes.accent.primary};
  text-shadow: 1px 0   0 ${({ theme }) => theme.colors.background},
              -1px 0   0 ${({ theme }) => theme.colors.background},
               0   1px 0 ${({ theme }) => theme.colors.background},
               0  -1px 0 ${({ theme }) => theme.colors.background};
`;

const StyledHeadline = styled(Headline as any)`
  flex-grow: 2;
  flex-basis: 0;
  flex-shrink: 0;
  z-index: 2;
`;

const StyledHeader = styled(motion.h1)<{theme: Theme}>`
  margin: calc(${({ theme }) => theme.space.xlarge} * 2) 0;
}`;

const StyledParagraph = styled(motion.p)<{theme: Theme}>`
  text-align: center;
  margin: calc(${({ theme }) => theme.space.xlarge} * 2) 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    text-align: start;
  }
`;

const StyledMockupContainer = styled.div<{theme: Theme}>`
  flex-grow: 0;
  flex-basis: 0;
  flex-shrink: 0;
  overflow: visible;
  z-index: 1;
  padding: ${({ theme }) => theme.space.large};

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex-grow: 1;
  }
`;

const StyledMainHeadlineMockup = styled(MainHeadlineMockup as any)<{theme: Theme, delay: number}>`
  max-height: 84vh;
  margin-left: -50%;
`;


interface Props {
  theme: Theme;
  onScrollToNext(): void;
}

const MainHeadline: React.FC<Props> = props => {
  const ref = useRef<HTMLDivElement>();
  const variants = props.theme.animations.appearing;
  const intersecting = useIntersecting(ref, 0.5);
  const headerAnimation = useAnimation();
  const paragraphAnimation = useAnimation();
  const scrollAnimation = useAnimation();
  const mockupAnimation = useAnimation();

  useAnimationSequence(intersecting ? [
    async _ => await headerAnimation.start("visible"),
    async _ => await paragraphAnimation.start("visible"),
    async _ => await scrollAnimation.start("visible"),
    async _ => await mockupAnimation.start("visible")
  ] : [
    async _ => await mockupAnimation.start("hidden"),
    async _ => await scrollAnimation.start("hidden"),
    async _ => await paragraphAnimation.start("hidden"),
    async _ => await headerAnimation.start("hidden")
  ], [intersecting, variants]);

  return (
    <StyledContainer ref={ref}>
      <StyledHeadline>
        <StyledHeader initial="hidden" variants={variants} animate={headerAnimation}>
          Your personal cookbook.<br/>
          <StyledAccent>Digitalized.</StyledAccent>
        </StyledHeader>
        <StyledParagraph initial="hidden" variants={variants} animate={paragraphAnimation}>
          Scroll down to learn more
        </StyledParagraph>
        <StyledParagraph initial="hidden" variants={variants} animate={scrollAnimation}>
          <ScrollDownIndicator onClick={props.onScrollToNext} />
        </StyledParagraph>
      </StyledHeadline>
      <StyledMockupContainer>
        <StyledMainHeadlineMockup intersecting={intersecting} animationControls={mockupAnimation} />
      </StyledMockupContainer>
    </StyledContainer>
  );
}

const ThemedMainHeadline = withTheme(MainHeadline);
export { ThemedMainHeadline as MainHeadline }
