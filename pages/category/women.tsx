import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from 'components/layouts/ShopLayout'
import { ProductList } from 'components/products'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'All products for women'}>
      <Typography variant='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Women Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default WomenPage
