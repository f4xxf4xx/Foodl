import React, { useMemo, ComponentType } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "theme";

const sharedStyles = css<{ theme: Theme }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  min-height: ${({theme}) => theme.sizes.controlHeight}px;
  padding: ${({theme}) => `${theme.space.small}px ${theme.space.medium}px`};
  border: 1px solid transparent;
  border-radius: ${({theme}) => theme.space.xsmall}px;
  box-sizing: border-box;
  vertical-align: middle;

  color: ${({theme}) => theme.colors.text};
  background: transparent;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;

  &.btn-primary {
    border-color: ${({theme}) => theme.colors.text};
  }

  &.btn-accent {
    color: ${({theme}) => theme.colors.modes.accent.text};
    background-color: ${({theme}) => theme.colors.modes.accent.background};
  }
`;

const StyledLink = styled(Link)<{ theme: Theme }>`
  ${sharedStyles}
`;

const StyledButton = styled.button<{ theme: Theme }>`
  ${sharedStyles}
`;

interface Props {
  type: 'link' | 'button' | 'submit';
  mode: 'normal' | 'primary' | 'accent';
  children?: JSX.Element | string;
  className?: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function useButtonType(props: Props): [ComponentType<any>, Partial<Props>] {
  const { type, to, onClick } = props;
  return useMemo(() => {
    if (type === "link") {
      return [ StyledLink, { to } ];
    } else {
      return [ StyledButton, { type, onClick } ];
    }
  }, [type, to, onClick]);
}

export const Button = React.forwardRef<HTMLElement, Props>((props, ref) => {
  const { mode, className } = props;
  const [Button, extraProps] = useButtonType(props);
  return (
    <Button ref={ref} className={`${className} btn-${mode}`} {...extraProps}>
      {props.children}
    </Button>
  )
});
