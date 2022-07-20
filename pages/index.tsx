import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { seedData } from 'database/products'
import { ShopLayout } from 'components/layouts/ShopLayout'
import { ProductList } from 'components/products'

import useSWR from 'swr'
const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())

const HomePage: NextPage = () => {
  const { data, error } = useSWR('/api/products', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best prodcut of Teslo here'}>
      <Typography variant='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
      <ProductList products={data} />
    </ShopLayout>
  )
}

export default HomePage
