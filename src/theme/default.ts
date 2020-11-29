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
    large: '24px',
    xlarge: '32px'
  },
  sizes: {
    headerHeight: '80px',
    containerWidth: '1024px'
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
    h1: '2.5em',
    regular: '12px',
    medium: '16px',
    large: '22px',
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
      green: {
        text: colorPalette.white,
        background: `radial-gradient(circle at top left, ${colorPalette.dark.yellow}, transparent 66%),
                     radial-gradient(circle at bottom right, ${colorPalette.blue}, transparent 66%),
                     radial-gradient(circle at top right, ${colorPalette.light.blue}, transparent 33%),
                     radial-gradient(circle at bottom left, ${colorPalette.light.yellow}, transparent 33%),
                     ${colorPalette.dark.green}`,
        primary: colorPalette.white,
        secondary: colorPalette.light.orange,
      },
      yellow: {
        text: colorPalette.white,
        background: `radial-gradient(circle at top left, ${colorPalette.dark.green}, transparent 66%),
                     radial-gradient(circle at bottom right, ${colorPalette.dark.orange}, transparent 66%),
                     radial-gradient(circle at top right, ${colorPalette.light.orange}, transparent 33%),
                     radial-gradient(circle at bottom left, ${colorPalette.light.green}, transparent 33%),
                     ${colorPalette.dark.yellow}`,
        primary: colorPalette.white,
        secondary: colorPalette.light.orange,
      }
    }
  },
  breakpoints: {
    medium: '768px',
    large: '1024px'
  }
};

export type Theme = typeof theme;
