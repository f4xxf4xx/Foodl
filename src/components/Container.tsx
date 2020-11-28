import styled from "styled-components";
import { Theme } from "theme";

export const Container = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 0 ${({ theme }) => theme.space.large};
  }
`;
