import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import { StoreProvider } from '../utils/store'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp
