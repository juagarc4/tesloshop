import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from 'components/layouts/ShopLayout'
import { ProductList } from 'components/products'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'All products for men'}>
      <Typography variant='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Men Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default MenPage
