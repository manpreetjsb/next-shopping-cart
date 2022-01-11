import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import { StoreProvider } from '../utils/store'
import { SnackbarProvider } from 'notistack'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </SnackbarProvider>
  )
}

export default MyApp
