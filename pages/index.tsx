import { Typography } from '@mui/material'
import ShopLayout from 'components/layouts/ShopLayout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best prodcut of Teslo here'}>
      <Typography variant='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
    </ShopLayout>
  )
}

export default Home
