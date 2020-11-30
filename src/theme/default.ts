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
  },
  xlight: {
    blue: '#AFCEDA',
    green: '#B5EBE5',
    yellow: '#F8EDD2',
    orange: '#FCE4D0',
    red: '#F8D4CA',
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
    headerHeight: '48px',
    headerWidth: '768px',
    containerWidth: '1024px'
  },
  fonts: {
    body: `Comfortaa, Roboto, 'Open Sans'`,
    heading: `Montserrat, Roboto, 'Open Sans'`
  },
  fontSizes: {
    body: '1em',
    h6: '1.25em',
    h5: '1.5em',
    h4: '1.75em',
    h3: '2em',
    h2: '2.25em',
    h1: '3em',
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
      accent: {
        text: colorPalette.dark.blue,
        background: `radial-gradient(circle at top left, ${colorPalette.xlight.green}, transparent 66%),
                     radial-gradient(circle at bottom right, ${colorPalette.xlight.blue}, transparent 66%),
                     radial-gradient(circle at top right, ${colorPalette.xlight.red}, transparent 66%),
                     radial-gradient(circle at bottom left, ${colorPalette.xlight.orange}, transparent 66%),
                     ${colorPalette.light.yellow}`,
        primary: colorPalette.green,
        secondary: colorPalette.light.orange,
      }
    }
  },
  shadows: {
    panel: "rgba(50,50,93,0.25) 0 4px 4px, rgba(0,0,0,0.3) 0 4px 16px",
    heading: "0 4px 4px rgba(50,50,93,0.25), 0 4px 16px rgba(0, 0, 0, 0.3)"
  },
  breakpoints: {
    medium: '768px',
    large: '1024px'
  }
};

export type Theme = typeof theme;
