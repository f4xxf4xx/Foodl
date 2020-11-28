import React from "react";
import styled from "styled-components";
import { Theme } from "theme";
import { Container } from "components/Container";
import { Logo } from "components/Logo";

import "./Styles/MainLayout.css";

const StyledContainer = styled(Container as any)<{ theme: Theme }>`
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  display: flex;
  flex-direction: row;
  align-items: center;

  & > .spacer {
    flex-grow: 1;
  }
`;

export const Header: React.FC<{ className?: string, children?: any }> = props => (
  <header className={props.className}>
    <StyledContainer>
      <Logo />
      <div className="spacer"></div>
      { props.children }
    </StyledContainer>
  </header>
);
