import React from "react";
import styled, { keyframes } from "styled-components";
import { Theme } from "theme";

const spinAnimation = colors => keyframes`
  0% {
    color: ${colors.blue};
    transform: translate(-50%, -50%) rotate(72deg) scale(1);
  }
  10% {
    color: ${colors.green};
    transform: translate(-50%, -50%) rotate(144deg) scale(.75);
  }
  20% {
    color: ${colors.yellow};
    transform: translate(-50%, -50%) rotate(216deg) scale(1);
  }
  30% {
    color: ${colors.orange};
    transform: translate(-50%, -50%) rotate(288deg) scale(.75);
  }
  40% {
    color: ${colors.red};
    transform: translate(-50%, -50%) rotate(360deg) scale(1);
  }
  50% {
    color: ${colors.blue};
    transform: translate(-50%, -50%) rotate(432deg) scale(.75);
  }
  60% {
    color: ${colors.green};
    transform: translate(-50%, -50%) rotate(504deg) scale(1);
  }
  70% {
    color: ${colors.yellow};
    transform: translate(-50%, -50%) rotate(576deg) scale(.75);
  }
  80% {
    color: ${colors.orange};
    transform: translate(-50%, -50%) rotate(648deg) scale(1);
  }
  90% {
    color: ${colors.red};
    transform: translate(-50%, -50%) rotate(720deg) scale(.75);
  }
  100% {
    color: ${colors.blue};
    transform: translate(-50%, -50%) rotate(792deg) scale(1);
  }
`;

const StyledContainer = styled.div<{ theme: Theme }>`
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.large}px;
`;

const StyledSvg = styled.svg<{ theme: Theme }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  color: ${({ theme }) => theme.colors.xlight.blue};
  transform: translate(-50%, -50%);
  z-index: -1;
  animation: 60s infinite ${({theme}) => spinAnimation(theme.colors.xlight)} linear;
`;

export const SpinningBox: React.FC = props => (
  <StyledContainer>
    {props.children}
    <StyledSvg viewBox="0 0 30 30">
      <rect width="30" height="30" rx="8" fill="currentColor" />
    </StyledSvg>
  </StyledContainer>
)