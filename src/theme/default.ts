// Colors
const colorPalette = {
  blue: '#356274',
  green: '#32BBAB',
  yellow: '#EBCB7A',
  orange: '#F5AF75',
  red: '#EA8065',
  gray: '#F0F0F0',
  white: '#FFFFFF',
  dark: {
    blue: '#264653',
    green: '#2A9D8F',
    yellow: '#E9C46A',
    orange: '#F4A261',
    red: '#E76F51',
    gray: '#CECECE',
    white: '#FFFFFF'
  },
  light: {
    blue: '#5698B2',
    green: '#62D5C8',
    yellow: '#F1DA9F',
    orange: '#F8C59C',
    red: '#F0A491',
    gray: '#FAFAFA',
    white: '#FFFFFF'
  }
};

export const theme = {
  space: {
    none: '0',
    xsmall: '4px',
    small: '8px',
    medium: '16px',
    large: '32px',
    xlarge: '64px'
  },
  fonts: {
    body: `Comfortaa, Roboto, 'Open Sans'`,
    heading: `Comfortaa, Roboto, 'Open Sans'`
  },
  fontSizes: {
    body: '1em',
    h6: '1.25em',
    h5: '1.5em',
    h4: '1.75em',
    h3: '2em',
    h2: '2.25em',
    h1: '2.5em'
  },
  colors: {
    ...colorPalette,
    text: colorPalette.dark.blue,
    background: colorPalette.white,
    primary: colorPalette.green,
    secondary: colorPalette.orange,
    highlight: colorPalette.light.yellow,
    muted: colorPalette.dark.gray,
    modes: {
      inverted: {
        text: colorPalette.white,
        background: colorPalette.green,
        primary: colorPalette.white,
        secondary: colorPalette.light.orange,
      }
    }
  }
};

export type Theme = typeof theme;
