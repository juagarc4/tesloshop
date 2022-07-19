import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { seedData } from 'database/products'
import { ShopLayout } from 'components/layouts/ShopLayout'
import { ProductList } from 'components/products'

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best prodcut of Teslo here'}>
      <Typography variant='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
      <ProductList products={seedData.products as any} />
    </ShopLayout>
  )
}

export default Home
