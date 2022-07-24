import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Box, Divider, Typography } from '@mui/material'

import { ShopLayout } from 'components/layouts'
import { ProductList } from 'components/products'
import { dbProducts } from 'database'
import { IProduct } from 'interfaces'

interface Props {
  products: IProduct[]
  query: string
  foundProducts: boolean
}
const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Find the best products of Teslo here'}>
      <Typography variant='h1'>Search products</Typography>
      <Box display='flex' sx={{ mt: 2, mb: 2 }}>
        <Typography variant='h2'>{!foundProducts ? 'No' : products.length} products found for your search:</Typography>
        <Typography variant='h2' sx={{ ml: 1 }} color='secondary'>
          {query}
        </Typography>
      </Box>
      {!foundProducts && (
        <>
          <Divider sx={{ mt: 3, mb: 5 }} />
          <Typography sx={{ mb: 2 }} variant='h2'>
            Recommended products
          </Typography>
        </>
      )}
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
  const foundProducts = products.length > 0
  // TODO: Return suggested products
  if (!foundProducts) {
    products = await dbProducts.getAllProducts()
  }
  return {
    props: {
      products,
      foundProducts,
      query,
    },
  }
}

export default SearchPage
