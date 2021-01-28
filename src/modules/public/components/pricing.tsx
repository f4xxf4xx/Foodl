import React, { forwardRef } from "react";
import styled from "styled-components";
import { motion, MotionProps } from "framer-motion";
import { Theme } from "theme";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledBox = styled(motion.div)<{ theme: Theme, color: string }>`
  width: 100%;
  padding: ${({theme}) => theme.space.large}px;
  background-color: ${({theme}) => theme.colors.background};
  border: 1px solid ${({theme, color}) => theme.colors.xlight[color]};
  border-radius: ${({theme}) => theme.space.large}px;
  text-align: center;
`;

const StyledTitle = styled.p<{ theme: Theme }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledDescription = styled.p<{ theme: Theme, color: string }>`
  color: ${({theme, color}) => theme.colors.light[color]};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: bold;
  letter-spacing: 0;
  margin-top: ${({ theme }) => theme.space.small}px;
`;

const StyledSpill = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -${({theme}) => theme.space.large}px;
  z-index: -1;
`;

interface Props {
  title: string;
  description: string;
  color: string;
  motion: MotionProps;
  className?: string;
  backgroundSpill?: JSX.Element;
  children?: string | JSX.Element | JSX.Element[];
}

export const Pricing = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <StyledContainer className={props.className}>
    <StyledBox ref={ref} color={props.color} {...props.motion}>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledDescription color={props.color}>{props.description}</StyledDescription>
      {props.children}
    </StyledBox>
    {props.backgroundSpill && <StyledSpill>{props.backgroundSpill}</StyledSpill>}
  </StyledContainer>
));