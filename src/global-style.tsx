import { createGlobalStyle } from 'styled-components';
import { Theme } from 'theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.body};
    letter-spacing: 0.1em;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    letter-spacing: 0;
    text-shadow: ${({ theme }) => theme.shadows.heading};
    margin: 0;
  }
  h1 { font-size: ${({ theme }) => theme.fontSizes.h1}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes.h2}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes.h3}; }
  h4 { font-size: ${({ theme }) => theme.fontSizes.h4}; }
  h5 { font-size: ${({ theme }) => theme.fontSizes.h5}; }
  h6 { font-size: ${({ theme }) => theme.fontSizes.h6}; }

  p { margin: 0; }

  div {
    box-sizing: border-box;
  }
`;
