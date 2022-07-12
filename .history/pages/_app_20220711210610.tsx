import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'

import 
import 'styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={undefined}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
