import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import { StoreProvider } from '../utils/store'
import { SnackbarProvider } from 'notistack'
import { createTheme } from '@mui/material/styles'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const updatedTheme = createTheme({
    ...theme,
    palette: { ...theme.palette, mode: 'dark' },
  })

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <ThemeProvider theme={updatedTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </SnackbarProvider>
  )
}

export default MyApp
