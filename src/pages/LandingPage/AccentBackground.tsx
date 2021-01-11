import React from "react";
import styled from "styled-components";
import image from "assets/ingredients.png";
import { motion } from "framer-motion";
import { Theme } from "theme";

export const FULL_EFFECT: BackgroundEffect = {
  topLeft: [0, 0],
  topRight: [1, 0],
  bottomRight: [1, 1],
  bottomLeft: [0, 1],
  opacity: 1
}

export const NO_EFFECT: BackgroundEffect = {
  ...FULL_EFFECT,
  opacity: 0
}

function createClipPath(effect: BackgroundEffect): string {
  return `polygon(${effect.topLeft[0]*100}% ${effect.topLeft[1]*100}%,
                  ${effect.topRight[0]*100}% ${effect.topRight[1]*100}%,
                  ${effect.bottomRight[0]*100}% ${effect.bottomRight[1]*100}%,
                  ${effect.bottomLeft[0]*100}% ${effect.bottomLeft[1]*100}%)`;
}

const StyledAccentBackground = styled(motion.div)<{ theme: Theme }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: url(${image}), ${({ theme }) => theme.colors.modes.accent.background};
  clip-path: ${createClipPath(NO_EFFECT)};
`;

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

export interface BackgroundEffect {
  topLeft: [number, number],
  topRight: [number, number],
  bottomRight: [number, number],
  bottomLeft: [number, number],
  opacity: number;
}

export const AccentBackground: React.FC<{ effect: BackgroundEffect }> = props => {
  return (
    <StyledAccentBackground
      layoutId="accent"
      animate={{
        clipPath: createClipPath(props.effect),
        opacity: props.effect.opacity
      }}
      transition={spring}
    />
  );
}
