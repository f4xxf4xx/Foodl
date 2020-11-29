import styled from "styled-components";
import { Theme } from "theme";

export const Article = styled.article<{ colorMode?: string, theme: Theme }>`
  width: 100%;

  ${({colorMode, theme}) => colorMode ? `
    color: ${theme.colors.modes[colorMode].text};
    background: ${theme.colors.modes[colorMode].background};
  ` : `
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  `}
`;
