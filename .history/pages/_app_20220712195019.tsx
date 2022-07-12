import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'

import { lightTheme } from 'themes'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CSS
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
