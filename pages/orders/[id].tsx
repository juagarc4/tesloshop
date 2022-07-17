import { Typography, Grid, CardContent, Divider, Card, Box, Link, Chip } from '@mui/material'
import NextLink from 'next/link'
import { ShopLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title='Order ABC1234 Summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1'>
        Order: ABC1234
      </Typography>

      {/* <Chip sx={{ my: 2 }} label='Payment pending' variant='outlined' color='error' icon={<CreditCardOffOutlined />} /> */}
      <Chip
        sx={{ my: 2 }}
        label='Order already paid'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 Products)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Adress</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <Typography>Raul Garcia</Typography>
              <Typography>schwannstr. 25</Typography>
              <Typography>40476 Düsseldorf</Typography>
              <Typography>Germany</Typography>
              <Typography>+49 15236215698</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                {/* TODO */}
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='Order already paid'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage
