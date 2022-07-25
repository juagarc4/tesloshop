import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'

import { lightTheme } from 'themes'
import { CartProvider, UIProvider } from 'context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>
    </SWRConfig>
  )
}

export default MyApp
