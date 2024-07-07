import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fontSizes: {
    fontSizeS: '0.8rem',
    fontSizeM: '1.6rem',
    fontLineM: '2.4rem',
    fontM: '1.6rem / 2.4rem',
    fontSizeL: '2.4rem',
    fontLineL: '3.2rem',
    fontL: '2.4rem / 3.2rem',
    fontSizeXl: '3.2rem',
    fontLineXl: '4rem',
    fontXl: '3.2rem / 4rem',
  },
  colors: {
    primary: '#352452',
    primarySelected: '#c2b7d4',
    primaryLight: '#9082ce',
    secondary: '#7da2d3',
    secondarySelected: '#cbd8e9',
    success: '#38A169',

    // BACKGROUND COLORS
    backgroundMain: '#dddcdc',
    backgroundContent: '#f7f6f5',

    // TEXT COLORS
    textPrimary: '#252422',
    textPrimaryLight: '#f7f6f5',
  },
  breakpoints: {
    sm: '414px',
    md: '584px',
    lg: '1280px',
  },
});

export default theme;
