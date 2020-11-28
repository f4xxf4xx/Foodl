import styled from "styled-components";
import { Theme } from "theme";

export const Headline = styled.div<{ theme: Theme }>`
  padding: ${({ theme }) => theme.space.large};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: ${({ theme }) => theme.fontSizes.medium}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    font-size: ${({ theme }) => theme.fontSizes.large}
  }
`;
