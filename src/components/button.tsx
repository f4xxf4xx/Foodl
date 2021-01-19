import React, { ComponentType, FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "theme";

const sharedStyles = css<{ theme: Theme }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  min-height: ${({theme}) => theme.sizes.controlHeight};
  padding: ${({theme}) => `${theme.space.small} ${theme.space.medium}`};
  border: 1px solid transparent;
  border-radius: ${({theme}) => theme.space.xsmall};
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

function withProps<P>(Comp: ComponentType<P>, extraProps: any): FunctionComponent<P> {
  return props => (<Comp {...props} {...extraProps} />);
}

interface Props {
  type: 'link' | 'button' | 'submit';
  mode: 'normal' | 'primary' | 'accent';
  className?: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface InternalProps {
  className?: string;
}

export const Button: FunctionComponent<Props> = props => {
  const { type, mode, className, to, onClick, ...rest } = props;

  let Button: ComponentType<InternalProps>;
  if (props.type === 'link') {
    Button = withProps<InternalProps>(StyledLink, { to });
  } else {
    Button = withProps<InternalProps>(StyledButton, { type, onClick })
  }

  return (
    <Button className={`${className} btn-${mode}`} {...rest}>
      {props.children}
    </Button>
  )
};
