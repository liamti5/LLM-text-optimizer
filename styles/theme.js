'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#BE5046',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#252931',
      paper: '#282C34',
    },
    text: {
      primary: '#ABB2BF',
      secondary: '#BE5046',
    },
  },
});

export default theme;
