import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Typography, Grid, CardContent, Divider, Card, Box, Button, Link, Chip } from '@mui/material'
import Cookies from 'js-cookie'
import { CartContext } from 'context'
import { ShopLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'

const SummaryPage = () => {
  const router = useRouter()
  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }
  }, [router])

  if (!shippingAddress) {
    return <></>
  }
  const onCreateOrder = async () => {
    setIsPosting(true)
    const { hasError, message } = await createOrder() // TODO: Navigate depending on result
    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }
    router.replace(`/orders/${message}`)
  }
  const { firstName, lastName, address, address2 = '', postalCode, city, country, phone } = shippingAddress

  return (
    <ShopLayout title='Order summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1'>
        Order summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({numberOfItems} Product{numberOfItems === 1 ? '' : 's'})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Adress</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <Typography>{`${firstName} ${lastName}`}</Typography>
              <Typography>{address}</Typography>
              {address2 && <Typography>{address2}</Typography>}
              <Typography>
                {postalCode} {city}
              </Typography>
              {/* <Typography>{countries.find((currentCountry) => currentCountry.code === country)?.name}</Typography> */}
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  disabled={isPosting || numberOfItems === 0}
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={onCreateOrder}
                >
                  Confirm Order
                </Button>

                {errorMessage && (
                  <Chip variant='outlined' color='error' label={errorMessage} sx={{ mt: 2, display: 'flex' }} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
