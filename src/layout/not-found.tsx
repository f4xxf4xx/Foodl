import React, { useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useHasBeenViewed } from "hooks/use-has-been-viewed";
import { useStaggerEffect } from "hooks/use-stagger-effect";
import { SpinningBox } from "components/spinning-box";
import { Container } from "layout/container";
import { Theme } from "theme";
import EmptyPlate from "assets/empty-plate.svg";

const StyledContainer = styled(Container as any)`
  display: flex;
  flex-direction: column;
  height: 66vh;
  align-items: center;
  justify-content: center;
`;

const StyledCode = styled(motion.span)`
  font-size: 10rem;
`;

const StyledDescription = styled(motion.p)<{theme: Theme}>`
  font-size: ${({theme}) => theme.fontSizes.large};
  margin: ${({theme}) => theme.space.large}px 0;
  text-transform: uppercase;
  text-align: center;
`;

export const NotFound: React.FC = () => {
  const getAnchor = rect => ({ x: rect.x, y: rect.y });
  const theme = useContext<Theme>(ThemeContext);
  const containerRef = useRef();
  const hasBeenViewed = useHasBeenViewed(containerRef);
  const codeStagger = useStaggerEffect<HTMLSpanElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const descriptionStagger = useStaggerEffect<HTMLParagraphElement>(hasBeenViewed, theme, containerRef, getAnchor);
  const imgStagger = useStaggerEffect<HTMLImageElement>(hasBeenViewed, theme, containerRef, getAnchor);

  return (
    <StyledContainer ref={containerRef}>
      <SpinningBox>
        <StyledCode {...codeStagger}>404</StyledCode>
        <StyledDescription {...descriptionStagger}>This plate looks empty</StyledDescription>
        <motion.img {...imgStagger} src={EmptyPlate} alt="Empty plate" />
      </SpinningBox>
    </StyledContainer>
  );
}
