import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from 'components/layouts/ShopLayout'
import { ProductList } from 'components/products'
import { useProducts } from 'hooks'

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best prodcut of Teslo here'}>
      <Typography variant='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
      {isLoading ? <h1>Loading...</h1> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default HomePage
