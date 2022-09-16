import { FC, useContext } from 'react'
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import { ItemCounter } from 'components/ui'
import { CartContext } from 'context'
import { ICartProduct, IOrderItem } from 'interfaces'
import { currency } from 'utils'

// const productsInCart = [seedData.products[0], seedData.products[1], seedData.products[2]]
interface Props {
  editable?: boolean
  products?: IOrderItem[]
}
export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)
  const onUpdateCartQuantity = (product: ICartProduct, newQuatityValue: number) => {
    product.quantity = newQuatityValue
    updateCartQuantity(product)
  }

  const productsToShow = products ? products : cart
  return (
    <>
      {productsToShow.map((product) => (
        <Grid container key={product.slug + product.size} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* Link to product page */}
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia image={product.image} component='img' sx={{ borderRadius: '5px' }} />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updateQuantity={(value) => onUpdateCartQuantity(product as ICartProduct, value)}
                />
              ) : (
                <Typography variant='h5'>
                  {product.quantity} product{product.quantity > 1 && 's'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='subtitle1'>{currency.format(product.price)}</Typography>
            {editable && (
              <Button variant='text' color='secondary' onClick={() => removeCartProduct(product as ICartProduct)}>
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
