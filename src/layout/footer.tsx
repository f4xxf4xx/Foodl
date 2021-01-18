import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "layout/container";
import { Theme } from "theme";

const StyledFooter = styled.footer<{ theme: Theme }>`
  margin-top: ${({theme}) => theme.space.xlarge};
  color: ${({theme}) => theme.colors.background};
  background-color: ${({theme}) => theme.colors.text};
`;

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: ${({theme}) => theme.space.large};

  & > * + * {
    margin-left: ${({theme}) => theme.space.large};
  }
`;

const StyledTrademark = styled.span<{ theme: Theme }>`
  font-size: ${({theme}) => theme.fontSizes.medium};
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = props => (
  <StyledFooter className={props.className}>
    <StyledContainer>
      <StyledTrademark>© 2021 Foodl</StyledTrademark>
      <StyledLink to="/terms-of-use">Terms of use</StyledLink>
      <StyledLink to="/privacy">Privacy</StyledLink>
    </StyledContainer>
  </StyledFooter>
);