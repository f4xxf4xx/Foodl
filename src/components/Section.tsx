import styled from "styled-components";
import { Theme } from "theme";

export const Section = styled.section<{ colorMode?: string, theme: Theme }>`
  width: 100%;

  ${({colorMode, theme}) => colorMode ? `
    color: ${theme.colors.modes[colorMode].text};
    background: ${theme.colors.modes[colorMode].background};
  ` : `
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  `}
`;
