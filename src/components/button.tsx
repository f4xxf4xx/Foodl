import React, { ComponentType, FunctionComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "theme";

const StyledLink = styled(Link)<{ theme: Theme }>`
  display: inline-block;
  padding: ${({theme}) => theme.space.medium};
  border: 1px solid transparent;
  border-radius: ${({theme}) => theme.space.xsmall};

  color: ${({theme}) => theme.colors.text};
  text-decoration: none;
  text-transform: uppercase;

  &.btn-primary {
    border-color: ${({theme}) => theme.colors.text};
  }

  &.btn-accent {
    color: ${({theme}) => theme.colors.modes.accent.text};
    background-color: ${({theme}) => theme.colors.modes.accent.background};
  }
`;

function withProps<P>(Comp: ComponentType<P>, extraProps: any): FunctionComponent<P> {
  return props => (<Comp {...props} {...extraProps} />);
}

interface Props {
  type: 'link';
  mode: 'normal' | 'primary' | 'accent';
  className?: string;
  to?: string;
}

interface InternalProps {
  className?: string;
}

export const Button: FunctionComponent<Props> = props => {
  const { to, mode, className, ...rest } = props;

  let Button: ComponentType<InternalProps>;
  if (props.to) {
    Button = withProps<InternalProps>(StyledLink, { to });
  } else {
    
  }

  return (
    <Button className={`${className} btn-${mode}`} {...rest}>
      {props.children}
    </Button>
  )
};
