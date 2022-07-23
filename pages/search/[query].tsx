import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from 'components/layouts'
import { ProductList } from 'components/products'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'

const SearchPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Find the best products of Teslo here'}>
      <Typography variant='h1'>Search products</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        ABC --- 123 Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default SearchPage
