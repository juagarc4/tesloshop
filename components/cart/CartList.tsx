import { FC, useContext } from 'react'
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import { ItemCounter } from 'components/ui'
import { CartContext } from 'context'

// const productsInCart = [seedData.products[0], seedData.products[1], seedData.products[2]]
interface Props {
  editable?: boolean
}
export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext)

  return (
    <>
      {cart.map((product) => (
        <Grid container key={product.slug} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* Link to product page */}
            <NextLink href='/product/slug' passHref>
              <Link>
                <CardActionArea>
                  <CardMedia image={`/products/${product.image}`} component='img' sx={{ borderRadius: '5px' }} />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>M</strong>
              </Typography>
              {editable ? (
                <ItemCounter currentValue={product.quantity} maxValue={10} updateQuantity={() => {}} />
              ) : (
                <Typography variant='h5'>
                  {product.quantity} product{product.quantity > 1 && 's'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='subtitle1'>{`${product.price}€`}</Typography>
            {editable && (
              <Button variant='text' color='secondary'>
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
