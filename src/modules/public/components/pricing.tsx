import React from "react";
import styled from "styled-components";
import { Theme } from "theme";

const StyledContainer = styled.div<{ theme: Theme, color: string }>`
  position: relative;
  width: 100%;
  padding: ${({theme}) => theme.space.large};
  background-color: ${({theme, color}) => theme.colors.background};
  border: 1px solid ${({theme, color}) => theme.colors.xlight[color]};
  border-radius: ${({theme}) => theme.space.large};
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
  margin-top: ${({ theme }) => theme.space.small};
`;

const StyledSpill = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -${({theme}) => theme.space.large};
  z-index: -1;
`;

interface Props {
  title: string;
  description: string;
  color: string;
  className?: string;
  backgroundSpill?: JSX.Element;
}

export const Pricing: React.FC<Props> = props => (
  <StyledContainer className={props.className} color={props.color}>
    <StyledTitle>{props.title}</StyledTitle>
    <StyledDescription color={props.color}>{props.description}</StyledDescription>
    {props.children}
    {props.backgroundSpill && <StyledSpill>{props.backgroundSpill}</StyledSpill>}
  </StyledContainer>
);