import { createGlobalStyle } from 'styled-components';
import { Theme } from 'theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.body};
    letter-spacing: 0.1em;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h1};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.h4};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.h6};
  }
`;
