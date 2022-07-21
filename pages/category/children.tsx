import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from 'components/layouts/ShopLayout'
import { ProductList } from 'components/products'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'

const ChildrenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title={'Teslo-Shop - Children'} pageDescription={'All products for your children'}>
      <Typography variant='h1' sx={{ mb: 1 }}>
        Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Children Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default ChildrenPage
