import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'
import { Box, Button, Grid, Typography } from '@mui/material'

import { dbProducts } from 'database'
import { ShopLayout } from 'components/layouts'
import { ItemCounter /* FullScreenLoading*/ } from 'components/ui'
import { ProductSlideshow, SizeSelector } from 'components/products'
// import { useProducts } from 'hooks'
import { IProduct } from 'interfaces'
import { redirect } from 'next/dist/server/api-utils'

interface Props {
  product: IProduct
}
// const product = seedData.products[0]
const ProductPage: NextPage<Props> = ({ product }) => {
  // This is the usual in SPA/PWA, but then we will not have SEO.
  // To avoid it we will use SSR to get the data of the product and
  // to pre-render the page.
  // const router = useRouter()
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`)

  // if (isLoading) {
  //   return <FullScreenLoading />
  // }
  // if (!product) {
  //   return <h1>Product does not exist</h1>
  // }
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* Titles */}
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {product.price}€
            </Typography>
            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>
            {/* Add to Cart */}
            <Button color='secondary' className='circular-btn'>
              Add to cart
            </Button>
            {/* <Chip label='No available' color='error' variant='outlined' /> */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // We extact directly the slug from params and cast it to string
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductsBySlug(slug)
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      product,
    },
  }
}
export default ProductPage
