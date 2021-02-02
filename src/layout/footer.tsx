import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "layout/container";
import { GithubLink } from "layout/github-link";
import { Theme } from "theme";

const StyledFooter = styled.footer<{ theme: Theme }>`
  margin-top: ${({theme}) => theme.space.xlarge}px;
  color: ${({theme}) => theme.colors.background};
  background-color: ${({theme}) => theme.colors.text};
`;

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: ${({theme}) => theme.space.large}px;

  & > * + * {
    margin-left: ${({theme}) => theme.space.large}px;
  }

  @media (max-width: ${({theme}) => theme.breakpoints.medium}px) {
    max-width: initial;
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

const Spacer = styled.span`
  flex: 1 0 0;
`;

const StyledGithubLink = styled(GithubLink)`
  color: inherit;
  font-size: ${({theme}) => theme.fontSizes.medium};
  align-self: center;
`;

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = props => (
  <StyledFooter className={props.className}>
    <StyledContainer>
      <StyledTrademark>© 2021 Foodl</StyledTrademark>
      <StyledLink to="/terms">Terms</StyledLink>
      <StyledLink to="/privacy">Privacy</StyledLink>
      <Spacer />
      <StyledGithubLink href="https://github.com/f4xxf4xx/foodl">
        Github
      </StyledGithubLink>
    </StyledContainer>
  </StyledFooter>
);
