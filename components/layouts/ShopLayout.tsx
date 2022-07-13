import { FC } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<{}> {
  title: string
  pageDescription: string
  imageFullUrl?: string
  // We can use this defintion if we don't want to extend from PropsWithChildren
  // children?: JSX.Element | JSX.Element[];
}
const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta property='og:site_name' content='Teslo - Shop' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:type' content='page' />
        <meta property='og:url' content='http://localhost' />
        {imageFullUrl && <meta property='og:image' content={imageFullUrl} />}
      </Head>
      <nav>{/* TODO: Navbar */}</nav>

      {/*TODO: Sidebar*/}

      <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}>{children}</main>
      {/* Footer */}
      <footer>{/* TODO: my custom footer */}</footer>
    </>
  )
}

export default ShopLayout
