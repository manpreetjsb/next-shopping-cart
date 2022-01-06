import { createTheme } from '@mui/material/styles'
import { useContext } from 'react'
import { Store } from '../utils/store'
import { Colors } from './colors'
import {
  FontFamily,
  htmlFontSize,
  h1,
  h3,
  h2,
  h4,
  h5,
  h6,
  body1,
  body2,
  small,
  bold,
} from './fonts'

export const theme = createTheme({
  palette: {
    primary: {
      light: Colors.primaryLight,
      main: Colors.primary,
      dark: Colors.primaryDark,
      contrastText: Colors.white,
    },
    secondary: {
      light: Colors.secondaryLight,
      main: Colors.secondary,
      dark: Colors.secondaryDark,
      contrastText: Colors.white,
    },
    background: {
      default: Colors.white,
    },
  },
  typography: {
    htmlFontSize: htmlFontSize,
    fontFamily: FontFamily,
    h1: {
      fontSize: h1,
    },
    h2: {
      fontSize: h2,
    },
    h3: {
      fontSize: h3,
    },
    h4: {
      fontSize: h4,
    },
    h5: {
      fontSize: h5,
    },
    h6: {
      fontSize: h6,
    },
    body1: {
      fontSize: body1,
    },
    body2: {
      fontSize: body2,
    },
    subtitle2: {
      fontSize: small,
    },
    button: {
      fontWeight: bold,
      textTransform: 'none',
    },
  },
})
