import { useState, useContext } from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import { CartContext } from 'context'
import { dbProducts } from 'database'
import { IProduct, ICartProduct, ISize } from 'interfaces'
import { ShopLayout } from 'components/layouts'
import { ItemCounter /* FullScreenLoading*/ } from 'components/ui'
import { ProductSlideshow, SizeSelector } from 'components/products'

interface Props {
  product: IProduct
}
const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter()
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }))
  }
  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    addProductToCart(tempCartProduct)
    router.push('/cart')
  }
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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
              <SizeSelector sizes={product.sizes} selectedSize={tempCartProduct.size} onSelectedSize={selectedSize} />
            </Box>
            {/* Add to Cart */}
            {product.inStock === 0 ? (
              <Chip color='error' label='No available' variant='outlined' />
            ) : (
              <Button color='secondary' className='circular-btn' onClick={onAddProduct}>
                {tempCartProduct.size ? 'Add to cart' : 'Select a size'}
              </Button>
            )}
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    props: { product },
    revalidate: 86400,
  }
}
export default ProductPage
