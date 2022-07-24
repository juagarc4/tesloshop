import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from 'components/layouts'
import { ProductList } from 'components/products'
import { dbProducts } from 'database'
import { IProduct } from 'interfaces'

interface Props {
  products: IProduct[]
  query: string
}
const SearchPage: NextPage<Props> = ({ products, query }) => {
  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Find the best products of Teslo here'}>
      <Typography variant='h1'>Search products</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products found for your search: {query}
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }
  // No results found
  let products = await dbProducts.getProductsByTerm(query)
  // TODO: Return suggested products
  return {
    props: {
      products,
      query,
    },
  }
}

export default SearchPage
