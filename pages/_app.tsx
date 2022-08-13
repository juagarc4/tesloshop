import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { lightTheme } from 'themes'
import { AuthProvider, CartProvider, UIProvider } from 'context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
          currency: 'EUR',
        }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
