import styled from "styled-components";
import { Theme } from "theme";

interface Props {
  theme: Theme;
}

export const Container = styled.div<Props>`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.large}px;
  margin: 0 auto;
  scroll-margin-top: ${({ theme }) => theme.sizes.headerHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.large-1}px) {
    max-width: ${({ theme }) => theme.breakpoints.medium}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium-1}px) {
    max-width: ${({ theme }) => theme.breakpoints.small}px;
  }
`;
