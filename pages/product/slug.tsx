import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { ShopLayout } from 'components/layouts'
import { ItemCounter } from 'components/ui'
import { seedData } from 'database/products'
import { ProductSlideshow, SizeSelector } from 'components/products'

const product = seedData.products[0]
const ProductPage = () => {
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

export default ProductPage
