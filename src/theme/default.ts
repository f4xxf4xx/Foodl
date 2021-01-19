// Colors
const colorPalette = {
  blue: '#494C6F',
  green: '#3EB246',
  yellow: '#DEB449',
  orange: '#E67D40',
  red: '#DC1839',
  gray: '#EDF2F4',
  dark: {
    blue: '#2B2D42',
    green: '#1F4F22',
    yellow: '#705718',
    orange: '#743714',
    red: '#620F1D',
    gray: '#D6DBDD'
  },
  light: {
    blue: '#8F92B6',
    green: '#7BCC81',
    yellow: '#E1C172',
    orange: '#E6996D',
    red: '#E66177',
    gray: '#F9F9FA'
  },
  xlight: {
    blue: '#D5D6E3',
    green: '#CDEBCF',
    yellow: '#F3E7C9',
    orange: '#F5D8C7',
    red: '#F6C3CB',
    gray: '#FDFDFE'
  }
};

export const theme = {
  space: {
    none: '0',
    xsmall: '4px',
    small: '8px',
    medium: '12px',
    large: '24px',
    xlarge: '48px'
  },
  sizes: {
    headerHeight: '80px',
    controlHeight: '48px',
    drawerWidth: '256px'
  },
  fonts: {
    body: `Comfortaa, Roboto, 'Open Sans'`,
    heading: `Montserrat, Roboto, 'Open Sans'`
  },
  fontSizes: {
    body: '12px',
    h6: '1.3333rem',
    h5: '1.3333rem',
    h4: '1.6667rem',
    h3: '2rem',
    h2: '2.6667rem',
    h1: '4rem',
    regular: '1rem',
    medium: '1.3333rem',
    large: '1.6667rem',
    xlarge: '4rem',
  },
  colors: {
    ...colorPalette,
    text: colorPalette.dark.blue,
    background: colorPalette.xlight.gray,
    primary: colorPalette.orange,
    secondary: colorPalette.green,
    highlight: colorPalette.light.yellow,
    muted: colorPalette.dark.gray,
    modes: {
      accent: {
        text: colorPalette.xlight.gray,
        background: colorPalette.orange,
        primary: colorPalette.orange,
        secondary: colorPalette.light.orange,
      }
    }
  },
  shadows: {
    panel: "rgba(50,50,93,0.25) 0 4px 4px, rgba(0,0,0,0.3) 0 4px 16px",
    heading: "none"
  },
  animations: {
    appearing: {
      hidden: {
        opacity: 0,
        translateY: 64,
        scale: .90,
        transition: {
          duration: .2
        }
      },
      visible: {
        opacity: 1,
        translateY: 0,
        scale: 1,
        transition: {
          duration: .2
        }
      }
    }
  },
  breakpoints: {
    small: 512,
    medium: 768,
    large: 1024
  }
};

export type Theme = typeof theme;
