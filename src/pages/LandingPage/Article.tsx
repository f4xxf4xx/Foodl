import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { AccentBackground, BackgroundEffect } from "pages/LandingPage/AccentBackground";
import { Theme } from "theme";


const StyledArticle = styled.article`
  width: 100%;
  min-height: 84vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledContainer = styled.div<{theme: Theme}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  margin: 0 auto;

  & > * {
    flex-grow: 1;
    flex-basis: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 0 ${({ theme }) => theme.space.large};
    flex-direction: row;

    &.inverted {
      flex-direction: row-reverse;
    }
  }
`;

function calculateEffect(
  element: HTMLDivElement,
  fullscreen: boolean,
  inverted: boolean
): BackgroundEffect {
  if (fullscreen) return { left: 0, right: 0, opacity: 1 };
  if (!element) return { left: 0, right: 0, opacity: 0 };
  const rect = element.getBoundingClientRect();
  return {
    left: inverted ? rect.x : 0,
    right: inverted ? 0 : rect.x + rect.width,
    opacity: 1
  };
}

export interface Props {
  id: string;
  accent?: JSX.Element;
  children?: JSX.Element;
  inverted?: boolean;
}

interface HiddenProps {
  observer: IntersectionObserver;
  isCurrent: boolean;
}

export const Article: React.FC<Props & HiddenProps> = props => {
  const ref = useRef<HTMLDivElement>();
  const [effect, setEffect] = useState<BackgroundEffect>({
    left: 0, right: 0, opacity: 1
  });

  useEffect(() => {
    const element = ref.current;
    if (element) {
      props.observer.observe(element);
    }
    setEffect(calculateEffect(
      ref.current, !props.children, props.inverted
    ));
    return () => {
      if (element) {
        props.observer.unobserve(element);
      }
    }
  }, [setEffect, props.observer, props.children, props.inverted]);

  return (
    <StyledArticle>
      <StyledContainer className={props.inverted ? "inverted" : ""}>
        {props.accent && (
          <div ref={ref} data-id={props.id}>{props.accent}</div>
        )}
        {props.children && (
          <div>{props.children}</div>
        )}
      </StyledContainer>
      {props.isCurrent && <AccentBackground effect={effect} />}
    </StyledArticle>
  )
}
