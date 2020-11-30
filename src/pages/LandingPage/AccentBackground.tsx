import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Theme } from "theme";

const StyledAccentBackground = styled(motion.div)<{ theme: Theme }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ theme }) => theme.colors.modes.accent.background};
`;

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

export interface BackgroundEffect {
  left: number;
  right: number;
  opacity: number;
}

export const AccentBackground: React.FC<{ effect: BackgroundEffect }> = props => {
  return (
    <StyledAccentBackground
      layoutId="accent"
      animate={{
        left: props.effect.left,
        right: props.effect.right,
        opacity: props.effect.opacity
      }}
      transition={spring}
    />
  );
}
