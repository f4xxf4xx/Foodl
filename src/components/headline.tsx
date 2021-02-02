import styled from "styled-components";
import { Theme } from "theme";

export const Headline = styled.div<{ theme: Theme }>`
  padding: ${({ theme }) => theme.space.large}px;
  text-shadow: ${({ theme }) => theme.shadows.heading};

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    font-size: ${({ theme }) => theme.fontSizes.medium}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}px) {
    font-size: ${({ theme }) => theme.fontSizes.large}
  }
`;
