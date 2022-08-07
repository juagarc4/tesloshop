import { useContext, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Typography, Grid, CardContent, Divider, Card, Box, Button, Link } from '@mui/material'
import Cookies from 'js-cookie'
import { CartContext } from 'context'
import { ShopLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'
import { countries } from 'utils'

const SummaryPage = () => {
  const router = useRouter()
  const { shippingAddress, numberOfItems } = useContext(CartContext)
  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }
  }, [router])

  if (!shippingAddress) {
    return <></>
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
              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
