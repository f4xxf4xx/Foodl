import React from "react";
import styled from "styled-components";
import { Theme } from "theme";

const StyledH3 = styled.h3<{ theme: Theme }>`
  position: relative;

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: -${({theme}) => theme.space.xsmall};
    top: calc(1em - ${({theme}) => theme.space.small} / 2);
    width: 33%;
    height: ${({theme}) => theme.space.small};
    border-radius: ${({theme}) => theme.space.small};
    background-color: ${({theme}) => theme.colors.xlight.orange};
    z-index: -1;
  }
`;

interface Props {
  title: string;
  className?: string;
}

export const Feature: React.FC<Props> = props => {
  return (
    <div className={props.className}>
      <StyledH3>{props.title}</StyledH3>
      {props.children}
    </div>
  );
}
